import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Calendar, MapPin, Star } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'

interface EventsProps {
    limit?: number
}

export default function Events({ limit }: EventsProps) {
    const { events } = websiteData
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // If limit is provided, we use the carousel view
    // If no limit (full page), we use a grid view
    const isSlider = !!limit
    const displayEvents = limit ? events.slice(0, limit) : events

    return (
        <section id="events" className={cn("py-20 transition-colors duration-300", isSlider ? "bg-white dark:bg-slate-900" : "")}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                            {isSlider ? "Upcoming Events" : "Events Calendar"}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                            {isSlider
                                ? "Discover what's happening around North Woodstock and the White Mountains."
                                : "Join us for local festivals, seasonal celebrations, and community gatherings."}
                        </p>
                    </div>

                    {/* Desktop Arrows for Slider */}
                    {isSlider && (
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={scrollPrev}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 text-slate-600" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 text-slate-600" />
                            </button>
                        </div>
                    )}
                </div>

                {isSlider ? (
                    // Carousel Layout
                    <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                        <div className="flex gap-6">
                            {displayEvents.map((event) => (
                                <div key={event.id} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Grid Layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}

                {isSlider && (
                    <div className="mt-12 text-center">
                        <Link
                            to="/events"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            View All Events
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

function EventCard({ event }: { event: typeof websiteData.events[0] }) {
    return (
        <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[3/2] overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Featured Badge */}
                {event.isFeatured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        FEATURED
                    </div>
                )}

                {/* Custom Label (e.g. Must See) */}
                {!event.isFeatured && event.customLabel && (
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {event.customLabel}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-3 text-sm">
                        {event.description}
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-2 text-primary dark:text-blue-400" />
                        {event.date}
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                        {event.location}
                    </div>
                </div>
            </div>
        </div>
    )
}
