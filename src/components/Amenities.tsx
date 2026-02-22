import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { Wifi, Wind, Coffee, Car, Tv, Snowflake, ChevronLeft, ChevronRight } from 'lucide-react'
import { websiteData } from '../data/website-data'

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
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <section id="amenities" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Amenities</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            Enjoy these complimentary comforts during your stay.
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
                            to="/amenities"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            View All Amenities
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
