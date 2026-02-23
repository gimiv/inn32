import { ReactNode } from 'react'

interface PageHeaderProps {
    title: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    children?: ReactNode
}

export default function PageHeader({ title, subtitle, description, backgroundImage, children }: PageHeaderProps) {
    const isImageBg = !!backgroundImage;

    return (
        <div className={`relative py-12 md:py-16 overflow-hidden border-b transition-colors duration-300 ${isImageBg ? 'bg-slate-900 border-transparent' : 'bg-cream dark:bg-slate-900 border-gray-100 dark:border-slate-800'}`}>
            {/* Background Layer */}
            {isImageBg && (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </>
            )}

            {/* Content Container */}
            <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 ${isImageBg ? 'text-white' : 'text-navy dark:text-white'}`}>
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight drop-shadow-sm">
                        {title}
                    </h1>
                    {(subtitle || description) && (
                        <p className={`font-sans text-lg md:text-xl leading-relaxed font-light drop-shadow-sm max-w-2xl mx-auto ${isImageBg ? 'text-white/90' : 'text-charcoal dark:text-gray-300'}`}>
                            {subtitle || description}
                        </p>
                    )}
                    {children && (
                        <div className="mt-8 flex justify-center">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
