import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import axios from 'axios'
import { x402Client, wrapFetchWithPayment } from "@x402/fetch";
import type { ClientEvmSigner } from "@x402/evm";
import { ExactEvmScheme, registerExactEvmScheme } from "@x402/evm/exact/client";
import type { PaymentState } from '../types/payment'
import PaymentLayout from '../components/PaymentLayout'
import type { Account, WalletClient } from 'viem';
import { useWalletClient, useDisconnect } from "wagmi";
import {
    decodePaymentRequiredHeader,
    decodePaymentResponseHeader,
    encodePaymentSignatureHeader,
} from "@x402/core/http";
import type { PaymentRequirements } from "@x402/core/types";



/**
 * Converts a wagmi/viem WalletClient to a ClientEvmSigner for x402Client
 */
function wagmiToClientSigner(walletClient: WalletClient): ClientEvmSigner {
    if (!walletClient.account) {
        throw new Error("Wallet client must have an account");
    }

    return {
        address: walletClient.account.address,
        signTypedData: async (message) => {
            const signature = await walletClient.signTypedData({
                account: walletClient.account as Account,
                domain: message.domain,
                types: message.types,
                primaryType: message.primaryType,
                message: message.message,
            });
            return signature;
        },
    };
}

/**
 * Makes a request with x402 payment handling.
 *
 * @param client - The x402 client instance to use for payments
 * @param url - The URL to request
 * @returns Payment response data
 */
async function makeRequestWithPayment(client: x402Client, url: string): Promise<any> {
    console.log(`\n🌐 Making initial request to: ${url}\n`);

    // Step 1: Make initial request
    let response = await fetch(url);
    console.log(`📥 Initial response status: ${response.status}\n`);

    // Step 2: Handle 402 Payment Required
    if (response.status === 402) {
        console.log("💳 Payment required! Processing...\n");

        // Decode payment requirements from PAYMENT-REQUIRED header
        const paymentRequiredHeader = response.headers.get("PAYMENT-REQUIRED");
        if (!paymentRequiredHeader) {
            throw new Error("Missing PAYMENT-REQUIRED header");
        }
        const paymentRequired = decodePaymentRequiredHeader(paymentRequiredHeader);

        const requirements: PaymentRequirements[] = Array.isArray(paymentRequired.accepts)
            ? paymentRequired.accepts
            : [paymentRequired.accepts];

        console.log("📋 Payment requirements:");
        requirements.forEach((req, i) => {
            console.log(`   ${i + 1}. ${req.network} / ${req.scheme} - ${req.amount}`);
        });

        // Step 3: Create and encode payment
        console.log("\n🔐 Creating payment...\n");
        const paymentPayload = await client.createPaymentPayload(paymentRequired);
        const paymentHeader = encodePaymentSignatureHeader(paymentPayload);

        // Step 4: Retry with PAYMENT-SIGNATURE header
        console.log("🔄 Retrying with payment...\n");
        response = await fetch(url, {
            headers: { "PAYMENT-SIGNATURE": paymentHeader },
        });
        console.log(`📥 Response status: ${response.status}\n`);
    }

    // Step 5: Handle success
    if (response.status === 200) {
        console.log("✅ Success!\n");
        const responseData = await response.json();
        console.log("Response:", responseData);

        // Decode settlement from PAYMENT-RESPONSE header
        const settlementHeader = response.headers.get("PAYMENT-RESPONSE");
        if (settlementHeader) {
            const settlement = decodePaymentResponseHeader(settlementHeader);
            console.log("\n💰 Settlement:");
            console.log(`   Transaction: ${settlement.transaction}`);
            console.log(`   Network: ${settlement.network}`);
            console.log(`   Payer: ${settlement.payer}`);
        }

        return responseData;
    } else {
        throw new Error(`Unexpected status: ${response.status}`);
    }
}

export default function PaymentTerminal() {
    const location = useLocation()
    const navigate = useNavigate()
    const state = location.state as PaymentState

    const { address, isConnected } = useAppKitAccount()
    const { open } = useAppKit()
    const { disconnect } = useDisconnect()

    const [orderId, setOrderId] = useState<string>('')
    const [isCreatingOrder, setIsCreatingOrder] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const [error, setError] = useState('')

    const { data: walletClient } = useWalletClient();

    // Create x402 client and register EVM scheme with wagmi signer (only when wallet is connected)
    let client: x402Client | null = null;

    if (walletClient) {
        client = new x402Client();
        const signer = wagmiToClientSigner(walletClient);
        registerExactEvmScheme(client, { signer });
    }


    // Redirect if no state is provided
    useEffect(() => {
        if (!state?.merchantAddress || !state?.amount || !state?.strategyId) {
            navigate('/payment')
        }
    }, [state, navigate])

    // Create order when wallet is connected
    useEffect(() => {
        const createOrder = async () => {
            if (isConnected && address && !orderId && !isCreatingOrder) {
                setIsCreatingOrder(true)
                setError('')

                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/quote`, {
                        merchant_address: state.merchantAddress,
                        user_address: address,
                        cart_amount: parseFloat(state.amount),
                        strategy_id: state.strategyId
                    })

                    if (response.data?.order_id) {
                        setOrderId(response.data.order_id)
                    } else {
                        throw new Error('No order ID returned from API')
                    }
                } catch (err: any) {
                    console.error('Failed to create order:', err)
                    setError(err.response?.data?.message || err.message || 'Failed to create order')
                } finally {
                    setIsCreatingOrder(false)
                }
            }
        }

        createOrder()
    }, [isConnected, address, state, orderId, isCreatingOrder])

    if (!state) {
        return null
    }

    const handlePayment = async (orderId: string) => {
        setIsProcessingPayment(true)
        setError('')

        try {
            // Custom selector - pick which payment option to use
            // This selects the second payment option (Solana)
            // Create your own logic here to select preferred payment option
            const selectPayment = (_version: number, requirements: PaymentRequirements[]) => {
                const selected = requirements[0];
                console.log(`🎯 Selected: ${selected.network} / ${selected.scheme}`);
                return selected;
            };

            const signer = wagmiToClientSigner(walletClient!);
            const client = new x402Client(selectPayment)
                .register("eip155:*", new ExactEvmScheme(signer))
            console.log("✅ Client ready\n");

            // Use the makeRequestWithPayment to handle x402 payment flow
            const paymentResponse = await makeRequestWithPayment(client,
                `${import.meta.env.VITE_API_URL}/api/payment/complete/${orderId}`,
            );

            // Check if payment was successful
            if (paymentResponse?.success) {
                console.log('Payment completed successfully:', paymentResponse);

                // Disconnect the wallet
                disconnect();

                // Navigate to success page with payment data
                navigate('/payment-success', {
                    state: paymentResponse
                });
            } else {
                throw new Error('Payment was not successful');
            }
        } catch (err: any) {
            console.error('Payment error:', err);
            setError(err.message || 'Payment failed');
        } finally {
            setIsProcessingPayment(false)
        }
    }

    return (
        <PaymentLayout>
            <div className="relative z-10 w-full max-w-2xl p-8 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl animate-fade-in mx-4 my-8 mb-24">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Payment Terminal</h2>
                    <p className="text-zinc-400">Connect your wallet to proceed with payment</p>
                </div>

                {/* Payment Details */}
                <div className="mb-8 p-6 bg-black/20 border border-white/5 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Payment Details</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Amount</span>
                            <span className="text-white font-mono text-lg font-semibold">{state.amount} USDC</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Merchant</span>
                            <span className="text-white font-mono text-sm">
                                {state.merchantAddress.slice(0, 6)}...{state.merchantAddress.slice(-4)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">Strategy ID</span>
                            <span className="text-white font-mono text-sm">{state.strategyId}</span>
                        </div>
                    </div>
                </div>

                {/* Wallet Connection Section */}
                {!isConnected ? (
                    <div className="flex flex-col items-center gap-6 py-8">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
                            <p className="text-zinc-400 text-sm">Please connect your wallet to continue with the payment</p>
                        </div>
                        <button
                            onClick={() => open({ view: 'Connect' })}
                            className="w-full py-4 text-lg font-bold text-white bg-primary rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0"
                        >
                            Connect Wallet
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Connected Wallet */}
                        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                                <span className="text-sm font-medium text-emerald-400">Wallet Connected</span>
                            </div>
                            <div className="font-mono text-white text-sm break-all">
                                {address}
                            </div>
                        </div>

                        {/* Order Creation Status */}
                        {isCreatingOrder && (
                            <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                                <div className="inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-blue-400 font-medium">Creating order...</p>
                            </div>
                        )}

                        {/* Order ID Display */}
                        {orderId && (
                            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-fade-in">
                                <div className="flex items-center gap-2 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-emerald-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm font-medium text-emerald-400">Order Created Successfully</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-zinc-400 text-xs uppercase tracking-wider">Order ID</p>
                                    <div className="p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-sm text-white break-all">
                                        {orderId}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl animate-shake">
                                <div className="flex items-center gap-2 mb-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-400">Error</span>
                                </div>
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/payment')}
                                className="flex-1 py-3 text-base font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:border-white/20"
                            >
                                Back to Payment
                            </button>
                            {orderId && (
                                <button
                                    className="flex-1 py-3 text-base font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                                    onClick={() => handlePayment(orderId)}
                                    disabled={isProcessingPayment}
                                >
                                    {isProcessingPayment && (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    )}
                                    {isProcessingPayment ? 'Processing Payment...' : 'Continue to Payment'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </PaymentLayout>
    )
}
