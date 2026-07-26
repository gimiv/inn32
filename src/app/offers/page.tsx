import { Metadata } from 'next'
import Offers from '../../components/Offers'
import { websiteData } from '../../data/website-data'
import { filterActiveOffers, nowIso } from '../../utils/dates'
import PageLayout from '../../components/ui/PageLayout'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Special Offers & Packages'
const DESCRIPTION = 'Make the most of your White Mountains getaway with exclusive deals at Inn 32 in North Woodstock, NH. Whether you are planning a winter weekday escape, an extended spring retreat, or a summer family adventure, our seasonal packages help you save while enjoying everything the region has to offer.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/offers') },
    openGraph: {
        url: canonicalUrl('/offers'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Special offers at Inn 32 in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

export default function OffersPage() {
    const activeOffers = filterActiveOffers(websiteData.offers, nowIso())

    return (
        <PageLayout
            title="Special Offers"
            subtitle="Enhance your stay with our curated packages and seasonal discounts."
        >
            {activeOffers.length > 0 ? (
                <Offers offers={activeOffers} />
            ) : (
                <p className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-600 dark:text-gray-300 font-sans">
                    We don&apos;t have any active offers to show right now. Check back soon, or contact us at{' '}
                    <a href={`mailto:${websiteData.property.contact.email}`} className="text-mountain-blue hover:underline">
                        {websiteData.property.contact.email}
                    </a>{' '}
                    for current rates and availability.
                </p>
            )}
        </PageLayout>
    )
}
