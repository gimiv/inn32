import Image from 'next/image'
import Link from 'next/link'
import { linkButtonStyles } from './ui/Button'
import { cn } from '../utils/cn'

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

export default function GroupBuyoutCta() {
    return (
        <section aria-labelledby="group-buyout-heading" className="relative overflow-hidden">
            <Image
                src="/gallery/hotel.webp"
                alt=""
                fill
                aria-hidden="true"
                className="object-cover"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-navy/85" aria-hidden="true" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16 text-center">
                <span className="font-sans text-sm font-semibold text-blue-200 uppercase tracking-wider mb-2 block">
                    Groups & Buyouts
                </span>
                <h2 id="group-buyout-heading" className="font-display text-page-title text-white mb-4">
                    Take Over the Whole Inn
                </h2>
                <p className="font-sans text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Book a full-property buyout of all 24 rooms for weddings, family reunions,
                    retreats, and friend-group getaways — with the village and mountains right outside.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/groups"
                        className={cn(linkButtonStyles({ variant: 'secondary' }), FOCUS_RING)}
                    >
                        Explore Group Stays
                    </Link>
                    <Link
                        href="/groups#group-inquiry"
                        className={cn(
                            'inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-full font-sans font-medium hover:bg-white hover:text-navy transition-colors',
                            FOCUS_RING
                        )}
                    >
                        Send an Inquiry
                    </Link>
                </div>
            </div>
        </section>
    )
}
