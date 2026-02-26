import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '../../components/ui/PageLayout'

export const metadata: Metadata = {
    title: 'About Inn 32',
    description: 'The story behind Inn 32 — a classic roadside inn in North Woodstock, NH, fully reimagined in 2025. Modern comforts meet vintage White Mountains charm on Main Street.',
}

export default function AboutPage() {
    const aboutJsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "LodgingBusiness",
            "name": "Inn 32",
            "description": "A newly revitalized boutique hotel in North Woodstock, New Hampshire, fully reimagined in 2025 with modern comforts and vintage charm.",
            "foundingDate": "2025",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "180 Main Street",
                "addressLocality": "North Woodstock",
                "addressRegion": "NH",
                "postalCode": "03262",
                "addressCountry": "US"
            },
            "url": "https://inn32.com"
        }
    }

    return (
        <PageLayout
            title="About Inn 32"
            subtitle="Refined & Reopened — a boutique hotel reimagined for the modern traveler."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Our Story */}
                <section className="mb-16">
                    <h2 className="font-display text-3xl text-navy dark:text-white mb-6">Our Story</h2>
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-sans">
                        <p>
                            Inn 32 sits at 180 Main Street in North Woodstock, New Hampshire — a small mountain town
                            at the southern gateway to Franconia Notch. For decades, this address served travelers
                            passing through the White Mountains, offering a convenient stop along Interstate 93 at Exit 32.
                        </p>
                        <p>
                            In 2025, the property was completely reimagined. Every room was stripped to the studs and
                            rebuilt with fresh design, modern fixtures, and thoughtful touches — while honoring the
                            building&apos;s history as a classic New England roadside inn. The result is 24 rooms that
                            feel brand new but carry the warmth and character that makes this part of New Hampshire
                            so special.
                        </p>
                        <p>
                            We named it Inn 32 after our exit number on I-93, a nod to the way most travelers first
                            find North Woodstock. What they discover when they arrive is a walkable village with
                            craft breweries, local shops, and the Pemigewasset River flowing right through the center
                            of town.
                        </p>
                    </div>
                </section>

                {/* Image Break */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl mb-16">
                    <Image
                        src="/gallery/front-view.webp"
                        alt="Inn 32 exterior view on Main Street in North Woodstock, New Hampshire"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                {/* The Location */}
                <section className="mb-16">
                    <h2 className="font-display text-3xl text-navy dark:text-white mb-6">The Location</h2>
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-sans">
                        <p>
                            North Woodstock is a year-round destination in the heart of the White Mountains.
                            In summer, guests hike Franconia Ridge, kayak the Pemi, and explore Lost River Gorge.
                            Fall brings some of the most spectacular foliage in New England, especially along the
                            nearby Kancamagus Highway. Winter means skiing at Loon Mountain (5 minutes away) and
                            Cannon Mountain (10 minutes), plus the famous Ice Castles in Lincoln. Spring brings
                            Maple Month, wildflowers, and the quiet beauty of the mountains emerging from snow.
                        </p>
                        <p>
                            The Woodstock Inn Brewery is a short walk from our front door. The Common Man, Schilling
                            Beer Co., and dozens of local restaurants are all within a few minutes&apos; drive. Cascade
                            Park — a favorite swimming hole on the Pemigewasset River — is right in town.
                        </p>
                    </div>
                </section>

                {/* What We Offer */}
                <section className="mb-16">
                    <h2 className="font-display text-3xl text-navy dark:text-white mb-6">What We Offer</h2>
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-sans">
                        <p>
                            Our 24 rooms range from affordable Standard Singles starting at $79/night to spacious
                            multi-bedroom apartments that sleep up to 8 guests. Every room features free Wi-Fi,
                            smart TVs, individual climate control, and newly renovated bathrooms. Select apartments
                            include full kitchens, living areas, and private patios.
                        </p>
                        <p>
                            We keep things simple and comfortable — free parking right outside your door, in-room
                            coffee, and an outdoor fire pit area by the river. We are not trying to be a resort.
                            We are a well-priced, well-designed home base for people who came to enjoy the mountains.
                        </p>
                    </div>
                </section>

                {/* Image Break */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl mb-16">
                    <Image
                        src="/gallery/pool-firepit-night-.webp"
                        alt="Evening fire pit area at Inn 32 in North Woodstock, NH"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                {/* Groups & Events */}
                <section className="mb-16">
                    <h2 className="font-display text-3xl text-navy dark:text-white mb-6">Groups & Events</h2>
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-sans">
                        <p>
                            Inn 32 is available for full-property buyouts — all 24 rooms, exclusively yours.
                            We have hosted intimate weddings, family reunions, corporate retreats, and friend-group
                            getaways. The combination of private accommodations, walkable downtown, and year-round
                            mountain activities makes it a natural fit for groups looking for something more personal
                            than a large resort.
                        </p>
                        <p>
                            Interested in booking a group event? Reach out to our team at{' '}
                            <a href="mailto:info@inn32.com">info@inn32.com</a> or call{' '}
                            <a href="tel:+16037452416">(603) 745-2416</a>.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center pt-8 border-t border-gray-200 dark:border-slate-700">
                    <p className="text-lg text-gray-600 dark:text-gray-300 font-sans mb-6">
                        Ready to experience the White Mountains from Main Street?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/rooms"
                            className="inline-flex items-center justify-center px-8 py-3 bg-navy text-white rounded-full hover:bg-mountain-blue transition-colors font-sans font-medium shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            View Our Rooms
                        </Link>
                        <Link
                            href="/faq"
                            className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-navy dark:text-white border border-navy dark:border-white rounded-full hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy transition-colors font-sans font-medium"
                        >
                            Read Our FAQ
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
