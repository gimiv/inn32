'use client'

import { useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCarousel } from '../hooks/useCarousel'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'
import StandardCard from './ui/StandardCard'
import CarouselNavigation from './ui/CarouselNavigation'

interface OffersProps {
    limit?: number
}

export default function Offers({ limit }: OffersProps) {
    const { offers } = websiteData

    const { emblaRef, scrollPrev, scrollNext } = useCarousel()

    const isSlider = limit !== undefined;
    const displayOffers = limit ? offers.slice(0, limit) : offers;

    if (!offers || offers.length === 0) return null;

    return (
        <section id="offers" className={cn("transition-colors duration-300", isSlider ? "py-20 bg-slate-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isSlider && (
                    <div className="transition-spacing duration-300 mb-12">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                            <div className="text-center md:text-left">
                                <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                    Special Packages
                                </span>
                                <h2 className="font-display text-page-title text-navy dark:text-white mb-4">Current Offers</h2>
                                <p className="font-sans text-subheading text-charcoal dark:text-gray-300 max-w-2xl">
                                    Enhance your stay with our curated packages and seasonal discounts.
                                </p>
                            </div>
                            <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                        </div>
                    </div>
                )}

                {limit ? (
                    /* Carousel View */
                    <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                        <div className="flex touch-pan-y" style={{ gap: '1.5rem' }}>
                            {displayOffers.map((offer) => (
                                <div key={offer.id} className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 flex">
                                    <div className="w-full">
                                        <StandardCard
                                            image={offer.image!}
                                            title={offer.title}
                                            description={offer.description}
                                            actions={
                                                <div className="flex items-center justify-between w-full">
                                                    {offer.promoCode ? (
                                                        <span className="text-xs font-sans font-bold text-navy dark:text-white bg-cream dark:bg-slate-700 px-3 py-1.5 rounded-md uppercase tracking-wide">
                                                            Code: {offer.promoCode}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs font-sans font-medium text-gray-400 uppercase tracking-wide">
                                                            Special Package
                                                        </span>
                                                    )}
                                                    {offer.promoCode ? (
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                window.dispatchEvent(new CustomEvent('open-booking-widget', { detail: { promoCode: offer.promoCode } }));
                                                            }}
                                                            className="text-mountain-blue hover:text-navy dark:hover:text-white font-medium transition-colors flex items-center"
                                                        >
                                                            Book Offer <span className="ml-1">→</span>
                                                        </button>
                                                    ) : (
                                                        <Link href={`/offers#${offer.id}`} className="text-mountain-blue hover:text-navy dark:hover:text-white font-medium transition-colors flex items-center">
                                                            View Details <span className="ml-1">→</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                        {displayOffers.map((offer) => (
                            <div key={offer.id} className="h-full block">
                                <StandardCard
                                    image={offer.image!}
                                    title={offer.title}
                                    description={offer.description}
                                    actions={
                                        <div className="flex items-center justify-between w-full">
                                            {offer.promoCode ? (
                                                <span className="text-xs font-sans font-bold text-navy dark:text-white bg-cream dark:bg-slate-700 px-3 py-1.5 rounded-md uppercase tracking-wide">
                                                    Code: {offer.promoCode}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-sans font-medium text-gray-400 uppercase tracking-wide">
                                                    Special Package
                                                </span>
                                            )}
                                            {offer.promoCode ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.dispatchEvent(new CustomEvent('open-booking-widget', { detail: { promoCode: offer.promoCode } }));
                                                    }}
                                                    className="text-mountain-blue hover:text-navy dark:hover:text-white font-medium transition-colors flex items-center"
                                                >
                                                    Book Offer <span className="ml-1">→</span>
                                                </button>
                                            ) : (
                                                <Link href={`/offers#${offer.id}`} className="text-mountain-blue hover:text-navy dark:hover:text-white font-medium transition-colors flex items-center">
                                                    View Details <span className="ml-1">→</span>
                                                </Link>
                                            )}
                                        </div>
                                    }
                                />
                            </div>
                        ))}
                    </div>
                )}

                {limit && offers.length > limit && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/offers"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            View All Offers
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
