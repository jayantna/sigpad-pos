export interface Condition {
    field: 'TOKEN_BALANCE' | 'TX_HISTORY_COUNT' | 'CORE_THEME';
    operator: 'GT' | 'GTE' | 'EQ' | 'LT' | 'LTE';
    asset_id?: string;
    value: number | string;
}

export interface Action {
    type: 'DISCOUNT_PERCENT' | 'MINT_ASSET' | 'BURN_AND_DISCOUNT';
    value?: number; // For DISCOUNT_PERCENT
    asset_id?: string; // For MINT_ASSET
    amount?: number; // For MINT_ASSET
    burn_asset_id?: string; // For BURN_AND_DISCOUNT
    burn_amount?: number; // For BURN_AND_DISCOUNT
    discount_type?: 'FIXED_AMOUNT' | 'PERCENTAGE'; // For BURN_AND_DISCOUNT
    discount_value?: number; // For BURN_AND_DISCOUNT
}

export interface Rule {
    trigger: 'PAYMENT_REQUEST' | 'PAYMENT_SUCCESS' | 'MANUAL_REDEEM';
    selection_id?: string; // e.g. item_id for MANUAL_REDEEM
    conditions: Condition[];
    action: Action;
}

export interface Strategy {
    _id?: string;
    strategy_id: string;
    merchant_id?: string;
    name: string;
    is_active: boolean;
    priority?: number;
    rules: Rule[];
}
