import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import PaymentLayout from '../components/PaymentLayout'

interface PaymentSuccessData {
    success: boolean
    message: string
    order_id: string
    transaction: string
    settlement: {
        success: boolean
        transaction: string
        network: string
        payer: string
    }
    order_details: {
        merchant_address: string
        user_address: string
        final_amount: number
        strategies: string[]
    }
}

export default function PaymentSuccess() {
    const location = useLocation()
    const navigate = useNavigate()
    const paymentData = location.state as PaymentSuccessData

    // Redirect if no payment data
    useEffect(() => {
        if (!paymentData) {
            navigate('/payment')
        }
    }, [paymentData, navigate])

    if (!paymentData) {
        return null
    }

    const { settlement, order_details, order_id, transaction } = paymentData

    return (
        <PaymentLayout>
            <div className="relative z-10 w-full max-w-2xl p-8 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl animate-fade-in mx-4 my-8 mb-24">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/30 animate-bounce-slow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-emerald-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                        Payment Successful!
                    </h2>
                    <p className="text-zinc-400 text-lg">{paymentData.message}</p>
                </div>

                {/* Transaction Details */}
                <div className="space-y-6">
                    {/* Order ID */}
                    <div className="p-6 bg-black/20 border border-white/5 rounded-xl">
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Order ID</h3>
                        <div className="p-3 bg-black/40 rounded-lg border border-white/5 font-mono text-sm text-white break-all">
                            {order_id}
                        </div>
                    </div>

                    {/* Transaction Hash */}
                    <div className="p-6 bg-black/20 border border-white/5 rounded-xl">
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Transaction</h3>
                        <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                            <a
                                href={`https://sepolia.basescan.org/tx/${transaction}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm text-emerald-400 hover:text-emerald-300 break-all transition-colors underline"
                            >
                                {transaction}
                            </a>
                        </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-4">Settlement Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Network</span>
                                <span className="text-white font-mono text-sm">{settlement.network}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Payer</span>
                                <span className="text-white font-mono text-sm">
                                    {settlement.payer.slice(0, 6)}...{settlement.payer.slice(-4)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <span className="text-emerald-400 font-semibold">Settled</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6 bg-black/20 border border-white/5 rounded-xl">
                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Order Details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Final Amount</span>
                                <span className="text-white font-mono text-lg font-semibold">
                                    {order_details.final_amount} USDC
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Merchant</span>
                                <span className="text-white font-mono text-sm">
                                    {order_details.merchant_address.slice(0, 6)}...{order_details.merchant_address.slice(-4)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">User</span>
                                <span className="text-white font-mono text-sm">
                                    {order_details.user_address.slice(0, 6)}...{order_details.user_address.slice(-4)}
                                </span>
                            </div>
                            {order_details.strategies.length > 0 && (
                                <div className="flex justify-between items-start">
                                    <span className="text-zinc-400">Strategies Applied</span>
                                    <div className="text-right">
                                        {order_details.strategies.map((strategy, index) => (
                                            <div key={index} className="flex items-center gap-2 mb-1">
                                                <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs font-semibold text-blue-400">
                                                    {strategy}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => navigate('/payment')}
                            className="flex-1 py-4 text-base font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0"
                        >
                            Make Another Payment
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 py-4 text-base font-semibold text-zinc-300 bg-white/5 border border-white/10 rounded-xl transition-all hover:bg-white/10 hover:border-white/20"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        </PaymentLayout>
    )
}
