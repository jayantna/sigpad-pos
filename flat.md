# Contents of . source tree

## README

```markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

## File: tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

## File: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>sigpad-admin</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## File: tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

## File: package.json

```json
{
  "name": "sigpad-admin",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.18",
    "axios": "^1.13.2",
    "lucide-react": "^0.562.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.11.0",
    "sonner": "^2.0.7",
    "tailwindcss": "^4.1.18",
    "thirdweb": "^5.116.1",
    "viem": "^2.43.3"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}

```

## File: tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

## File: eslint.config.js

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

## File: vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
})

```

## File: docs/SESSION_KEYS.md

```markdown
# Session Keys Setup Guide

This guide explains how to configure thirdweb session keys for automatic transaction signing in the SigPad Admin application.

## What are Session Keys?

Session keys enable secure transaction execution on behalf of smart accounts without requiring the user to sign each transaction. This provides a smoother UX where:

1. Users connect once and authorize a "session key" (server wallet)
2. Future transactions can be signed automatically by the server
3. No more popup approvals for each transaction

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                         │
│  ┌─────────────────┐    ┌─────────────────────────────────────┐ │
│  │  ConnectButton  │───▶│  Smart Account (ERC-4337)           │ │
│  │  (with session  │    │  - User's wallet as admin           │ │
│  │   key config)   │    │  - Session key as authorized signer │ │
│  └─────────────────┘    └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (Node.js + Engine)                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Engine Server Wallet                                        ││
│  │ - Signs transactions using session key                      ││
│  │ - No user approval needed                                   ││
│  │ - Executes on behalf of user's smart account                ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## Setup Steps

### 1. Create an Engine Server Wallet

First, you need a thirdweb Engine server wallet that will act as the session key:

1. Go to [thirdweb Dashboard](https://thirdweb.com/dashboard)
2. Navigate to Engine → Server Wallets
3. Create a new server wallet
4. Copy the wallet address (this is your `SESSION_KEY_ADDRESS`)

### 2. Configure Environment Variables

Add the session key address to your `.env` file:

```env
# Your thirdweb client ID
VITE_THIRDWEB_CLIENT_ID=your-client-id

# Session Key Server Wallet Address (Engine server wallet)
VITE_SESSION_KEY_ADDRESS=0x...your-engine-server-wallet-address
```

### 3. How It Works

When `VITE_SESSION_KEY_ADDRESS` is set:

1. **User connects** via ConnectButton with `accountAbstraction` enabled
2. **Smart Account is created** - user's wallet becomes the admin
3. **Session key is registered** - the server wallet is authorized as a signer
4. **Gasless transactions** - `sponsorGas: true` means users don't pay gas

### 4. Frontend Transactions (Current Behavior)

Currently, the frontend uses `useSendAndConfirmTransaction` hook for transactions (e.g., in `CreateAssetModal.tsx`). With smart accounts:

- ✅ Transactions are **gasless** (sponsored)
- ⚠️ Users still need to **approve** each transaction via their wallet

### 5. Backend Auto-Signing (Full Session Key Experience)

For **true automatic signing** with no user popups, you need a backend:

```typescript
// Backend: Execute transaction using Engine
import { Engine, sendTransaction, prepareContractCall, getContract } from "thirdweb";

const serverWallet = Engine.serverWallet({
  address: SESSION_KEY_ADDRESS,
  chain: baseSepolia,
  client,
  executionOptions: {
    entrypointVersion: "0.6",
    signerAddress: SESSION_KEY_ADDRESS,
    smartAccountAddress: userSmartAccountAddress, // From frontend
    type: "ERC4337",
  },
});

// Execute transaction - NO user approval needed!
const tx = await sendTransaction({
  account: serverWallet,
  transaction: prepareContractCall({
    contract: getContract({ client, chain, address: contractAddress }),
    method: "function mint(address to, uint256 amount)",
    params: [recipientAddress, amount],
  }),
});
```

### 6. Frontend API Call Pattern

In your frontend, call your backend API to execute transactions:

```typescript
import { executeViaBackend } from './hooks/useSessionKeyTransaction';

const handleAutoMint = async () => {
  const result = await executeViaBackend(
    'https://your-backend.com/api/session-tx',
    account.address, // User's smart account address
    {
      contractAddress: '0x...',
      method: 'function mint(address to, uint256 amount)',
      params: [recipientAddress, amount],
    }
  );
  console.log('Transaction hash:', result.transactionHash);
};
```

## Session Key Permissions

You can configure what the session key is allowed to do:

```typescript
sessionKey: {
  address: SESSION_KEY_ADDRESS,
  permissions: {
    // Option 1: Allow all contracts
    approvedTargets: "*",
    
    // Option 2: Specific contracts only (recommended for production)
    // approvedTargets: [
    //   "0x...factory-contract",
    //   "0x...token-contract",
    // ],
  },
},
```

## Security Considerations

1. **Use specific targets** - In production, specify exact contract addresses instead of `"*"`
2. **Secure the server wallet** - Store server wallet credentials in a vault
3. **Monitor usage** - Track session key transactions for suspicious activity
4. **Key rotation** - Regularly rotate session keys for enhanced security

## Checking Session Key Status

Use the provided hook to verify if a session key is active:

```typescript
import { useSessionKey } from './hooks/useSessionKeyTransaction';

function MyComponent() {
  const { 
    isSessionKeyConfigured, 
    isSessionKeyActive, 
    checkSessionKeyStatus 
  } = useSessionKey();

  useEffect(() => {
    if (isSessionKeyConfigured) {
      checkSessionKeyStatus();
    }
  }, [isSessionKeyConfigured]);

  return (
    <div>
      {isSessionKeyActive && <span>✅ Session key active</span>}
    </div>
  );
}
```

## Troubleshooting

### Session key not active
- Ensure the user connected AFTER session key was configured
- User may need to reconnect to register the session key

### Permission denied
- Check that the target contract is in `approvedTargets`
- Verify the session key address is correct

### Gas estimation failed
- Verify `sponsorGas: true` is set
- Check that you have credits in thirdweb dashboard for mainnet

## Resources

- [thirdweb Session Keys Documentation](https://portal.thirdweb.com/transactions/session-keys)
- [Account Abstraction Guide](https://portal.thirdweb.com/react/v5/account-abstraction/get-started)
- [Engine Documentation](https://portal.thirdweb.com/engine)

```

## File: src/App.tsx

```tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConnectButton, useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from 'thirdweb/react'
import { inAppWallet, createWallet } from 'thirdweb/wallets'
import { client, chain, BASE_SEPOLIA_CHAIN_ID, accountAbstractionConfig } from './lib/thirdweb'

function App() {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'success'>('idle')
  const navigate = useNavigate()

  const account = useActiveAccount()
  const activeChain = useActiveWalletChain()
  const switchChain = useSwitchActiveWalletChain()

  // Derive verifiedAddress from thirdweb state
  const isConnected = !!account
  const address = account?.address
  const chainId = activeChain?.id
  const verifiedAddress = isConnected && address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null

  useEffect(() => {
    if (verifiedAddress) {
      setStatus('success')
    } else {
      setStatus('idle')
    }
  }, [verifiedAddress])

  // Effect to force network switch if connected but wrong network
  useEffect(() => {
    if (isConnected && chainId && chainId !== BASE_SEPOLIA_CHAIN_ID) {
      // Auto-switch to Base Sepolia
      switchChain(chain)
    }
  }, [isConnected, chainId, switchChain])

  const isWrongNetwork = isConnected && chainId !== BASE_SEPOLIA_CHAIN_ID

  // Configure wallets - In-App wallet for email/social with smart account support
  // Smart account enables gasless transactions via thirdweb's Paymaster
  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "discord",
          "telegram",
          "x",
          "github",
          "passkey"
        ],
      },
      // Configure smart account for gasless transactions
      smartAccount: accountAbstractionConfig,
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative z-10 w-full max-w-md p-12 bg-surface/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl text-center animate-fade-in mx-4">
        {status === 'success' && verifiedAddress ? (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Connected</h2>
              <p className="text-zinc-400 text-sm">Welcome back, Admin</p>
            </div>
            <div className="w-full p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-sm text-zinc-300 break-all select-all">
              {verifiedAddress}
            </div>
            <button
              type="button"
              className="w-full py-4 text-lg font-semibold text-white bg-primary rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/40"
              onClick={() => navigate('/assets')}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-6xl font-bold py-4 mb-2 bg-gradient-to-br from-white to-indigo-400 bg-clip-text text-transparent tracking-tighter">SigPad</h1>
            <p className="text-gray-400 mb-10 text-lg">Admin Login</p>

            <div className="flex flex-col gap-6">
              {isWrongNetwork ? (
                <button
                  onClick={() => switchChain(chain)}
                  className="w-full py-4 text-lg font-semibold text-white bg-red-500/80 hover:bg-red-500 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40"
                >
                  Switch to Base Sepolia
                </button>
              ) : (
                <div className="flex justify-center">
                  <ConnectButton
                    client={client}
                    wallets={wallets}
                    chain={chain}
                    accountAbstraction={accountAbstractionConfig}
                    theme="dark"
                    connectModal={{
                      title: "Sign in to SigPad Admin",
                      size: "compact",
                    }}
                    connectButton={{
                      label: "Connect Wallet",
                      style: {
                        width: '100%',
                        padding: '1rem 2rem',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        borderRadius: '0.75rem',
                        background: 'var(--color-primary)',
                      }
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Supports Email, Google, Apple, Discord, and external wallets.
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App

```

## File: src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Assets from './pages/Assets.tsx'
import Strategies from './pages/Strategies.tsx'
import StrategyBuilder from './pages/StrategyBuilder.tsx'
import AssetView from './pages/AssetView.tsx'
import Layout from './Layout.tsx'
import { Web3Provider } from './provider/Web3Provider.tsx'

import ProtectedRoute from './components/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/view" element={<AssetView />} />
              <Route path="/strategies" element={<Strategies />} />
              <Route path="/strategies/new" element={<StrategyBuilder />} />
              <Route path="/strategies/:strategyId" element={<StrategyBuilder />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  </StrictMode>,
)

```

## File: src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

## File: src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Outfit', system-ui, sans-serif;

  --color-bg: #050505;
  --color-surface: #121212;
  --color-primary: #8b5cf6;
  --color-primary-glow: rgba(139, 92, 246, 0.4);

  --animate-fade-in: fadeIn 0.2s ease-out;
  --animate-shake: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {

    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
}

:root {
  color-scheme: dark;
}

body {
  @apply bg-bg text-white font-sans min-h-screen overflow-x-hidden;
  background: radial-gradient(circle at 50% 0%, #1a1a2e 0%, #050505 70%);
}
```

## File: src/Layout.tsx

```tsx
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/Header'

export default function Layout() {
    return (
        <main className="relative min-h-screen w-full overflow-x-hidden">
            <Header />
            <Outlet />
            <Toaster position="top-center" richColors />
        </main>
    )
}

```

## File: src/types/assets.ts

```typescript
export type AssetType = 'FUNGIBLE' | 'NFT';

export interface Asset {
    id?: string; // Frontend mapped ID
    name: string;
    type: AssetType;
    image_url: string;
    contract_address: string;
    ticker: string;
    collection_name?: string;
    initial_supply?: string;
    updatedAt: string;
    created_at?: string; // Frontend mapped
}

export interface CreateAssetRequest {
    name: string;
    type: AssetType;
    image_url: string;
    contract_address?: string;
    ticker?: string;
    collection_name?: string;
    initial_supply?: string;
}

```

## File: src/types/strategies.ts

```typescript
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

```

## File: src/provider/Web3Provider.tsx

```tsx
import { ThirdwebProvider } from "thirdweb/react";
import type { PropsWithChildren } from 'react'

export function Web3Provider({ children }: PropsWithChildren) {
    return (
        <ThirdwebProvider>
            {children}
        </ThirdwebProvider>
    )
}

```

## File: src/abi/CraftERC721Token/abi.ts

```typescript
export const abi = [
        {
            "type": "function",
            "name": "getTokenOwners",
            "inputs": [
                {
                    "name": "index",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getTokenOwnersLength",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getTokensMintedByAddress",
            "inputs": [
                {
                    "name": "addr",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address[]",
                    "internalType": "address[]"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "mintERC721Token",
            "inputs": [
                {
                    "name": "tokenName",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "tokenSymbol",
                    "type": "string",
                    "internalType": "string"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "contract NFT"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "TokenCrafted",
            "inputs": [
                {
                    "name": "tokenDeployer",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "tokenContract",
                    "type": "address",
                    "indexed": false,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        }
    ]
```

## File: src/abi/CraftERC20Token/abi.ts

```typescript
export const abi = [
        {
            "type": "function",
            "name": "getTokenOwners",
            "inputs": [
                {
                    "name": "index",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getTokenOwnersLength",
            "inputs": [],
            "outputs": [
                {
                    "name": "",
                    "type": "uint256",
                    "internalType": "uint256"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "getTokensMintedByAddress",
            "inputs": [
                {
                    "name": "addr",
                    "type": "address",
                    "internalType": "address"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address[]",
                    "internalType": "address[]"
                }
            ],
            "stateMutability": "view"
        },
        {
            "type": "function",
            "name": "mintERC20Token",
            "inputs": [
                {
                    "name": "initialSupply",
                    "type": "uint256",
                    "internalType": "uint256"
                },
                {
                    "name": "tokenName",
                    "type": "string",
                    "internalType": "string"
                },
                {
                    "name": "tokenSymbol",
                    "type": "string",
                    "internalType": "string"
                }
            ],
            "outputs": [
                {
                    "name": "",
                    "type": "address",
                    "internalType": "contract Token"
                }
            ],
            "stateMutability": "nonpayable"
        },
        {
            "type": "event",
            "name": "TokenCrafted",
            "inputs": [
                {
                    "name": "tokenDeployer",
                    "type": "address",
                    "indexed": true,
                    "internalType": "address"
                },
                {
                    "name": "tokenContract",
                    "type": "address",
                    "indexed": false,
                    "internalType": "address"
                }
            ],
            "anonymous": false
        }
    ]
```

## File: src/components/CreateAssetModal.tsx

```tsx
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useSendAndConfirmTransaction, useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { prepareContractCall, getContract } from 'thirdweb'
import { parseEther, decodeEventLog } from 'viem'
import axios from 'axios'
import type { AssetType, CreateAssetRequest } from '../types/assets'
import { abi as ERC20Abi } from '../abi/CraftERC20Token/abi'
import { abi as ERC721Abi } from '../abi/CraftERC721Token/abi'
import { client, chain, BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'

// TODO: Update with actual Factory addresses on Base Sepolia
const FACTORY_ADDRESS_ERC20 = import.meta.env.VITE_FACTORY_ADDRESS_ERC20
const FACTORY_ADDRESS_ERC721 = import.meta.env.VITE_FACTORY_ADDRESS_ERC721

interface CreateAssetModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function CreateAssetModal({ isOpen, onClose, onSuccess }: CreateAssetModalProps) {
    const [step, setStep] = useState(1)
    const [deployedAddress, setDeployedAddress] = useState('')

    // Form state
    const [name, setName] = useState('')
    const [type, setType] = useState<AssetType>('FUNGIBLE')
    const [imageUrl, setImageUrl] = useState('')
    const [ticker, setTicker] = useState('')
    const [initialSupply, setInitialSupply] = useState('')

    // Transaction state
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { mutateAsync: sendAndConfirmTransaction, isPending } = useSendAndConfirmTransaction()
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const address = account?.address
    const chainId = activeChain?.id
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null

    // Reset state when modal is opened/closed
    useEffect(() => {
        if (!isOpen) {
            // Slight delay to allow fade out animation if needed, or just reset immediately
            const timer = setTimeout(() => {
                setStep(1)
                setName('')
                setTicker('')
                setInitialSupply('')
                setImageUrl('')
                setIsSubmitting(false)
                setDeployedAddress('')
                // Default back to Fungible? or keep last choice? Let's reset.
                setType('FUNGIBLE')
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const contractAddress = type === 'FUNGIBLE' ? FACTORY_ADDRESS_ERC20 : FACTORY_ADDRESS_ERC721
            const abi = type === 'FUNGIBLE' ? ERC20Abi : ERC721Abi

            if (!contractAddress) {
                throw new Error(`${type === 'FUNGIBLE' ? 'ERC20' : 'ERC721'} Factory Address not configured`)
            }

            const contract = getContract({
                client,
                chain,
                address: contractAddress,
                abi: abi as any,
            })

            let transaction
            if (type === 'FUNGIBLE') {
                transaction = prepareContractCall({
                    contract,
                    method: "function mintERC20Token(uint256 _initialSupply, string _name, string _symbol)",
                    params: [parseEther(initialSupply || '0'), name, ticker],
                })
            } else {
                transaction = prepareContractCall({
                    contract,
                    method: "function mintERC721Token(string _name, string _symbol)",
                    params: [name, ticker],
                })
            }

            toast.loading('Transaction is being confirmed...', { id: 'tx-loading' })

            const receipt = await sendAndConfirmTransaction(transaction)

            // Find the TokenCrafted event for deployed contract address
            let tokenAddress = ''
            const currentAbi = type === 'FUNGIBLE' ? ERC20Abi : ERC721Abi
            for (const log of receipt.logs) {
                try {
                    const decoded = decodeEventLog({
                        abi: currentAbi,
                        data: log.data,
                        topics: log.topics,
                    })
                    if (decoded.eventName === 'TokenCrafted') {
                        // @ts-ignore
                        tokenAddress = decoded.args.tokenContract
                        break
                    }
                } catch (e) {
                    // verify next log
                }
            }

            setDeployedAddress(tokenAddress)

            const payload: CreateAssetRequest = {
                name,
                type,
                image_url: imageUrl || (type === 'FUNGIBLE' ? `https://placehold.co/100x100/8b5cf6/ffffff?text=${ticker}` : ''),
                ticker,
                initial_supply: type === 'FUNGIBLE' ? initialSupply : undefined,
                collection_name: type === 'NFT' ? name : undefined,
                contract_address: tokenAddress || undefined
            }

            // Mocking the API call if backend is not reachable
            try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/merchant/${verifiedAddress}`, payload)
            } catch (err) {
                console.warn('Backend sync failed', err)
            }

            toast.dismiss('tx-loading')
            toast.success('Asset created successfully')
            onSuccess()

            // Move to Step 3
            setIsSubmitting(false)
            setStep(3)
        } catch (error: any) {
            console.error(error)
            toast.dismiss('tx-loading')
            toast.error(error.message || 'Failed to deploy asset')
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg p-8 bg-surface border border-white/10 rounded-2xl shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Create New Asset</h2>

                {/* Steps Indicator - Optional visual aid */}
                <div className="flex gap-2 mb-6 text-sm text-zinc-500">
                    <span className={step >= 1 ? "text-primary font-medium" : ""}>1. Type</span>
                    <span>→</span>
                    <span className={step >= 2 ? "text-primary font-medium" : ""}>2. Details</span>
                    <span>→</span>
                    <span className={step >= 3 ? "text-primary font-medium" : ""}>3. Done</span>
                </div>

                {step === 1 && (
                    <div className="flex flex-col gap-4 animate-fade-in">
                        <p className="text-zinc-400 mb-2">Select the type of asset you want to create:</p>

                        <button
                            onClick={() => { setType('FUNGIBLE'); setStep(2); }}
                            className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:bg-white/5 hover:border-primary/50 transition-all text-left bg-zinc-900/50"
                        >
                            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                {/* Coin Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><path d="M12 16V8" /><path d="M16 12H8" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Fungible Token</h3>
                                <p className="text-sm text-zinc-400">Standard ERC20 tokens like USDC or PEPE.</p>
                            </div>
                        </button>

                        <button
                            onClick={() => { setType('NFT'); setStep(2); }}
                            className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:bg-white/5 hover:border-primary/50 transition-all text-left bg-zinc-900/50"
                        >
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                                {/* Image Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">NFT Collection</h3>
                                <p className="text-sm text-zinc-400">ERC721 collection for unique digital items.</p>
                            </div>
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fade-in">
                        <div className="mb-1">
                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                {type === 'FUNGIBLE' ? 'Fungible Token' : 'NFT Collection'}
                            </span>
                        </div>

                        {type === 'FUNGIBLE' ? (
                            /* FUNGIBLE FORM */
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm text-zinc-400">Asset Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Gold Coin"
                                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-zinc-400">Symbol (Ticker)</label>
                                    <input
                                        required
                                        type="text"
                                        value={ticker}
                                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                        placeholder="e.g. GLD"
                                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-zinc-400">Initial Supply</label>
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={initialSupply}
                                        onChange={(e) => setInitialSupply(e.target.value)}
                                        placeholder="e.g. 1000000"
                                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                    <p className="text-xs text-zinc-500 pt-1">
                                        Asset owner can mint more tokens anytime or through x402 payment strategies..
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* NFT FORM */
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-sm text-zinc-400">Collection Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Royal Gold Series"
                                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-zinc-400">Symbol</label>
                                    <input
                                        required
                                        type="text"
                                        value={ticker}
                                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                        placeholder="e.g. RGS"
                                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-zinc-400">Collection Image URL</label>
                                    <input
                                        required
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 bg-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-zinc-500">
                                    Asset owners can mint new NFTs to this collection anytime or through x402 payment strategies.
                                </p>
                            </div>
                        )}

                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="px-4 py-3.5 text-base font-semibold text-zinc-400 hover:text-white transition-colors"
                                disabled={isSubmitting || isPending}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isPending}
                                className="flex-1 py-3.5 text-base font-semibold text-white bg-primary rounded-xl transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting || isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        {isPending ? 'Confirming...' : 'Signing...'}
                                    </>
                                ) : (
                                    type === 'FUNGIBLE' ? 'Create Token' : 'Create Collection'
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div className="flex flex-col items-center justify-center py-4 animate-fade-in text-center">
                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
                        <p className="text-zinc-400 mb-6">
                            Your {type === 'FUNGIBLE' ? 'Token' : 'Collection'} <strong>{name}</strong> has been created.
                        </p>

                        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-6 text-left">
                            <div className="text-sm text-zinc-500 mb-1">Deployed Contract Address</div>
                            <div className="font-mono text-white break-all">{deployedAddress || '0x...'}</div>
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-8">
                            <p className="text-sm text-primary font-medium">
                                Next Step: Use this token to create payment strategies in the Strategies Page.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-3.5 text-base font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

```

## File: src/components/ProtectedRoute.tsx

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useActiveAccount, useActiveWalletChain, useIsAutoConnecting } from 'thirdweb/react'
import { BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'

export default function ProtectedRoute() {
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const isAutoConnecting = useIsAutoConnecting()

    const address = account?.address
    const chainId = activeChain?.id

    // Only consider verified if connected to Base Sepolia
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null

    if (isAutoConnecting) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!verifiedAddress) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

```

## File: src/components/Header.tsx

```tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { useActiveAccount, useActiveWalletChain, useActiveWallet, useDisconnect } from 'thirdweb/react'
import { BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'

export default function Header() {
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const wallet = useActiveWallet()
    const { disconnect } = useDisconnect()
    const navigate = useNavigate()
    const location = useLocation()

    // Only consider verified if connected to Base Sepolia
    const address = account?.address
    const chainId = activeChain?.id
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null

    const handleLogout = () => {
        if (wallet) {
            disconnect(wallet)
        }
        navigate('/')
    }

    const isActive = (path: string) => location.pathname.startsWith(path)

    return (
        <>
            <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        SigPad Admin
                    </span>
                </div>
                {verifiedAddress && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/assets')}
                            className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${isActive('/assets') ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white'}`}
                        >
                            Assets
                        </button>
                        <button
                            onClick={() => navigate('/strategies')}
                            className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${isActive('/strategies') ? 'text-white bg-white/10' : 'text-zinc-300 hover:text-white'}`}
                        >
                            Strategies
                        </button>
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
        </>
    )
}

```

## File: src/lib/thirdweb.ts

```typescript
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

```

## File: src/pages/AssetView.tsx

```tsx
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'
import type { Asset } from '../types/assets'

export default function AssetView() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const contractAddress = searchParams.get('contract_address')
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const address = account?.address
    const chainId = activeChain?.id
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null
    const [asset, setAsset] = useState<Asset | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!verifiedAddress) return

        if (!contractAddress) {
            setIsLoading(false)
            return
        }

        const fetchAsset = async () => {
            setIsLoading(true)
            try {
                const url = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/merchant/${verifiedAddress}`
                const res = await axios.get(url, {
                    params: {
                        contract_address: contractAddress
                    }
                })
                setAsset(res.data)
            } catch (err) {
                console.error('Failed to fetch asset details', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchAsset()
    }, [verifiedAddress, contractAddress])

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 animate-pulse">
                <div className="h-8 w-32 bg-white/5 rounded mb-8"></div>
                <div className="bg-surface/30 border border-white/5 rounded-3xl p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-2xl"></div>
                        <div className="flex-1 space-y-4">
                            <div className="h-10 w-3/4 bg-white/5 rounded"></div>
                            <div className="h-6 w-1/2 bg-white/5 rounded"></div>
                            <div className="h-24 w-full bg-white/5 rounded mt-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!asset) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold text-white mb-4">Asset not found</h2>
                <button
                    onClick={() => navigate('/assets')}
                    className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                >
                    Back to Assets
                </button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-6 pt-28 pb-6 animate-fade-in">
            <button
                onClick={() => navigate('/assets')}
                className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                </svg>
                Back to Assets
            </button>

            <div className="bg-surface/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 p-8 bg-black/20 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                        <div className="relative group w-full aspect-square max-w-[300px]">
                            {asset.type === 'FUNGIBLE' ? (
                                <div className="w-full h-full rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                                    <span className="text-4xl font-bold text-primary font-mono">{asset.ticker}</span>
                                </div>
                            ) : (
                                <img
                                    src={asset.image_url}
                                    alt={asset.name}
                                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                                    onError={(e) => {
                                        const target = e.currentTarget
                                        target.onerror = null
                                        target.src = `https://placehold.co/400x400/202020/ffffff?text=${asset.ticker || 'NFT'}`
                                    }}
                                />
                            )}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold tracking-wider text-white">
                                {asset.type}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">{asset.name}</h1>
                                <p className="text-xl text-primary font-mono tracking-wide">{asset.ticker}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Last Updated</p>
                                <p className="text-zinc-300 font-mono text-sm">
                                    {new Date(asset.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group">
                                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Contract Address</p>
                                <div className="flex items-center gap-3">
                                    <code className="text-white font-mono text-sm break-all">{asset.contract_address}</code>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(asset.contract_address)}
                                        className="p-1.5 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                        title="Copy Address"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Initial Supply</p>
                                    <p className="text-2xl font-bold text-white font-mono">
                                        {parseInt(asset.initial_supply || '0').toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <p className="text-white font-medium">Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

```

## File: src/pages/StrategyBuilder.tsx

```tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'
import type { Strategy, Rule, Condition, Action } from '../types/strategies'
import { toast } from 'sonner'
import type { Asset } from '../types/assets'

export default function StrategyBuilder() {
    const navigate = useNavigate()
    const { strategyId } = useParams()
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const address = account?.address
    const chainId = activeChain?.id
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null
    const [isLoadingAssets, setIsLoadingAssets] = useState(true)
    const [isLoadingStrategy, setIsLoadingStrategy] = useState(false)
    const [assets, setAssets] = useState<Asset[]>([])
    const [isSaving, setIsSaving] = useState(false)

    // Strategy State
    const [name, setName] = useState('')

    // We'll focus on a single rule for now as per the UI prompt, although the type supports multiple.
    const [rule, setRule] = useState<Rule>({
        trigger: 'PAYMENT_REQUEST',
        conditions: [],
        action: {
            type: 'DISCOUNT_PERCENT',
            value: 0
        }
    })

    // Fetch Assets
    useEffect(() => {
        if (!verifiedAddress) return

        const fetchAssets = async () => {
            setIsLoadingAssets(true)
            try {
                const url = `${import.meta.env.VITE_API_URL}/api/merchant/${verifiedAddress}`
                const res = await axios.get(url)
                if (res.data && res.data.contracts) {
                    setAssets(Object.values(res.data.contracts))
                }
            } catch (err) {
                console.error('Failed to fetch assets', err)
            } finally {
                setIsLoadingAssets(false)
            }
        }
        fetchAssets()
    }, [verifiedAddress])

    // Fetch Strategy if editing
    useEffect(() => {
        if (!verifiedAddress || !strategyId) return

        const fetchStrategy = async () => {
            setIsLoadingStrategy(true)
            try {
                // Fetch all strategies to find the one we need
                // Ideally this should be a single fetch endpoint
                const url = `${import.meta.env.VITE_API_URL}/api/merchant/strategies/${verifiedAddress}`
                const res = await axios.get(url)
                if (res.data) {
                    const strategies: Strategy[] = Array.isArray(res.data) ? res.data : (res.data.strategies || [])
                    const found = strategies.find(s => s.strategy_id === strategyId || s._id === strategyId)

                    if (found) {
                        setName(found.name)
                        if (found.rules && found.rules.length > 0) {
                            setRule(found.rules[0])
                        }
                    } else {
                        // Strategy not found, maybe redirect or show error
                        console.error('Strategy not found')
                        navigate('/strategies')
                    }
                }
            } catch (err) {
                console.error('Failed to fetch strategy', err)
            } finally {
                setIsLoadingStrategy(false)
            }
        }
        fetchStrategy()
    }, [verifiedAddress, strategyId, navigate])

    const handleSave = async () => {
        if (!name || !verifiedAddress) {
            toast.error('Please enter a strategy name')
            return
        }

        setIsSaving(true)
        try {
            const strategyPayload: Partial<Strategy> = {
                merchant_id: verifiedAddress,
                name,
                is_active: true,
                priority: 1,
                rules: [rule]
            }

            if (strategyId) {
                // Update
                const url = `${import.meta.env.VITE_API_URL}/api/merchant/strategies/${verifiedAddress}/${strategyId}`
                await axios.put(url, strategyPayload)
                toast.success('Strategy updated successfully')
            } else {
                // Create
                const url = `${import.meta.env.VITE_API_URL}/api/merchant/strategies/new/${verifiedAddress}`
                await axios.post(url, strategyPayload)
                toast.success('Strategy created successfully')
            }

            navigate('/strategies')
        } catch (err) {
            console.error('Failed to save strategy', err)
            toast.error('Failed to save strategy. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    const addCondition = () => {
        setRule(prev => ({
            ...prev,
            conditions: [
                ...prev.conditions,
                { field: 'TOKEN_BALANCE', operator: 'GT', value: 0, asset_id: assets[0]?.contract_address || '' }
            ]
        }))
    }

    const removeCondition = (index: number) => {
        setRule(prev => ({
            ...prev,
            conditions: prev.conditions.filter((_, i) => i !== index)
        }))
    }

    const updateCondition = (index: number, field: keyof Condition, value: any) => {
        setRule(prev => {
            const newConditions = [...prev.conditions]
            newConditions[index] = { ...newConditions[index], [field]: value }
            return { ...prev, conditions: newConditions }
        })
    }

    const updateAction = (field: keyof Action, value: any) => {
        setRule(prev => ({
            ...prev,
            action: { ...prev.action, [field]: value }
        }))
    }

    if (isLoadingAssets || isLoadingStrategy) {
        return (
            <div className="container mx-auto px-4 py-8 animate-fade-in max-w-5xl flex items-center justify-center min-h-[50vh]">
                <div className="text-zinc-500">Loading Configuration...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 pt-28 pb-8 animate-fade-in max-w-5xl">
            {/* Header */}
            <div className="sticky top-24 z-40 bg-surface/80 backdrop-blur-md -mx-4 px-4 py-4 rounded-b-2xl mb-8 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/strategies')}
                        className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{strategyId ? 'Edit Strategy' : 'Create Strategy'}</h1>
                        <p className="text-zinc-500 text-sm">Define automated logic for your payments</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving || !name}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-lg shadow-primary/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    {isSaving ? 'Saving...' : (strategyId ? 'Update Strategy' : 'Save Strategy')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Builder Area */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Strategy Name */}
                    <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                        <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">Strategy Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Gold Member Discount"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50"
                        />
                    </div>

                    {/* Trigger Block */}
                    <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50"></div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-4">When...</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500">Event</label>
                                        <select
                                            value={rule.trigger}
                                            onChange={(e) => setRule({ ...rule, trigger: e.target.value as any })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                                        >
                                            <option value="PAYMENT_REQUEST">Payment Request</option>
                                            <option value="PAYMENT_SUCCESS">Payment Success</option>
                                            <option value="MANUAL_REDEEM">Redeem Button Clicked</option>
                                        </select>
                                    </div>
                                    {rule.trigger === 'MANUAL_REDEEM' && (
                                        <div className="space-y-2">
                                            <label className="text-xs text-zinc-500">Item ID (Optional)</label>
                                            <input
                                                type="text"
                                                value={rule.selection_id || ''}
                                                onChange={(e) => setRule({ ...rule, selection_id: e.target.value })}
                                                placeholder="e.g. item_latte"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/50"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conditions Block */}
                    <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500/50"></div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">If...</h3>
                                    <button
                                        onClick={addCondition}
                                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-300 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Condition
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {rule.conditions.length === 0 && (
                                        <p className="text-sm text-zinc-500 italic">No conditions (Always apply)</p>
                                    )}
                                    {rule.conditions.map((condition, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-2 items-start md:items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                            <select
                                                value={condition.field}
                                                onChange={(e) => updateCondition(idx, 'field', e.target.value)}
                                                className="bg-transparent border-none text-zinc-300 text-sm focus:ring-0 cursor-pointer"
                                            >
                                                <option value="TOKEN_BALANCE">Token Balance</option>
                                                <option value="TX_HISTORY_COUNT">Tx History</option>
                                            </select>

                                            <select
                                                value={condition.operator}
                                                onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                                                className="bg-white/5 rounded-lg border-none text-zinc-300 text-sm w-24 px-2 py-1.5 focus:ring-0 cursor-pointer"
                                            >
                                                <option value="GT">&gt;</option>
                                                <option value="GTE">&gt;=</option>
                                                <option value="EQ">=</option>
                                                <option value="LT">&lt;</option>
                                                <option value="LTE">&lt;=</option>
                                            </select>

                                            {condition.field === 'TOKEN_BALANCE' && (
                                                <select
                                                    value={condition.asset_id}
                                                    onChange={(e) => updateCondition(idx, 'asset_id', e.target.value)}
                                                    className="flex-1 bg-white/5 rounded-lg border-none text-white text-sm px-3 py-1.5 focus:ring-0 w-full md:w-auto"
                                                >
                                                    <option value="" disabled>Select Asset</option>
                                                    {assets.map(asset => (
                                                        <option key={asset.contract_address} value={asset.contract_address}>
                                                            {asset.ticker} ({asset.name})
                                                        </option>
                                                    ))}
                                                </select>
                                            )}

                                            <input
                                                type="number"
                                                value={condition.value}
                                                onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                                                placeholder="Value"
                                                className="w-24 bg-white/5 rounded-lg border-none text-white text-sm px-3 py-1.5 focus:ring-0 placeholder-zinc-600"
                                            />

                                            <button
                                                onClick={() => removeCondition(idx)}
                                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors ml-auto"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Block */}
                    <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50"></div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-4">Then...</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500">Action Type</label>
                                        <select
                                            value={rule.action.type}
                                            onChange={(e) => setRule({
                                                ...rule,
                                                action: { ...rule.action, type: e.target.value as any }
                                            })}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 appearance-none"
                                        >
                                            <option value="DISCOUNT_PERCENT">Give Discount %</option>
                                            <option value="MINT_ASSET">Mint Asset</option>
                                            <option value="BURN_AND_DISCOUNT">Burn & Discount</option>
                                        </select>
                                    </div>

                                    {rule.action.type === 'DISCOUNT_PERCENT' && (
                                        <div className="space-y-2">
                                            <label className="text-xs text-zinc-500">Percentage</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={rule.action.value || ''}
                                                    onChange={(e) => updateAction('value', parseFloat(e.target.value))}
                                                    placeholder="10"
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 pl-4 pr-8"
                                                />
                                                <span className="absolute right-4 top-3 text-zinc-500">%</span>
                                            </div>
                                        </div>
                                    )}

                                    {rule.action.type === 'MINT_ASSET' && (
                                        <>
                                            <div className="space-y-2">
                                                <label className="text-xs text-zinc-500">Asset to Mint</label>
                                                <select
                                                    value={rule.action.asset_id || ''}
                                                    onChange={(e) => updateAction('asset_id', e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                                                >
                                                    <option value="" disabled>Select Asset</option>
                                                    {assets.map(asset => (
                                                        <option key={asset.contract_address} value={asset.contract_address}>
                                                            {asset.ticker}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-zinc-500">Amount</label>
                                                <input
                                                    type="number"
                                                    value={rule.action.amount || ''}
                                                    onChange={(e) => updateAction('amount', parseFloat(e.target.value))}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar / Preview */}
                <div className="space-y-6">
                    <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">JSON Preview</h3>
                        <div className="bg-black/40 rounded-xl p-4 overflow-x-auto border border-white/5">
                            <pre className="text-xs font-mono text-zinc-300">
                                {JSON.stringify({
                                    name,
                                    merchant_id: verifiedAddress,
                                    rules: [rule]
                                }, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

```

## File: src/pages/Assets.tsx

```tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateAssetModal from '../components/CreateAssetModal'
import type { Asset } from '../types/assets'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'
import axios from 'axios'

// Mock data removed
const SKELETON_ITEMS = Array.from({ length: 4 })

export default function Assets() {
    const navigate = useNavigate()
    const [assets, setAssets] = useState<Asset[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const address = account?.address
    const chainId = activeChain?.id
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null


    const fetchAssets = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/merchant/${verifiedAddress}`)
            if (res.data && res.data.contracts) {
                // The API returns contracts as an object keyed by address
                const assetsArray: Asset[] = Object.values(res.data.contracts).map((asset: any) => ({
                    ...asset,
                    // Ensure id is present, using contract_address as fallback
                    id: asset.contract_address,
                }))
                // Sort by updatedAt desc if possible, or just used as is
                setAssets(assetsArray)
            } else {
                setAssets([])
            }
        } catch (error) {
            console.error('Failed to fetch assets', error)
            setAssets([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAssets()
    }, [])

    return (
        <div className="w-full max-w-6xl px-6 pt-28 pb-6 mx-auto animate-fade-in relative z-0">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Asset Library</h1>
                    <p className="text-zinc-400">Manage your tokens and NFT collections</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                    + Create Asset
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SKELETON_ITEMS.map((_, i) => (
                        <div key={i} className="bg-surface/30 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
                            <div className="aspect-square bg-white/5 p-6 flex items-center justify-center relative">
                                <div className="w-24 h-24 rounded-full bg-white/10"></div>
                                <div className="absolute top-3 right-3 w-12 h-5 bg-white/10 rounded-md"></div>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                                <div className="h-4 w-1/4 bg-white/10 rounded"></div>
                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="h-4 w-24 bg-white/10 rounded"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : assets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-surface/30 border border-white/5 rounded-3xl">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-zinc-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12H3" /><path d="M12 3v18" /></svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No assets yet</h3>
                    <p className="text-zinc-400 mb-6 max-w-sm text-center">Create your first Fungible Token or NFT collection to get started.</p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Create Asset
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {assets.map(asset => (
                        <div key={asset.id || asset.contract_address} onClick={() => navigate(`/assets/view?contract_address=${asset.contract_address}`)} className="group relative bg-surface/50 border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer">
                            <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent p-6 flex items-center justify-center relative">
                                {asset.type === 'FUNGIBLE' ? (
                                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-transform group-hover:scale-105">
                                        <span className="text-xl font-bold text-primary font-mono">{asset.ticker}</span>
                                    </div>
                                ) : (
                                    <img
                                        src={asset.image_url}
                                        alt={asset.name}
                                        className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-105 shadow-md"
                                        onError={(e) => {
                                            const target = e.currentTarget
                                            target.onerror = null // Prevent infinite loop
                                            // Fallback logic: replace image with a placeholder div in parent? 
                                            // Easier to just use a data URL or service for fallback text, 
                                            // but user wants "Token Symbol Name" as fallback image.
                                            // We can use placehold.co or similar dynamically
                                            target.src = `https://placehold.co/400x400/202020/ffffff?text=${asset.ticker || 'NFT'}`
                                        }}
                                    />
                                )}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md border border-white/10 text-[10px] font-bold tracking-wider text-white">
                                    {asset.type === 'FUNGIBLE' ? 'TOKEN' : 'NFT'}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-white mb-1">{asset.name}</h3>
                                {asset.type === 'FUNGIBLE' ? (
                                    <p className="text-sm font-mono text-primary">{asset.ticker}</p>
                                ) : (
                                    <p className="text-sm font-mono text-primary">{asset.ticker}</p>
                                )}
                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-zinc-500">
                                        {asset.contract_address.slice(0, 6)}...{asset.contract_address.slice(-6)}
                                    </span>
                                    <span className={`w-2 h-2 rounded-full ${asset.contract_address ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CreateAssetModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => {
                    fetchAssets()
                }}
            />
        </div>
    )
}

```

## File: src/pages/Strategies.tsx

```tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { BASE_SEPOLIA_CHAIN_ID } from '../lib/thirdweb'
import type { Strategy } from '../types/strategies'
import axios from 'axios'

export default function Strategies() {
    const navigate = useNavigate()
    const account = useActiveAccount()
    const activeChain = useActiveWalletChain()
    const address = account?.address
    const chainId = activeChain?.id
    const verifiedAddress = address && chainId === BASE_SEPOLIA_CHAIN_ID ? address : null
    const [strategies, setStrategies] = useState<Strategy[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchStrategies = async () => {
        if (!verifiedAddress) return

        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/merchant/strategies/${verifiedAddress}`)
            if (res.data) {
                // Determine if res.data is the array or if it's nested
                const data = Array.isArray(res.data) ? res.data : (res.data.strategies || [])
                setStrategies(data)
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
        if (verifiedAddress) {
            fetchStrategies()
        } else {
            setIsLoading(false)
        }
    }, [verifiedAddress])

    return (
        <div className="container mx-auto px-4 pt-28 pb-8 animate-fade-in max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Payment Strategies</h1>
                    <p className="text-zinc-400">Automate your payment flows with triggers and conditions.</p>
                </div>
                <button
                    onClick={() => navigate('/strategies/new')}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Create Strategy
                </button>
            </div>

            {isLoading ? (
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-surface/30 border border-white/5 rounded-2xl p-6 animate-pulse">
                            <div className="h-6 w-1/3 bg-white/10 rounded mb-4"></div>
                            <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : strategies.length === 0 ? (
                <div className="bg-surface/30 border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No strategies yet</h3>
                    <p className="text-zinc-400 max-w-md mb-8">
                        Create your first strategy to start automating discounts, rewards, and token-gated experiences.
                    </p>
                    <button
                        onClick={() => navigate('/strategies/new')}
                        className="px-6 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors border border-white/5"
                    >
                        Build Strategy
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {strategies.map((strategy) => (
                        <div
                            key={strategy._id || strategy.strategy_id}
                            onClick={() => navigate(`/strategies/${strategy.strategy_id || strategy._id}`)}
                            className="group bg-surface/50 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white">{strategy.name}</h3>
                                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${strategy.is_active ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                            {strategy.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm">
                                        {strategy.rules.length} Rule{strategy.rules.length !== 1 ? 's' : ''} configured
                                    </p>
                                </div>
                                <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-sm text-zinc-500 font-mono">
                                <div>ID: {strategy.strategy_id}</div>
                                {strategy.priority && <div>Priority: {strategy.priority}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

```

