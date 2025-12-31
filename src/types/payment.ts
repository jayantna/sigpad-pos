export interface PaymentQuoteRequest {
    merchant_address: string
    user_address: string
    cart_amount: number
    strategy_id: string
}

export interface PaymentQuoteResponse {
    order_id: string
    // Add more fields as they become available from the API
}

export interface PaymentState {
    merchantAddress: string
    amount: string
    strategyId: string
}
