import { Metadata, ResolvingMetadata } from 'next'
import ThingsToDo from '../../components/ThingsToDo'
import { websiteData } from '../../data/website-data'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Things To Do',
    description: 'Inn 32 sits at the crossroads of the White Mountains\' best attractions. Walk to craft breweries and local shops in North Woodstock, drive five minutes to Loon Mountain or Lost River Gorge, or set off on a day hike up Franconia Ridge — one of New England\'s most iconic trails. From scenic drives along the Kancamagus Highway to moose tours and aerial adventures, there is something for every season and every traveler.',
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
