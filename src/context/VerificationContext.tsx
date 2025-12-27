import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useDisconnect } from 'wagmi'

interface VerificationContextType {
    verifiedAddress: string | null
    login: (address: string) => void
    logout: () => void
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined)

export function VerificationProvider({ children }: { children: ReactNode }) {
    const [verifiedAddress, setVerifiedAddress] = useState<string | null>(null)
    const { disconnect } = useDisconnect()

    useEffect(() => {
        const stored = localStorage.getItem('sigpad_verified_address')
        if (stored) {
            setVerifiedAddress(stored)
        }
    }, [])

    const login = (address: string) => {
        localStorage.setItem('sigpad_verified_address', address)
        setVerifiedAddress(address)
    }

    const logout = () => {
        localStorage.removeItem('sigpad_verified_address')
        setVerifiedAddress(null)
        disconnect()
    }

    return (
        <VerificationContext.Provider value={{ verifiedAddress, login, logout }}>
            {children}
        </VerificationContext.Provider>
    )
}

export function useVerification() {
    const context = useContext(VerificationContext)
    if (context === undefined) {
        throw new Error('useVerification must be used within a VerificationProvider')
    }
    return context
}
