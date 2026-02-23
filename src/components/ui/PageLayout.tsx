import { ReactNode } from 'react'
import PageHeader from './PageHeader'

interface PageLayoutProps {
    title: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    children: ReactNode
}

export default function PageLayout({ title, subtitle, description, backgroundImage, children }: PageLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col pt-[80px]">
            <PageHeader
                title={title}
                subtitle={subtitle}
                description={description}
                backgroundImage={backgroundImage}
            />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    )
}
