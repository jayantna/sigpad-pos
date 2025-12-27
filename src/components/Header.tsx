import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useVerification } from '../context/VerificationContext'

export default function Header() {
    const { verifiedAddress, logout } = useVerification()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    SigPad
                </span>
            </div>
            {verifiedAddress && (
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                        <span className="text-sm font-mono text-zinc-300">
                            {verifiedAddress.slice(0, 6)}...{verifiedAddress.slice(-4)}
                        </span>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(verifiedAddress)
                                toast.success('Address copied to clipboard')
                            }}
                            className="p-1 hover:text-white text-zinc-400 transition-colors"
                            title="Copy Address"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-2 text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all hover:border-white/20"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    )
}
