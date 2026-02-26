import { Metadata } from 'next'
import Events from '../../components/Events'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Upcoming Events',
    description: 'North Woodstock and the White Mountains come alive year-round with live music, seasonal festivals, and community gatherings. Inn 32 is your home base for exploring everything happening in the region — from Maple Month sugarhouse tours in March to winter celebrations at nearby ski resorts.',
}

import PageLayout from '../../components/ui/PageLayout'

export default function EventsPage() {
    const eventsJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": websiteData.events.map((event, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Event",
                "name": event.title,
                "description": event.description,
                "startDate": event.date,
                "location": {
                    "@type": "Place",
                    "name": event.location,
                    "address": { "@type": "PostalAddress", "addressRegion": "NH", "addressCountry": "US" }
                },
                "image": event.image ? `https://inn32.com${event.image}` : undefined,
                "organizer": { "@type": "Organization", "name": "Inn 32", "url": "https://inn32.com" }
            }
        }))
    }

    return (
        <PageLayout
            title="Calendar of Events"
            subtitle="From local festivals to live music in our lounge, see what's happening during your stay."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
            />
            <Events events={websiteData.events} />
        </PageLayout>
    )
}
