import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConnectButton, useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from 'thirdweb/react'
import { inAppWallet, createWallet } from 'thirdweb/wallets'
import { client, chain, BASE_SEPOLIA_CHAIN_ID, accountAbstractionConfig } from './lib/thirdweb'

/**
 * App component - Landing page with Thirdweb social login for merchant authentication.
 * 
 * This uses Thirdweb's in-app wallet with social login options (email, Google, etc.)
 * for merchant authentication. The merchant's address is derived directly from the connected wallet.
 * 
 * Note: This is separate from the Reown wallet used in PaymentTerminal for user transactions.
 */
function App() {
  const navigate = useNavigate()

  // Thirdweb hooks
  const account = useActiveAccount()
  const activeChain = useActiveWalletChain()
  const switchChain = useSwitchActiveWalletChain()

  // Derive verifiedAddress from thirdweb state
  const isConnected = !!account
  const address = account?.address
  const chainId = activeChain?.id
  const isCorrectChain = chainId === BASE_SEPOLIA_CHAIN_ID

  // Only consider verified if connected and on correct chain
  const verifiedAddress = isConnected && address && isCorrectChain ? address : null

  // Effect to force network switch if connected but wrong network
  useEffect(() => {
    if (isConnected && chainId && chainId !== BASE_SEPOLIA_CHAIN_ID) {
      // Auto-switch to Base Sepolia
      switchChain(chain)
    }
  }, [isConnected, chainId, switchChain])

  const isWrongNetwork = isConnected && chainId !== BASE_SEPOLIA_CHAIN_ID

  // Configure wallets - In-App wallet for email/social with smart account support
  // Smart account enables gasless transactions via thirdweb's Paymaster
  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "discord",
          "telegram",
          "x",
          "github",
          "passkey"
        ],
      },
      // Configure smart account for gasless transactions
      smartAccount: accountAbstractionConfig,
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
  ]

  return (
    <div className="relative z-10 w-full max-w-md p-12 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl text-center animate-fade-in mx-4">
      {verifiedAddress ? (
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome, Merchant</h2>
            <p className="text-zinc-400 text-sm">You are verified as</p>
          </div>
          <div className="w-full p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-sm text-zinc-300 break-all select-all">
            {verifiedAddress}
          </div>
          <button
            type="button"
            className="w-full py-4 text-lg font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40"
            onClick={() => navigate('/payment')}
          >
            Enter SigPad
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-6xl font-bold py-4 mb-2 bg-gradient-to-br from-white to-indigo-400 bg-clip-text text-transparent tracking-tighter">SigPad</h1>
          <p className="text-gray-400 mb-10 text-lg">Merchant Login</p>

          <div className="flex flex-col gap-6">
            {isWrongNetwork ? (
              <button
                onClick={() => switchChain(chain)}
                className="w-full py-4 text-lg font-semibold text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40"
              >
                Switch to Base Sepolia
              </button>
            ) : (
              <div className="flex justify-center">
                <ConnectButton
                  client={client}
                  wallets={wallets}
                  chain={chain}
                  accountAbstraction={accountAbstractionConfig}
                  theme="dark"
                  connectModal={{
                    title: "Sign in to SigPad",
                    size: "compact",
                  }}
                  connectButton={{
                    label: "Connect Wallet",
                    style: {
                      width: '100%',
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      borderRadius: '0.75rem',
                      background: 'var(--color-primary)',
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Supports Email, Google, Apple, Discord, and external wallets.
          </div>
        </>
      )}
    </div>
  )
}

export default App

