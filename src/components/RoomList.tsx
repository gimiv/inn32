'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useCarousel } from '../hooks/useCarousel'
import { Users, Bed, ArrowRight, Expand } from 'lucide-react'
import { websiteData } from '../data/website-data'
import StandardCard from './ui/StandardCard'
import CarouselNavigation from './ui/CarouselNavigation'
import LightboxGallery from './LightboxGallery'
import { cn } from '../utils/cn'

interface RoomListProps {
    limit?: number
}

export default function RoomList({ limit }: RoomListProps) {
    const { roomTypes } = websiteData
    const { emblaRef, scrollPrev, scrollNext } = useCarousel()
    const [selectedRoomImages, setSelectedRoomImages] = useState<string[]>([])
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    const openGallery = (images: string[]) => {
        setSelectedRoomImages(images)
        setIsGalleryOpen(true)
    }

    // Render individual room card content to reuse in both views
    const renderRoomCard = (room: typeof roomTypes[0]) => (
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
            onImageClick={() => openGallery(room.images)}
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
    )

    return (
        <section id="rooms" className={cn("transition-colors duration-300", limit ? "py-20 bg-cream dark:bg-slate-900" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {limit && (
                    <div className={cn("flex flex-col md:flex-row justify-between items-end", limit ? "mb-12" : "mb-6")}>
                        <div className="text-center md:text-left w-full md:w-auto">
                            <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                Stay With Us
                            </span>
                            <h2 className="font-display text-page-title text-navy dark:text-white mb-4">Our Rooms</h2>
                            <p className="font-sans text-subheading text-charcoal dark:text-gray-300 max-w-2xl">
                                Discover comfort and style in our newly renovated accommodations.
                            </p>
                        </div>

                        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                    </div>
                )}

                {limit ? (
                    /* Carousel View */
                    <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                        <div className="flex touch-pan-y" style={{ gap: '2rem' }}>
                            {roomTypes.map((room) => (
                                <div key={room.id} className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0">
                                    {renderRoomCard(room)}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roomTypes.map((room) => (
                            <div key={room.id}>
                                {renderRoomCard(room)}
                            </div>
                        ))}
                    </div>
                )}

                {limit && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/rooms"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-sans font-medium rounded-full text-white bg-navy hover:bg-mountain-blue transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            View All Rooms
                        </Link>
                    </div>
                )}
            </div>

            {/* Lightbox Gallery */}
            <LightboxGallery
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={selectedRoomImages}
            />
        </section>
    )
}
