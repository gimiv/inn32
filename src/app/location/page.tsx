import { Metadata } from 'next'
import { websiteData } from '../../data/website-data'
import PageLayout from '../../components/ui/PageLayout'
import Location from '../../components/Location'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Location & Directions'
const DESCRIPTION = 'Find Inn 32 at 180 Main Street, North Woodstock, NH 03262. Minutes from Franconia Notch, Loon Mountain, and the Kancamagus Highway. Call (603) 825-4790.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/location') },
    openGraph: {
        url: canonicalUrl('/location'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/river-entry.webp'), width: 1200, height: 630, alt: 'Inn 32 location on Main Street in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/river-entry.webp')],
    },
}

export default function LocationPage() {
    return (
        <PageLayout
            title="Location & Contact"
            subtitle="Conveniently located on Main Street in the heart of the White Mountains."
        >
            <Location property={websiteData.property} standalone={true} />
        </PageLayout>
    )
}
