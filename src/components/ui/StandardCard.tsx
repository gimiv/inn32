import { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '../../utils/cn'

interface StandardCardProps {
    image: string
    imageAlt?: string
    title: string
    subtitle?: ReactNode
    description: string
    metadata?: ReactNode
    actions?: ReactNode
    imageOverlay?: ReactNode
    onImageClick?: () => void
    compactOnMobile?: boolean
    headingLevel?: 2 | 3
}

export default function StandardCard({
    image,
    imageAlt,
    title,
    subtitle,
    description,
    metadata,
    actions,
    imageOverlay,
    onImageClick,
    compactOnMobile = false,
    headingLevel = 3
}: StandardCardProps) {
    const HeadingTag = `h${headingLevel}` as 'h2' | 'h3'

    return (
        <div className="group bg-white dark:bg-slate-800 rounded-brand-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-700 h-full flex flex-col transform hover:-translate-y-1">
            {/* Image Block */}
            <div
                className={cn("relative overflow-hidden group/image bg-gray-100 dark:bg-slate-800", compactOnMobile ? "h-48 md:h-64" : "h-64")}
                onClick={onImageClick}
                style={{ cursor: onImageClick ? 'pointer' : 'default' }}
            >
                {/* CSS-only Skeleton Loader */}
                <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 animate-pulse z-0" />

                <Image
                    src={image}
                    alt={imageAlt || title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/image:scale-105 z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 z-20" />
                {imageOverlay}
            </div>

            {/* Content Block */}
            <div className={cn("flex flex-col flex-grow", compactOnMobile ? "p-5 md:p-8" : "p-6 md:p-8")}>
                {/* Header */}
                <div className={cn("flex justify-between items-start", compactOnMobile ? "mb-3 md:mb-4" : "mb-4")}>
                    <div>
                        <HeadingTag className={cn("font-display font-bold text-navy dark:text-white mb-1 group-hover:text-mountain-blue transition-colors", compactOnMobile ? "text-xl md:text-2xl" : "text-2xl")}>
                            {title}
                        </HeadingTag>
                    </div>
                    {subtitle && (
                        <div className="flex-shrink-0 ml-4">
                            {subtitle}
                        </div>
                    )}
                </div>

                {/* Body */}
                <p className={cn("text-gray-600 dark:text-gray-400 font-sans leading-relaxed", compactOnMobile ? "mb-4 line-clamp-2 md:line-clamp-3 md:mb-6" : "mb-6 line-clamp-3")}>
                    {description}
                </p>

                {/* Footer / Actions */}
                <div className={cn("mt-auto border-t border-gray-100 dark:border-slate-700", compactOnMobile ? "pt-4 md:pt-6" : "pt-6")}>
                    {metadata && (
                        <div className={cn("flex flex-wrap gap-4 text-sm font-sans font-medium text-charcoal dark:text-gray-300", compactOnMobile ? "mb-4 md:mb-6" : "mb-6")}>
                            {metadata}
                        </div>
                    )}
                    {actions && (
                        <div className="w-full">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
