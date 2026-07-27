import type { Metadata } from 'next'
import PageLayout from '../../components/ui/PageLayout'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Website & Booking Terms'
const DESCRIPTION = 'Important information about using the Inn 32 website and making a reservation.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/terms') },
    openGraph: {
        url: canonicalUrl('/terms'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Inn 32 in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

export default function TermsPage() {
    return (
        <PageLayout
            title="Website & Booking Terms"
            subtitle="Important information about this website and reservations."
        >
            <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-charcoal dark:text-gray-200 sm:px-6 lg:px-8">
                <p className="text-sm text-gray-600 dark:text-gray-300">Last updated July 26, 2026.</p>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Reservations</h2>
                    <p>Reservations are processed through Mews. Rates, availability, taxes, fees, payment requirements, cancellation terms, and other booking-specific terms are the terms presented during checkout and in your confirmation. Review them before completing a reservation.</p>
                </section>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Website information</h2>
                    <p>We work to keep room descriptions, amenities, offers, events, and local information accurate. Operational details can change. The booking experience and your confirmation control if website copy differs from the terms of a specific reservation.</p>
                </section>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Third-party services</h2>
                    <p>This website links to services and destinations operated by others. Their availability, content, and practices are controlled by those providers.</p>
                </section>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Questions</h2>
                    <p>For questions about a reservation or the terms shown in Mews, contact Inn 32 at <a className="font-medium text-blue-700 underline underline-offset-4 dark:text-sky-300" href="mailto:info@inn32.com">info@inn32.com</a> or <a className="font-medium text-blue-700 underline underline-offset-4 dark:text-sky-300" href="tel:+16038254790">(603) 825-4790</a>.</p>
                </section>
            </div>
        </PageLayout>
    )
}
