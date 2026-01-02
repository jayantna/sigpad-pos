import { createThirdwebClient } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

// Create thirdweb client with your client ID
// Get your client ID from https://thirdweb.com/dashboard
export const client = createThirdwebClient({
    clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

// Define the chain we support
export const chain = baseSepolia;

// Base Sepolia chain ID for comparison
export const BASE_SEPOLIA_CHAIN_ID = 84532;

// Account Abstraction configuration for smart wallets with gasless transactions
// sponsorGas enables thirdweb's Paymaster to cover gas fees for users
export const accountAbstractionConfig = {
    chain: baseSepolia,
    sponsorGas: true,
};
