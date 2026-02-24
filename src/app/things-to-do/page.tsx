import { Metadata, ResolvingMetadata } from 'next'
import ThingsToDo from '../../components/ThingsToDo'
import { websiteData } from '../../data/website-data'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: `Things To Do`,
    description: `Explore attractions, dining, and activities near ${websiteData.property.name}.`,
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
