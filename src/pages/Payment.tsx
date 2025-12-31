import { useState, useEffect } from 'react'
import axios from 'axios'
import { useVerification } from '../context/VerificationContext'
import { useNavigate } from 'react-router-dom'
import type { Strategy } from '../types/strategies'

export default function Payment() {
    const { verifiedAddress } = useVerification()
    const [strategies, setStrategies] = useState<Strategy[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedStrategyId, setSelectedStrategyId] = useState<string>('')
    const [amount, setAmount] = useState('')
    const navigate = useNavigate()

    const fetchStrategies = async () => {
        if (!verifiedAddress) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/merchant/strategies/${verifiedAddress}`)
            if (res.data) {
                const data = Array.isArray(res.data) ? res.data : (res.data.strategies || [])
                setStrategies(data.length > 0 ? data : [])
            } else {
                setStrategies([])
            }
        } catch (error) {
            console.error('Failed to fetch strategies', error)
            setStrategies([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setSelectedStrategyId('')
        fetchStrategies()
    }, [verifiedAddress])

    // Auto-select the first active strategy
    useEffect(() => {
        if (strategies.length > 0 && !selectedStrategyId) {
            const firstActive = strategies.find(s => s.is_active)
            if (firstActive) {
                setSelectedStrategyId(firstActive.strategy_id)
            }
        }
    }, [strategies, selectedStrategyId])

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault()
        if (selectedStrategyId && amount && verifiedAddress) {
            navigate('/payment-terminal', {
                state: {
                    merchantAddress: verifiedAddress,
                    amount: amount,
                    strategyId: selectedStrategyId
                }
            })
        }
    }

    return (
        <div className="relative z-10 w-full max-w-2xl p-8 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl animate-fade-in mx-4 my-8">
            <h2 className="text-3xl font-bold text-white mb-2">Make a Payment</h2>
            <p className="text-zinc-400 mb-8">Select a strategy to apply discounts or rewards based on your holdings.</p>

            {isLoading ? (
                <div className="grid gap-4 mb-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-24 bg-white/5 animate-pulse rounded-xl border border-white/5"></div>
                    ))}
                </div>
            ) : (
                <form onSubmit={handlePayment} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3 text-left">
                        <label className="text-sm font-medium text-gray-400 uppercase tracking-wider ml-1">Select Strategy</label>

                        {strategies.length === 0 ? (
                            <div className="p-6 text-center border border-dashed border-white/10 rounded-xl bg-white/5 text-zinc-500">
                                No strategies available.
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {strategies.map((strategy) => (
                                    <label
                                        key={strategy.strategy_id}
                                        className={`relative group flex items-start p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${selectedStrategyId === strategy.strategy_id
                                            ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(var(--primary),0.1)]'
                                            : 'bg-bg/40 border-white/5 hover:border-white/10 hover:bg-bg/60'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-500 ${selectedStrategyId === strategy.strategy_id ? 'opacity-100' : 'group-hover:opacity-50'}`} />

                                        <div className="relative flex items-start gap-4 w-full">
                                            <div className="pt-1">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedStrategyId === strategy.strategy_id
                                                    ? 'border-primary bg-primary' // Checked state
                                                    : 'border-zinc-600 group-hover:border-zinc-500' // Unchecked state
                                                    }`}>
                                                    {selectedStrategyId === strategy.strategy_id && (
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <input
                                                    type="radio"
                                                    name="strategy"
                                                    value={strategy.strategy_id}
                                                    checked={selectedStrategyId === strategy.strategy_id}
                                                    onChange={(e) => setSelectedStrategyId(e.target.value)}
                                                    className="sr-only"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className={`text-lg font-semibold transition-colors ${selectedStrategyId === strategy.strategy_id ? 'text-white' : 'text-zinc-200'}`}>
                                                            {strategy.name}
                                                        </h3>
                                                        {!strategy.is_active && (
                                                            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </div>
                                                    {strategy.priority && (
                                                        <span className="text-xs font-mono text-zinc-500 bg-white/5 px-2 py-1 rounded">
                                                            Priority: {strategy.priority}
                                                        </span>
                                                    )}
                                                </div>

                                                {strategy.rules.length > 0 && (
                                                    <div className="space-y-2 mt-3">
                                                        {strategy.rules.map((rule, idx) => (
                                                            <div key={idx} className="bg-black/20 rounded-lg p-3 text-sm border border-white/5">
                                                                <div className="flex flex-wrap gap-2 mb-2">
                                                                    <span className="text-zinc-400 text-xs uppercase tracking-wide">Trigger:</span>
                                                                    <span className="text-zinc-300 font-medium">{rule.trigger.replace('_', ' ')}</span>
                                                                </div>

                                                                <div className="flex gap-2 items-center mb-2">
                                                                    <span className="text-zinc-400 text-xs uppercase tracking-wide">Action:</span>
                                                                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                                                        {rule.action.type.replace('_', ' ')}
                                                                        {rule.action.value ? ` ${rule.action.value}%` : ''}
                                                                    </span>
                                                                </div>

                                                                {rule.conditions.length > 0 && (
                                                                    <div className="text-xs text-zinc-500">
                                                                        Required: {rule.conditions.map(c => `${c.field} ${c.operator} ${c.value}`).join(', ')}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 text-left">
                        <label htmlFor="amount" className="text-sm font-medium text-gray-400 ml-1 uppercase tracking-wider">Payment Amount</label>
                        <div className="relative">
                            <input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-5 pr-4 py-4 text-xl bg-bg/60 border border-white/10 rounded-xl text-white transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 placeholder:text-gray-700 font-mono"
                                step="any"
                                min="0"
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">USDC</div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedStrategyId}
                        className="w-full py-4 text-lg font-bold text-white bg-primary rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        Proceed to Payment
                    </button>
                </form>
            )}
        </div>
    )
}
