import { Metadata } from 'next'
import ThingsToDo from '../../components/ThingsToDo'
import { websiteData } from '../../data/website-data'
import { Suspense } from 'react'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Things To Do'
const DESCRIPTION = 'Inn 32 sits at the crossroads of the White Mountains\' best attractions. Walk to craft breweries and local shops in North Woodstock, drive five minutes to Loon Mountain or Lost River Gorge, or set off on a day hike up Franconia Ridge — one of New England\'s most iconic trails. From scenic drives along the Kancamagus Highway to moose tours and aerial adventures, there is something for every season and every traveler.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/things-to-do') },
    openGraph: {
        url: canonicalUrl('/things-to-do'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/kancamagus.webp'), width: 1200, height: 630, alt: 'Franconia Ridge near Inn 32 in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/kancamagus.webp')],
    },
}

import PageLayout from '../../components/ui/PageLayout'

export default function ThingsToDoPage() {
    return (
        <PageLayout
            title="Explore the Area"
            subtitle="Your guide to the best dining, hiking, and attractions in the White Mountains."
        >
            <Suspense fallback={<div className="py-20 text-center font-sans">Loading activities...</div>}>
                <ThingsToDo thingsToDo={websiteData.thingsToDo} />
            </Suspense>
        </PageLayout>
    )
}
