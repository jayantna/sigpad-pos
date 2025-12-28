import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createWalletClient, custom } from 'viem'
import { useAppKit, useAppKitState, useAppKitAccount, useDisconnect, useAppKitProvider } from '@reown/appkit/react'
import { useVerification } from './context/VerificationContext'

function App() {
  const [addressInput, setAddressInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'connecting' | 'signing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { login } = useVerification()

  const { address, isConnected } = useAppKitAccount()
  const { disconnect } = useDisconnect()
  const { walletProvider } = useAppKitProvider('eip155')
  const { open } = useAppKit()
  const { open: isModalOpen } = useAppKitState()

  useEffect(() => {
    const verifiedAddress = localStorage.getItem('sigpad_verified_address')
    if (verifiedAddress) {
      setAddressInput(verifiedAddress)
      setStatus('success')
    }
  }, [])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addressInput) return

    setStatus('connecting')
    setErrorMessage('')

    try {
      if (!isConnected || (address && address.toLowerCase() !== addressInput.toLowerCase())) {
        await open({ view: 'Connect' })
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage('Failed to connect wallet.')
    }
  }

  // Watch for modal close events to reset stuck state
  useEffect(() => {
    let timeout: NodeJS.Timeout
    // If we're stuck in 'connecting' but the modal is closed and we aren't connected, reset to idle.
    // We add a delay to avoid race conditions where modal closes just before isConnected becomes true.
    if (status === 'connecting' && !isModalOpen && !isConnected) {
      timeout = setTimeout(() => {
        setStatus('idle')
      }, 1500) // Wait 1.5s to be safe
    }
    return () => clearTimeout(timeout)
  }, [status, isModalOpen, isConnected])

  useEffect(() => {
    const verifyAndSign = async () => {
      if (status === 'connecting' && isConnected && address) {
        // Check if connected address matches input
        if (address.toLowerCase() !== addressInput.toLowerCase()) {
          setStatus('error')
          setErrorMessage(`Connected account (${address.slice(0, 6)}...${address.slice(-4)}) does not match entered address. Please connect the correct wallet.`)
          disconnect()
          return
        }

        // Proceed to sign
        try {
          setStatus('signing')
          const message = `I verify that I own the address ${address}. Timestamp: ${Date.now()}`

          if (!walletProvider || !address) throw new Error('Wallet not connected')
          const client = createWalletClient({
            transport: custom(walletProvider as any),
          })
          await client.signMessage({
            account: address as `0x${string}`,
            message
          })

          login(address)
          setStatus('success')
        } catch (err: any) {
          console.error(err)
          setStatus('error')
          setErrorMessage(err.message || 'User rejected signature')
        }
      }
    }

    verifyAndSign()
  }, [status, isConnected, address, addressInput, walletProvider])

  return (
    <div className="relative z-10 w-full max-w-md p-12 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl text-center animate-fade-in mx-4">
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Verified Owner</h2>
            <p className="text-zinc-400 text-sm">You have successfully proved ownership of</p>
          </div>
          <div className="w-full p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-sm text-zinc-300 break-all select-all">
            {addressInput}
          </div>
          <button
              type="submit"
              className="w-full py-4 text-lg font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              onClick={()=>navigate('/payment')}
            >
              Enter SigPad
            </button>
        </div>
      ) : (
        <>
          <h1 className="text-6xl font-bold py-4 mb-2 bg-gradient-to-br from-white to-indigo-400 bg-clip-text text-transparent tracking-tighter">SigPad</h1>
          <p className="text-gray-400 mb-10 text-lg">Verify your EVM address ownership to login</p>

          <form onSubmit={handleVerify} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="address" className="text-sm font-medium text-gray-400 ml-1">Enter your Address</label>
              <input
                id="address"
                type="text"
                placeholder="0x..."
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                disabled={status === 'connecting' || status === 'signing'}
                className="w-full px-5 py-4 text-base bg-bg/60 border border-white/10 rounded-xl text-white transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={!addressInput || status === 'connecting' || status === 'signing'}
              className="w-full py-4 text-lg font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {status === 'idle' && 'Verify Ownership'}
              {status === 'connecting' && 'Connect Wallet...'}
              {status === 'signing' && 'Check Wallet...'}
              {status === 'error' && 'Try Again'}
            </button>
          </form>

          <div className="mt-4 text-xs text-gray-500">
            Supports MetaMask, WalletConnect, and more.
          </div>

          {errorMessage && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm text-left animate-shake">
              {errorMessage}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App
