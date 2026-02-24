'use client'

import { useState } from 'react'
import { Users, Bed, ArrowRight, Expand } from 'lucide-react'
import StandardCard from './StandardCard'
import LightboxGallery from '../LightboxGallery'

interface RoomCardProps {
    room: {
        id: string
        name: string
        basePrice: number
        shortDescription: string
        images: string[]
        maxOccupancy: number
        bedType: string
    }
}

export default function RoomCard({ room }: RoomCardProps) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    return (
        <>
            <StandardCard
                image={room.images[0]}
                imageAlt={room.name}
                title={room.name}
                subtitle={
                    <div className="text-right">
                        <span className="block font-display text-2xl font-bold text-navy dark:text-white group-hover:text-mountain-blue transition-colors">
                            ${room.basePrice}
                        </span>
                        <span className="text-xs font-sans text-gray-500 dark:text-gray-400 group-hover:text-mountain-blue/80 transition-colors">
                            /night
                        </span>
                    </div>
                }
                description={room.shortDescription}
                onImageClick={() => setIsGalleryOpen(true)}
                imageOverlay={
                    room.images.length > 1 ? (
                        <div className="absolute bottom-3 right-3 bg-navy/80 text-white text-xs font-bold px-2 py-1 rounded-brand-sm flex items-center gap-1 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-opacity">
                            <Expand className="w-3 h-3" />
                            Photos ({room.images.length})
                        </div>
                    ) : undefined
                }
                metadata={
                    <>
                        <div className="flex items-center">
                            <Users size={16} className="mr-1" />
                            <span>Up to {room.maxOccupancy}</span>
                        </div>
                        <div className="flex items-center">
                            <Bed size={16} className="mr-1" />
                            <span>{room.bedType}</span>
                        </div>
                    </>
                }
                actions={
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-widget', { detail: { roomId: room.id } }))}
                        className="flex items-center justify-center w-full py-3 bg-navy text-white rounded-brand-md hover:bg-mountain-blue transition-colors font-sans font-medium shadow-brand-sm hover:shadow-brand-md"
                    >
                        Check Availability
                        <ArrowRight size={16} className="ml-2" />
                    </button>
                }
            />

            <LightboxGallery
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={room.images}
            />
        </>
    )
}
