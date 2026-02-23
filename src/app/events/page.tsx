import { Metadata } from 'next'
import Events from '../../components/Events'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: `Upcoming Events`,
    description: `Discover what's happening at ${websiteData.property.name} and the surrounding area.`,
}

import PageLayout from '../../components/ui/PageLayout'

export default function EventsPage() {
    return (
        <PageLayout
            title="Calendar of Events"
            subtitle="From local festivals to live music in our lounge, see what's happening during your stay."
        >
            <Events />
        </PageLayout>
    )
}
