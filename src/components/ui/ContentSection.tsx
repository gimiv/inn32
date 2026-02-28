import React, { ReactNode } from 'react'
import SectionHeader from './SectionHeader'
import CarouselWrapper from './CarouselWrapper'
import { LinkButton } from './Button'
import { cn } from '../../utils/cn'

interface ContentSectionProps {
    id: string
    isCarousel: boolean
    items: ReactNode[]
    header?: {
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
    carouselItemClassName = "flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0",
    gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr",
    className,
    containerClassName = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
}: ContentSectionProps) {
    if (!items || items.length === 0) return null

    return (
        <section id={id} className={className}>
            <div className={containerClassName}>
                {isCarousel ? (
                    <CarouselWrapper
                        items={items}
                        header={header!} // If isCarousel is true, header is provided
                        carouselItemClassName={carouselItemClassName}
                    />
                ) : (
                    <>
                        {header && (
                            <SectionHeader
                                label={header.label}
                                title={header.title}
                                subtitle={header.subtitle}
                                align="center"
                            />
                        )}
                        <div className={gridClassName}>
                            {items.map((item, index) => {
                                const itemKey = React.isValidElement(item) && item.key ? item.key : index
                                return (
                                    <div key={itemKey} className="h-full block">
                                        {item}
                                    </div>
                                )
                            })}
                        </div>
                    </>
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
