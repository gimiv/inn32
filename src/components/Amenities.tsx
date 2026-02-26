import { Wifi, Wind, Coffee, Car, Tv, Snowflake } from 'lucide-react'
import { cn } from '../utils/cn'
import ContentSection from './ui/ContentSection'
import { Amenity } from '../types/website'

import React from 'react'

const iconMap: Record<string, React.ElementType> = {
    wifi: Wifi,
    wind: Wind,
    coffee: Coffee,
    car: Car,
    tv: Tv,
    snowflake: Snowflake,
}

interface AmenitiesProps {
    limit?: number
    amenities: Amenity[]
}

export default function Amenities({ limit, amenities }: AmenitiesProps) {
    const displayAmenities = limit ? amenities.slice(0, limit) : amenities;

    if (!amenities || amenities.length === 0) return null;

    const amenityItems = displayAmenities.map((amenity, index) => {
        const Icon = iconMap[amenity.icon] || Wifi
        return (
            <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all h-full w-full"
            >
                <div className="w-12 h-12 bg-cream dark:bg-slate-700 text-mountain-blue dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                    <Icon size={24} />
                </div>
                <h3 className="font-display text-xl text-navy dark:text-white mb-3 tracking-wide">{amenity.name}</h3>
                <p className="font-sans text-charcoal dark:text-gray-300 leading-relaxed text-sm">
                    {amenity.description}
                </p>
            </div>
        )
    })

    return (
        <ContentSection
            id="amenities"
            className={cn("transition-colors duration-300", limit ? "py-20 bg-slate-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800" : "pb-20 pt-4 md:pt-8 bg-transparent")}
            isCarousel={!!limit}
            items={amenityItems}
            header={limit ? {
                label: "Property Features",
                title: "Amenities",
                subtitle: "Enjoy these complimentary comforts during your stay."
            } : undefined}
            viewAllLink={limit && amenities.length > limit ? { href: "/amenities", text: "View All Amenities" } : undefined}
            carouselItemClassName="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0 flex"
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
        />
    )
}
