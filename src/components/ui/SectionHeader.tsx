import { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface SectionHeaderProps {
    label: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    className?: string
    children?: ReactNode
}

export default function SectionHeader({
    label,
    title,
    subtitle,
    align = 'center',
    className,
    children
}: SectionHeaderProps) {
    return (
        <div className={cn(
            "flex flex-col md:flex-row justify-between items-end gap-6 mb-12",
            align === 'center' ? "text-center mx-auto block" : "text-center md:text-left",
            className
        )}>
            <div className={cn(
                "w-full md:w-auto",
                align === 'center' ? "max-w-2xl mx-auto" : ""
            )}>
                <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                    {label}
                </span>
                <h2 className="font-display text-page-title text-navy dark:text-white mb-4">
                    {title}
                </h2>
                {subtitle && (
                    <p className="font-sans text-subheading text-charcoal dark:text-gray-300 max-w-2xl">
                        {subtitle}
                    </p>
                )}
            </div>
            {children && (
                <div className={align === 'center' ? "mx-auto w-full md:w-auto" : "w-full md:w-auto flex justify-center md:justify-end"}>
                    {children}
                </div>
            )}
        </div>
    )
}
