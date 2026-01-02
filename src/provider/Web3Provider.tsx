import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, baseSepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ThirdwebProvider } from "thirdweb/react"
import type { PropsWithChildren } from 'react'

// 1. Get projectId for Reown
const projectId = import.meta.env.VITE_PROJECT_ID

// 2. Set up Wagmi Adapter for Reown (used in PaymentTerminal)
export const networks = [mainnet, arbitrum, baseSepolia]

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
    ssr: true
})

// 3. Configure the metadata for Reown
const metadata = {
    name: 'SigPad',
    description: 'Verify your EVM address ownership',
    url: 'http://localhost:5173',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create the Reown modal (used for PaymentTerminal wallet connection)
createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, arbitrum, baseSepolia],
    metadata,
    projectId,
    features: {
        analytics: true,
        email: false,
        socials: false
    }
})

const queryClient = new QueryClient()

/**
 * Web3Provider wraps both:
 * - ThirdwebProvider: For merchant authentication on landing page (social login)
 * - WagmiProvider: For Reown wallet connection in PaymentTerminal (transaction signing)
 * 
 * Both providers can coexist as they manage separate wallet connections:
 * - Thirdweb: Merchant login via email/social
 * - Reown/Wagmi: User wallet for payment transaction signing
 */
export function Web3Provider({ children }: PropsWithChildren) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <ThirdwebProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ThirdwebProvider>
        </WagmiProvider>
    )
}
