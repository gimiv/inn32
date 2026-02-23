'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Calendar, MapPin, Star } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'
import StandardCard from './ui/StandardCard'
import CarouselNavigation from './ui/CarouselNavigation'

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
        <section id="events" className={cn("transition-colors duration-300", isSlider ? "py-20 bg-slate-50 dark:bg-slate-900" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isSlider && (
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                Local Happenings
                            </span>
                            <h2 className="font-display text-page-title text-navy dark:text-white mb-4">
                                {isSlider ? "Upcoming Events" : "Events Calendar"}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                                {isSlider
                                    ? "Discover what's happening around North Woodstock and the White Mountains."
                                    : "Join us for local festivals, seasonal celebrations, and community gatherings."}
                            </p>
                        </div>

                        {/* Desktop Arrows for Slider */}
                        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                    </div>
                )}

                {isSlider ? (
                    // Carousel Layout
                    <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                        <div className="flex gap-6">
                            {displayEvents.map((event) => (
                                <div key={event.id} className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
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
                            href="/events"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
    const overlay = (
        <>
            {event.isFeatured && (
                <div className="absolute top-4 left-4 bg-warm-gold text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 z-10">
                    <Star className="w-3 h-3 fill-current" />
                    FEATURED
                </div>
            )}
            {!event.isFeatured && event.customLabel && (
                <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {event.customLabel}
                </div>
            )}
        </>
    )

    const metadataLayout = (
        <div className="flex flex-col gap-2 w-full font-sans">
            <div className="flex items-center text-charcoal dark:text-gray-300 text-sm font-medium">
                <Calendar className="w-4 h-4 mr-2 text-mountain-blue" />
                {event.date}
            </div>
            <div className="flex items-center text-gray-brand dark:text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
            </div>
        </div>
    )

    return (
        <StandardCard
            image={event.image}
            title={event.title}
            description={event.description || ""}
            imageOverlay={overlay}
            actions={metadataLayout}
        />
    )
}
