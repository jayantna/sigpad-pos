import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import type { PropsWithChildren } from 'react'

// 1. Get projectId
const projectId = import.meta.env.VITE_PROJECT_ID

// 2. Set up Wagmi Adapter
export const networks = [mainnet, arbitrum]

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
    ssr: true
})

// 3. Configure the metadata
const metadata = {
    name: 'SigPad',
    description: 'Verify your EVM address ownership',
    url: 'http://localhost:5173', // Updated to match local environment to avoid verify errors
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, arbitrum],
    metadata,
    projectId,
    features: {
        analytics: true,
        email: false,
        socials: false
    }
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: PropsWithChildren) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
