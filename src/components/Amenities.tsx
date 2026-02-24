'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { useCarousel } from '../hooks/useCarousel'
import { Wifi, Wind, Coffee, Car, Tv, Snowflake } from 'lucide-react'
import { websiteData } from '../data/website-data'
import CarouselNavigation from './ui/CarouselNavigation'
import { cn } from '../utils/cn'

const iconMap: Record<string, any> = {
    wifi: Wifi,
    wind: Wind,
    coffee: Coffee,
    car: Car,
    tv: Tv,
    snowflake: Snowflake
}

interface AmenitiesProps {
    limit?: number
}

export default function Amenities({ limit }: AmenitiesProps) {
    const { amenities } = websiteData
    const { emblaRef, scrollPrev, scrollNext } = useCarousel()

    return (
        <section id="amenities" className={cn("transition-colors duration-300", limit ? "py-20 bg-slate-50 dark:bg-slate-900" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {limit && (
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div className="text-center md:text-left w-full md:w-auto">
                            <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                Property Features
                            </span>
                            <h2 className="font-display text-page-title text-navy dark:text-white mb-4">Amenities</h2>
                            <p className="font-sans text-subheading text-charcoal dark:text-gray-300 max-w-2xl">
                                Enjoy these complimentary comforts during your stay.
                            </p>
                        </div>
                        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                    </div>
                )}

                {limit ? (
                    /* Carousel View */
                    <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                        <div className="flex touch-pan-y" style={{ gap: '1.5rem' }}>
                            {amenities.map((amenity) => {
                                const Icon = iconMap[amenity.icon] || Wifi
                                return (
                                    <div key={amenity.id} className="flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_15%] min-w-0">
                                        <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all border border-transparent hover:border-gray-100 dark:border-slate-700 h-full">
                                            <div className="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-primary dark:text-blue-400 shrink-0">
                                                <Icon size={24} />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{amenity.name}</h3>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{amenity.category}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    /* Grid View */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {amenities.map((amenity) => {
                            const Icon = iconMap[amenity.icon] || Wifi
                            return (
                                <div key={amenity.id} className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all border border-transparent hover:border-gray-100 dark:border-slate-700">
                                    <div className="w-12 h-12 bg-primary/10 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-primary dark:text-blue-400">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{amenity.name}</h3>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{amenity.category}</span>
                                </div>
                            )
                        })}
                    </div>
                )}

                {limit && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/amenities"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            View All Amenities
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
