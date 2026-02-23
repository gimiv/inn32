import { ReactNode } from 'react'

export default function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col pt-[80px]">
            <main className="flex-grow">
                {children}
            </main>
        </div>
    )
}
