# SigPad

SigPad is a modern, Web3-enabled payment terminal application built with React, Vite, and leading blockchain libraries. This application allows users to process payments using various crypto strategies, featuring secure wallet connections, dynamic quoting, and seamless transaction execution.

## Features

- **Dynamic Payment Strategies**: automatically fetches and displays active payment strategies (discounts, rewards) based on merchant configurations and user holdings.
- **Dual Wallet Integration**:
  - **Reown AppKit (Wagmi)**: Robust wallet connection for users to sign payment transactions.
  - **ThirdWeb**: Handles merchant authentication (Social/Email login) and account abstraction.
- **Secure Payment Flow**:
  1. **Strategy Selection**: Users select a payment strategy and enter the amount.
  2. **Payment Terminal**: Connect wallet, generate a secure quote from the backend.
  3. **Execution**: Sign transaction on-chain.
  4. **Verification**: Instant feedback upon successful payment.

## Tech Stack

- **Framework**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Web3**: 
  - [@reown/appkit](https://cloud.reown.com/) & [Wagmi](https://wagmi.sh/): Wallet connection & hooks.
  - [ThirdWeb](https://portal.thirdweb.com/): Client SDK & Auth.
  - [Viem](https://viem.sh/): Low-level EVM interfaces.
  - [@x402/evm](https://www.npmjs.com/package/@x402/evm): Custom EVM utilities.
- **State Management**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP/Networking**: Axios, @x402/fetch

## Prerequisites

Ensure you have the following installed:
- Node.js (v18+ recommended)
- npm or yarn

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd sigpad
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory. You will need keys for ThirdWeb and Reown (formerly WalletConnect).

```env
# ThirdWeb Client ID (from https://thirdweb.com/dashboard)
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id

# Reown Project ID (from https://cloud.reown.com)
VITE_PROJECT_ID=your_reown_project_id

# Backend API URL (e.g., http://localhost:8080)
VITE_API_URL=http://localhost:8080
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/    # Reusable UI components
├── lib/           # Utilities and ThirdWeb client setup
├── pages/         # Main Application Routes:
│   ├── Payment.tsx           # Strategy selection & amount input
│   ├── PaymentTerminal.tsx   # Core terminal: Connect wallet & Pay
│   └── PaymentSuccess.tsx    # Success confirmation page
├── provider/      # Global providers (Web3Provider which wraps Wagmi + ThirdWeb)
├── types/         # TypeScript type definitions
└── App.tsx        # Main application entry & routing
```

## Scripts

- `npm run dev`: Start the dev server.
- `npm run build`: Type-check and build for production.
- `npm run lint`: Run ESLint.
- `npm run preview`: Preview the production build locally.
