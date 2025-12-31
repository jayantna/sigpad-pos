import { useAppKitAccount, useDisconnect } from '@reown/appkit/react'
import { toast } from 'sonner'

export default function WalletFooter() {
    const { address, isConnected } = useAppKitAccount()
    const { disconnect } = useDisconnect()

    const handleDisconnect = () => {
        disconnect()
        toast.success('Wallet disconnected')
    }

    const handleCopyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address)
            toast.success('Address copied to clipboard')
        }
    }

    if (!isConnected || !address) {
        return null
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Wallet Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-sm text-zinc-400">Connected Wallet:</span>
                        <button
                            onClick={handleCopyAddress}
                            className="font-mono text-sm text-white bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition-all hover:bg-black/60 active:scale-95"
                        >
                            {address.slice(0, 6)}...{address.slice(-4)}
                        </button>
                    </div>

                    {/* Disconnect Button */}
                    <button
                        onClick={handleDisconnect}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg transition-all hover:bg-red-500/20 hover:border-red-500/30 active:scale-95"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Disconnect
                    </button>
                </div>
            </div>
        </footer>
    )
}
