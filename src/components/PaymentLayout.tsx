import { Outlet } from 'react-router-dom'
import WalletFooter from './WalletFooter'

interface PaymentLayoutProps {
    children?: React.ReactNode
}

export default function PaymentLayout({ children }: PaymentLayoutProps) {
    return (
        <>
            {children || <Outlet />}
            <WalletFooter />
        </>
    )
}
