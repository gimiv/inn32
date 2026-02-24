'use client'

import React, { ReactNode } from 'react'
import { useCarousel } from '../../hooks/useCarousel'
import SectionHeader from './SectionHeader'
import CarouselNavigation from './CarouselNavigation'
import { cn } from '../../utils/cn'

interface CarouselWrapperProps {
    items: ReactNode[]
    header: {
        label: string
        title: string
        subtitle?: string
    }
    carouselItemClassName: string
}

export default function CarouselWrapper({ items, header, carouselItemClassName }: CarouselWrapperProps) {
    const { emblaRef, scrollPrev, scrollNext, selectedIndex, scrollSnaps, scrollTo } = useCarousel({ dragFree: true })

    return (
        <>
            <SectionHeader
                label={header.label}
                title={header.title}
                subtitle={header.subtitle}
                align="left"
            >
                <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
            </SectionHeader>

            <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                <div className="flex touch-pan-y" style={{ gap: '1.5rem' }}>
                    {items.map((item, index) => {
                        const itemKey = React.isValidElement(item) && item.key ? item.key : index
                        return (
                            <div key={itemKey} className={carouselItemClassName}>
                                <div className="w-full h-full block">
                                    {item}
                                </div>
                            </div>
                        )
                    })}
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
    )
}
