'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Star } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'
import CarouselNavigation from './ui/CarouselNavigation'

interface ReviewsProps {
    limit?: number
}

export default function Reviews({ limit }: ReviewsProps) {
    const { reviews } = websiteData
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const isSlider = !!limit
    const displayReviews = limit ? reviews.slice(0, limit) : reviews

    if (reviews.length === 0) return null;

    return (
        <section id="reviews" className={cn("transition-colors duration-300", isSlider ? "py-20 bg-white dark:bg-slate-900" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isSlider && (
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                        <div className="text-center md:text-left w-full md:w-auto">
                            <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                Guest Experiences
                            </span>
                            <h2 className="font-display text-page-title text-navy dark:text-white mb-4">
                                What Our Guests Say
                            </h2>
                            <p className="font-sans text-subheading text-charcoal dark:text-gray-300 max-w-2xl">
                                Real stories from recent travelers who made Inn 32 their White Mountains basecamp.
                            </p>
                        </div>
                        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                    </div>
                )}

                {isSlider ? (
                    // Carousel Layout
                    <div className="overflow-hidden p-4 -mx-4" ref={emblaRef}>
                        <div className="flex gap-6">
                            {displayReviews.map((review) => (
                                <div key={review.id} className="flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0">
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Grid Layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

function ReviewCard({ review }: { review: typeof websiteData.reviews[0] }) {
    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-brand-lg shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col group hover:shadow-md transition-shadow">
            {/* Star Rating */}
            <div className="flex items-center mb-6">
                {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-warm-gold fill-current" />
                ))}
            </div>

            {/* Review Text */}
            <blockquote className="flex-grow mb-8">
                <p className="font-serif text-lg leading-relaxed text-charcoal dark:text-gray-200 italic">
                    "{review.text}"
                </p>
            </blockquote>

            {/* Author Block */}
            <div className="mt-auto border-t border-gray-100 dark:border-slate-700 pt-6">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="font-sans font-bold text-navy dark:text-white text-base">
                            {review.author}
                        </p>
                        <p className="text-sm text-mountain-blue font-medium mt-1">
                            {review.date}
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            {review.source}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
