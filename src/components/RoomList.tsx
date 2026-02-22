import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Users, Bed, ArrowRight, Expand } from 'lucide-react'
import { websiteData } from '../data/website-data'
import LightboxGallery from './LightboxGallery'

interface RoomListProps {
    limit?: number
}

export default function RoomList({ limit }: RoomListProps) {
    const { roomTypes } = websiteData
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })
    const [selectedRoomImages, setSelectedRoomImages] = useState<string[]>([])
    const [isGalleryOpen, setIsGalleryOpen] = useState(false)

    const openGallery = (images: string[]) => {
        setSelectedRoomImages(images)
        setIsGalleryOpen(true)
    }

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // Render individual room card content to reuse in both views
    const renderRoomCard = (room: typeof roomTypes[0]) => (
        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
            <div
                className="relative h-64 overflow-hidden flex-shrink-0 cursor-pointer group/image"
                onClick={() => openGallery(room.images)}
            >
                <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gallery Indicator with Count */}
                {room.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-opacity">
                        <Expand className="w-3 h-3" />
                        View Photos ({room.images.length})
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{room.name}</h3>
                    <div className="text-right">
                        <span className="block text-2xl font-bold text-primary dark:text-blue-400">${room.basePrice}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">/night</span>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow min-h-[40px]">{room.shortDescription}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6 mt-auto">
                    <div className="flex items-center">
                        <Users size={16} className="mr-1" />
                        <span>Up to {room.maxOccupancy}</span>
                    </div>
                    <div className="flex items-center">
                        <Bed size={16} className="mr-1" />
                        <span>{room.bedType}</span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-widget'))}
                        className="flex items-center justify-center w-full py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors font-medium"
                    >
                        Check Availability
                        <ArrowRight size={16} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <section id="rooms" className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Our Rooms</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            Discover comfort and style in our newly renovated accommodations.
                        </p>
                    </div>

                    {limit && (
                        <div className="hidden md:flex space-x-2 mt-4 md:mt-0">
                            <button onClick={scrollPrev} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={scrollNext} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {limit ? (
                    /* Carousel View */
                    <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                        <div className="flex touch-pan-y" style={{ gap: '2rem' }}>
                            {roomTypes.map((room) => (
                                <div key={room.id} className="flex-[0_0_85%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0">
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
                            to="/rooms"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => window.scrollTo(0, 0)}
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
