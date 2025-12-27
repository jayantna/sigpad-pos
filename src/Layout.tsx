import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from './components/Header'

export default function Layout() {
    return (
        <main className="relative flex items-center justify-center min-h-screen w-full overflow-hidden">
            <Header />
            <Outlet />
            <Toaster position="top-center" richColors />
        </main>
    )
}
