'use client'

import Link from 'next/link'
import { cn } from '../utils/cn'
import StandardCard from './ui/StandardCard'
import ContentSection from './ui/ContentSection'
import { Offer } from '../types/website'

interface OffersProps {
    limit?: number
    offers: Offer[]
}

export default function Offers({ limit, offers }: OffersProps) {
    const isSlider = limit !== undefined;
    const displayOffers = limit ? offers.slice(0, limit) : offers;
    const isCarousel = isSlider && displayOffers.length > 1;
    const isSingle = isSlider && displayOffers.length === 1;

    if (!offers || offers.length === 0) return null;

    const offerItems = displayOffers.map(offer => (
        <OfferCard key={offer.id} offer={offer} headingLevel={isSlider ? 3 : 2} />
    ));

    return (
        <ContentSection
            id="offers"
            className={cn(
                "transition-colors duration-300",
                isSlider
                    ? cn(
                        "bg-slate-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800",
                        isSingle ? "py-12 md:py-16" : "py-20"
                    )
                    : "bg-transparent"
            )}
            isCarousel={isCarousel}
            items={offerItems}
            gridClassName={isSingle ? "grid max-w-xl mx-auto" : undefined}
            header={isSlider ? {
                label: "Special Packages",
                title: "Current Offers",
                subtitle: "Enhance your stay with our curated packages and seasonal discounts."
            } : undefined}
            viewAllLink={
                limit && offers.length > limit
                    ? { href: "/offers", text: "View All Offers" }
                    : undefined
            }
        />
    )
}

function OfferCard({ offer, headingLevel }: { offer: Offer; headingLevel: 2 | 3 }) {
    return (
        <StandardCard
            image={offer.image!}
            title={offer.title}
            headingLevel={headingLevel}
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
                            className="text-blue-700 hover:text-navy dark:text-blue-300 dark:hover:text-white font-medium transition-colors flex items-center"
                        >
                            Book Offer <span className="ml-1">→</span>
                        </button>
                    ) : (
                        <Link href={`/offers#${offer.id}`} className="text-blue-700 hover:text-navy dark:text-blue-300 dark:hover:text-white font-medium transition-colors flex items-center">
                            View Details <span className="ml-1">→</span>
                        </Link>
                    )}
                </div>
            }
        />
    )
}
