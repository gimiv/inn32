import { Metadata } from 'next'
import Events from '../../components/Events'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Upcoming Events',
    description: 'Events and festivals near Inn 32 in North Woodstock, NH — live music, Maple Month tours, winter festivals, and seasonal activities throughout the White Mountains region.',
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                    North Woodstock and the White Mountains come alive year-round with live music, seasonal festivals,
                    and community gatherings. Inn 32 is your home base for exploring everything happening in the region —
                    from Maple Month sugarhouse tours in March to winter celebrations at nearby ski resorts.
                </p>
            </div>
            <Events events={websiteData.events} />
        </PageLayout>
    )
}
