import { useState, useEffect } from 'react'

interface PaymentConfig {
    id: string
    name: string
    address: string
    chain: string
}

// Mock data - would typically come from an API or contract
const MOCK_CONFIGS: PaymentConfig[] = [
    { id: '1', name: 'Treasury Wallet', address: '0x71C...9A2', chain: 'Ethereum' },
    { id: '2', name: 'Operations Fund', address: '0x3d2...4b1', chain: 'Arbitrum' },
    { id: '3', name: 'Dev Grants', address: '0x9a1...c03', chain: 'Optimism' },
]

export default function Payment() {
    const [configs, setConfigs] = useState<PaymentConfig[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedConfig, setSelectedConfig] = useState<string>('')
    const [amount, setAmount] = useState('')

    useEffect(() => {
        // Simulate fetching saved configurations
        const timer = setTimeout(() => {
            setConfigs(MOCK_CONFIGS)
            if (MOCK_CONFIGS.length > 0) {
                setSelectedConfig(MOCK_CONFIGS[0].id)
            }
            setIsLoading(false)
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault()
        // Logic for payment would go here
        console.log('Processing payment:', { configId: selectedConfig, amount })
    }

    return (
        <div className="relative z-10 w-full max-w-md p-10 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl animate-fade-in mx-4">
            <h2 className="text-2xl font-bold text-white mb-6">Make a Payment</h2>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 text-sm">Loading configurations...</p>
                </div>
            ) : (
                <form onSubmit={handlePayment} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-sm font-medium text-gray-400 ml-1">Select Configuration</label>
                        <div className="grid gap-3">
                            {configs.map((config) => (
                                <label
                                    key={config.id}
                                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedConfig === config.id
                                        ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/20'
                                        : 'bg-bg/60 border-white/5 hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="config"
                                            value={config.id}
                                            checked={selectedConfig === config.id}
                                            onChange={(e) => setSelectedConfig(e.target.value)}
                                            className="accent-primary"
                                        />
                                        <div className="flex flex-col text-left">
                                            <span className="text-white font-medium">{config.name}</span>
                                            <span className="text-xs text-zinc-500">{config.chain} • {config.address}</span>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="amount" className="text-sm font-medium text-gray-400 ml-1">Token Amount</label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-5 py-4 text-base bg-bg/60 border border-white/10 rounded-xl text-white transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 placeholder:text-gray-600"
                            step="any"
                            min="0"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 text-lg font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40 active:translate-y-0"
                    >
                        Proceed to Pay
                    </button>
                </form>
            )}
        </div>
    )
}
