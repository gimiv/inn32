import { ReactNode } from 'react'

interface PageHeaderProps {
    title: string
    subtitle?: string
    description?: string
    backgroundImage?: string
    children?: ReactNode
}

export default function PageHeader({ title, subtitle, description, backgroundImage, children }: PageHeaderProps) {
    return (
        <div className="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 overflow-hidden bg-slate-900 border-b border-gray-100 dark:border-slate-800">
            {/* Background Layer */}
            {backgroundImage ? (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90" />
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800" />
            )}

            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
                <div className="max-w-3xl mx-auto">
                    {subtitle && (
                        <span className="font-sans text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/80 mb-4 block">
                            {subtitle}
                        </span>
                    )}
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight drop-shadow-md">
                        {title}
                    </h1>
                    {description && (
                        <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed font-light drop-shadow-sm max-w-2xl mx-auto">
                            {description}
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
