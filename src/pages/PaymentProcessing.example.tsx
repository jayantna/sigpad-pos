import PaymentLayout from '../components/PaymentLayout'

// Example of how to create a subpage that will also show the wallet footer
// This demonstrates how any future payment-related page can easily include the footer

export default function PaymentProcessing() {
    return (
        <PaymentLayout>
            <div className="relative z-10 w-full max-w-2xl p-8 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl animate-fade-in mx-4 my-8 mb-24">
                <h2 className="text-3xl font-bold text-white mb-4">Payment Processing</h2>
                <p className="text-zinc-400">Your payment is being processed...</p>

                {/* Add your page content here */}
            </div>
        </PaymentLayout>
    )
}
