'use client'

import { ReactNode, useMemo } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import SectionHeader from './SectionHeader'
import CarouselNavigation from './CarouselNavigation'
import { LinkButton } from './Button'
import { cn } from '../../utils/cn'

interface ContentSectionProps {
    id: string
    isCarousel: boolean
    items: ReactNode[]
    header: {
        label: string
        title: string
        subtitle?: string
    }
    viewAllLink?: {
        href: string
        text: string
        variant?: 'primary' | 'navy' | 'outline' | 'secondary'
    }
    carouselItemClassName?: string
    gridClassName?: string
    className?: string
    containerClassName?: string
}

export default function ContentSection({
    id,
    isCarousel,
    items,
    header,
    viewAllLink,
    carouselItemClassName = "flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 flex",
    gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr",
    className,
    containerClassName = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
}: ContentSectionProps) {
    const { emblaRef, scrollPrev, scrollNext, selectedIndex, scrollSnaps, scrollTo } = useCarousel({ dragFree: true })

    if (!items || items.length === 0) return null

    return (
        <section id={id} className={className}>
            <div className={containerClassName}>
                {isCarousel && (
                    <SectionHeader
                        label={header.label}
                        title={header.title}
                        subtitle={header.subtitle}
                        align="left"
                    >
                        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                    </SectionHeader>
                )}

                {isCarousel ? (
                    <>
                        <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                            <div className="flex touch-pan-y" style={{ gap: '1.5rem' }}>
                                {items.map((item, index) => (
                                    <div key={index} className={carouselItemClassName}>
                                        <div className="w-full h-full block">
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Navigation Dots */}
                        <div className="flex md:hidden justify-center items-center gap-2 mt-6">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        index === selectedIndex
                                            ? "bg-mountain-blue w-6"
                                            : "bg-gray-300 dark:bg-slate-600"
                                    )}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={gridClassName}>
                        {items.map((item, index) => (
                            <div key={index} className="h-full block">
                                {item}
                            </div>
                        ))}
                    </div>
                )}

                {viewAllLink && (
                    <div className="mt-12 text-center">
                        <LinkButton href={viewAllLink.href} variant={viewAllLink.variant}>
                            {viewAllLink.text}
                        </LinkButton>
                    </div>
                )}
            </div>
        </section>
    )
}
