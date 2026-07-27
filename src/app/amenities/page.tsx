import { Metadata } from 'next'
import Amenities from '../../components/Amenities'
import ExperienceHighlights from '../../components/ExperienceHighlights'
import { websiteData } from '../../data/website-data'
import { experienceHighlights } from '../../data/guest-content'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Hotel Amenities & Services'
const DESCRIPTION = 'Every guest at Inn 32 in North Woodstock, NH enjoys complimentary amenities designed to make your White Mountains getaway effortless. From free on-site parking to high-speed Wi-Fi and in-room coffee, we have everything you need to relax after a day of hiking Franconia Ridge or skiing Loon Mountain.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/amenities') },
    openGraph: {
        url: canonicalUrl('/amenities'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Inn 32 boutique hotel in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

import PageLayout from '../../components/ui/PageLayout'

export default function AmenitiesPage() {
    return (
        <PageLayout
            title="Hotel Amenities & Services"
            subtitle="Simple comforts for an easy stay — free Wi-Fi, free on-site parking, individual climate control, and in-room coffee."
        >
            <ExperienceHighlights
                highlights={experienceHighlights}
                header={{
                    label: 'The Experience',
                    title: 'What a Stay Here Feels Like',
                }}
            />
            <Amenities amenities={websiteData.amenities} />
        </PageLayout>
    )
}
