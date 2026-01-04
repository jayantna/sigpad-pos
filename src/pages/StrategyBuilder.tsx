import { useState } from 'react'
import type { Strategy, Rule, Condition, Action } from '../types/strategies'
import { useNavigate } from 'react-router-dom'

// Mock Assets for the demo
const MOCK_ASSETS = [
    { name: 'GLD Token', id: 'asset_gld_123' },
    { name: 'Silver Pass', id: 'asset_slv_456' },
    { name: 'Bonus NFT', id: 'asset_nft_789' }
]

const INITIAL_STRATEGY: Strategy = {
    strategy_id: '', // Generated on save
    name: 'Gold Membership Program',
    is_active: true,
    priority: 1,
    rules: [
        {
            trigger: 'PAYMENT_REQUEST',
            conditions: [
                { field: 'TOKEN_BALANCE', operator: 'GT', value: 100 }
            ],
            action: { type: 'DISCOUNT_PERCENT', value: 10 }
        },
        {
            trigger: 'PAYMENT_SUCCESS',
            conditions: [],
            action: { type: 'MINT_ASSET', asset_id: 'asset_gld_123', amount: 5 }
        }
    ]
}

export default function StrategyBuilder() {
    const navigate = useNavigate()
    const [strategy, setStrategy] = useState<Strategy>(INITIAL_STRATEGY)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Modal State
    const [editingRuleIndex, setEditingRuleIndex] = useState<number | null>(null)
    const [tempRule, setTempRule] = useState<Partial<Rule>>({
        trigger: 'PAYMENT_REQUEST',
        conditions: [],
        action: { type: 'DISCOUNT_PERCENT', value: 10 }
    })

    const handleOpenModal = (index?: number) => {
        if (index !== undefined) {
            setEditingRuleIndex(index)
            setTempRule(JSON.parse(JSON.stringify(strategy.rules[index])))
        } else {
            setEditingRuleIndex(null)
            setTempRule({
                trigger: 'PAYMENT_REQUEST',
                conditions: [],
                action: { type: 'DISCOUNT_PERCENT', value: 10 }
            })
        }
        setIsModalOpen(true)
    }

    const handleSaveRule = () => {
        if (!tempRule.trigger || !tempRule.action) return

        const newRule = tempRule as Rule
        const updatedRules = [...strategy.rules]

        if (editingRuleIndex !== null) {
            updatedRules[editingRuleIndex] = newRule
        } else {
            updatedRules.push(newRule)
        }

        setStrategy({ ...strategy, rules: updatedRules })
        setIsModalOpen(false)
    }

    const deleteRule = (index: number) => {
        const updatedRules = strategy.rules.filter((_, i) => i !== index)
        setStrategy({ ...strategy, rules: updatedRules })
    }

    // Modal Sub-components helpers
    const addCondition = () => {
        const newConditions = [...(tempRule.conditions || [])]
        newConditions.push({ field: 'TOKEN_BALANCE', operator: 'GT', value: 0 })
        setTempRule({ ...tempRule, conditions: newConditions })
    }

    const removeCondition = (idx: number) => {
        const newConditions = (tempRule.conditions || []).filter((_, i) => i !== idx)
        setTempRule({ ...tempRule, conditions: newConditions })
    }

    const updateCondition = (idx: number, field: keyof Condition, value: any) => {
        const newConditions = [...(tempRule.conditions || [])]
        newConditions[idx] = { ...newConditions[idx], [field]: value }
        setTempRule({ ...tempRule, conditions: newConditions })
    }

    return (
        <div className="min-h-screen bg-black/90 p-8 text-white font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            Edit Strategy
                        </h1>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Strategy Name</label>
                                <input
                                    type="text"
                                    value={strategy.name}
                                    onChange={(e) => setStrategy({ ...strategy, name: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Priority</label>
                                    <input
                                        type="number"
                                        value={strategy.priority || 0}
                                        onChange={(e) => setStrategy({ ...strategy, priority: parseInt(e.target.value) })}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div className="flex flex-col justify-end pb-2">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${strategy.is_active ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${strategy.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                        <span className={`text-sm font-medium ${strategy.is_active ? 'text-emerald-400' : 'text-zinc-400'}`}>
                                            {strategy.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section B: The Rule Stream */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Rule Chain</h2>
                        <span className="text-xs text-zinc-500 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                            {strategy.rules.length} Rules Defined
                        </span>
                    </div>

                    <div className="space-y-4">
                        {strategy.rules.map((rule, idx) => (
                            <div key={idx} className="relative group bg-zinc-900/60 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all shadow-lg hover:shadow-indigo-500/10">
                                {/* Connector Line Visualization */}
                                {idx < strategy.rules.length - 1 && (
                                    <div className="absolute left-8 bottom-0 w-0.5 h-4 bg-zinc-800 -mb-4 z-0 translate-y-full" />
                                )}

                                <div className="flex items-start gap-4 z-10 relative">
                                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner ${rule.trigger === 'PAYMENT_REQUEST' ? 'bg-blue-500/20 text-blue-400' :
                                        rule.trigger === 'PAYMENT_SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                                            'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        {rule.trigger === 'PAYMENT_REQUEST' ? '⚡' : rule.trigger === 'PAYMENT_SUCCESS' ? '✅' : '🔥'}
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">
                                                    {rule.trigger.replace('_', ' ')}
                                                </h3>
                                                <p className="text-sm text-zinc-500">
                                                    {rule.trigger === 'PAYMENT_REQUEST' ? 'Calculate Price / Discounts' :
                                                        rule.trigger === 'PAYMENT_SUCCESS' ? 'Deliver Rewards / Minting' : 'Burn Tokens'}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenModal(idx)} className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 rounded-lg text-zinc-300 transition-colors">Edit</button>
                                                <button onClick={() => deleteRule(idx)} className="px-3 py-1 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">Delete</button>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 p-4 bg-black/40 rounded-xl border border-white/5">
                                            {/* Conditions */}
                                            {rule.conditions.length > 0 ? (
                                                <div className="flex flex-col gap-2">
                                                    <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Conditions (AND)</div>
                                                    {rule.conditions.map((cond, cIdx) => (
                                                        <div key={cIdx} className="flex items-center gap-2 text-sm text-zinc-300">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                                            <span className="font-mono bg-white/5 px-1.5 rounded text-indigo-300">{cond.field}</span>
                                                            <span className="text-zinc-500">{cond.operator}</span>
                                                            <span className="font-mono text-white">{cond.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-sm text-zinc-500 italic flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                                                    No conditions - Always runs
                                                </div>
                                            )}

                                            {/* Action */}
                                            <div className="mt-2 pt-3 border-t border-white/5">
                                                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-2">Action</div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md text-sm font-bold border border-emerald-500/20">
                                                        {rule.action.type.replace('_', ' ')}
                                                    </span>
                                                    <span className="text-zinc-300 text-sm">
                                                        {rule.action.value ? `${rule.action.value}%` : ''}
                                                        {rule.action.amount ? `x${rule.action.amount}` : ''}
                                                        {rule.action.asset_id ? (
                                                            <span className="ml-1 text-zinc-500 text-xs font-mono">
                                                                ({MOCK_ASSETS.find(a => a.id === rule.action.asset_id)?.name || rule.action.asset_id})
                                                            </span>
                                                        ) : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add Rule Button */}
                    <button
                        onClick={() => handleOpenModal()}
                        className="w-full py-6 mt-4 border-2 border-dashed border-zinc-700 rounded-2xl flex flex-col items-center justify-center text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                    >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">+</span>
                        <span className="font-semibold">Add New Rule</span>
                    </button>

                    <div className="flex justify-end pt-8">
                        <button
                            onClick={() => navigate('/payment')}
                            className="px-6 py-3 text-zinc-400 hover:text-white transition-colors mr-4">
                            Cancel
                        </button>
                        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:translate-y-[-2px]">
                            Save Strategy
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">
                                {editingRuleIndex !== null ? 'Edit Rule' : 'Create New Rule'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white text-2xl">&times;</button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-8 flex-1">
                            {/* Step 1: Trigger */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">1</div>
                                    <h4 className="font-semibold text-lg text-white">When... (Trigger)</h4>
                                </div>
                                <select
                                    value={tempRule.trigger}
                                    onChange={(e) => {
                                        const t = e.target.value as Rule['trigger'];
                                        // Reset action type based on trigger
                                        let defaultAction: Action = { type: 'DISCOUNT_PERCENT', value: 10 };
                                        if (t === 'PAYMENT_SUCCESS') defaultAction = { type: 'MINT_ASSET', amount: 1 };
                                        if (t === 'MANUAL_REDEEM') defaultAction = { type: 'BURN_AND_DISCOUNT', burn_amount: 1 };

                                        setTempRule({ ...tempRule, trigger: t, action: defaultAction });
                                    }}
                                    className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="PAYMENT_REQUEST">PAYMENT_REQUEST (Before Payment)</option>
                                    <option value="PAYMENT_SUCCESS">PAYMENT_SUCCESS (After Payment)</option>
                                    <option value="MANUAL_REDEEM">MANUAL_REDEEM (Burn Token)</option>
                                </select>
                            </div>

                            {/* Step 2: Conditions */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-sm">2</div>
                                        <h4 className="font-semibold text-lg text-white">If... (Conditions)</h4>
                                    </div>
                                    <button onClick={addCondition} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">+ Add AND Condition</button>
                                </div>

                                <div className="space-y-3">
                                    {(tempRule.conditions || []).length === 0 && (
                                        <p className="text-sm text-zinc-500 bg-white/5 p-4 rounded-xl border border-dashed border-white/10">
                                            No conditions set. This rule will always run when triggered.
                                        </p>
                                    )}
                                    {tempRule.conditions?.map((cond, idx) => (
                                        <div key={idx} className="flex gap-2 items-center bg-black/20 p-2 rounded-xl border border-white/5">
                                            <select
                                                value={cond.field}
                                                onChange={(e) => updateCondition(idx, 'field', e.target.value)}
                                                className="bg-transparent text-white text-sm p-2 outline-none border-r border-white/10 w-1/3"
                                            >
                                                <option value="TOKEN_BALANCE">Token Balance</option>
                                                <option value="TX_HISTORY_COUNT">Tx History</option>
                                                <option value="CORE_THEME">Core Theme</option>
                                            </select>
                                            <select
                                                value={cond.operator}
                                                onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                                                className="bg-transparent text-indigo-300 font-mono text-sm p-2 outline-none border-r border-white/10 w-20 text-center"
                                            >
                                                <option value="GT">&gt;</option>
                                                <option value="GTE">&ge;</option>
                                                <option value="EQ">==</option>
                                                <option value="LT">&lt;</option>
                                                <option value="LTE">&le;</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={cond.value}
                                                onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                                                placeholder="Value"
                                                className="bg-transparent text-white p-2 outline-none flex-1 font-mono"
                                            />
                                            <button onClick={() => removeCondition(idx)} className="p-2 text-zinc-500 hover:text-red-400 transition-colors">&times;</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Action */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white text-sm">3</div>
                                    <h4 className="font-semibold text-lg text-white">Then... (Action)</h4>
                                </div>

                                <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 space-y-4">
                                    <div>
                                        <label className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2 block">Action Type</label>
                                        <select
                                            value={tempRule.action?.type}
                                            onChange={(e) => setTempRule({ ...tempRule, action: { ...tempRule.action!, type: e.target.value as any } })}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-emerald-300 font-medium outline-none"
                                        >
                                            <option value="DISCOUNT_PERCENT">Discount Percentage</option>
                                            <option value="MINT_ASSET">Mint Asset</option>
                                            <option value="BURN_AND_DISCOUNT">Burn & Discount</option>
                                        </select>
                                    </div>

                                    {/* Dynamic Action Fields */}
                                    {tempRule.action?.type === 'DISCOUNT_PERCENT' && (
                                        <div>
                                            <label className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2 block">Discount Value (%)</label>
                                            <input
                                                type="number"
                                                value={tempRule.action.value || 0}
                                                onChange={(e) => setTempRule({ ...tempRule, action: { ...tempRule.action!, value: parseFloat(e.target.value) } })}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                                            />
                                        </div>
                                    )}

                                    {tempRule.action?.type === 'MINT_ASSET' && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2 block">Select Asset</label>
                                                <select
                                                    value={tempRule.action.asset_id || ''}
                                                    onChange={(e) => setTempRule({ ...tempRule, action: { ...tempRule.action!, asset_id: e.target.value } })}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
                                                >
                                                    <option value="">Select an asset...</option>
                                                    {MOCK_ASSETS.map(a => (
                                                        <option key={a.id} value={a.id}>{a.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-2 block">Amount to Mint</label>
                                                <input
                                                    type="number"
                                                    value={tempRule.action.amount || 1}
                                                    onChange={(e) => setTempRule({ ...tempRule, action: { ...tempRule.action!, amount: parseFloat(e.target.value) } })}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-zinc-400 hover:text-white transition-colors">Cancel</button>
                            <button onClick={handleSaveRule} className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">
                                {editingRuleIndex !== null ? 'Update Rule' : 'Add Rule'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
