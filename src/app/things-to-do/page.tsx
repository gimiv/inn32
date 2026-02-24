import { Metadata, ResolvingMetadata } from 'next'
import ThingsToDo from '../../components/ThingsToDo'
import { websiteData } from '../../data/website-data'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Things To Do',
    description: 'Explore attractions, hiking trails, craft breweries, and activities near Inn 32 in North Woodstock, NH — from Franconia Ridge to Lost River Gorge, Loon Mountain, and the Kancamagus Highway.',
}

import PageLayout from '../../components/ui/PageLayout'

export default function ThingsToDoPage() {
    return (
        <PageLayout
            title="Explore the Area"
            subtitle="Your guide to the best dining, hiking, and attractions in the White Mountains."
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                    Inn 32 sits at the crossroads of the White Mountains' best attractions. Walk to craft breweries
                    and local shops in North Woodstock, drive five minutes to Loon Mountain or Lost River Gorge,
                    or set off on a day hike up Franconia Ridge — one of New England's most iconic trails.
                    From scenic drives along the Kancamagus Highway to moose tours and aerial adventures,
                    there is something for every season and every traveler.
                </p>
            </div>
            <Suspense fallback={<div className="py-20 text-center font-sans">Loading activities...</div>}>
                <ThingsToDo thingsToDo={websiteData.thingsToDo} />
            </Suspense>
        </PageLayout>
    )
}
