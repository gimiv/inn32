import { Metadata } from 'next'
import Events from '../../components/Events'
import { websiteData } from '../../data/website-data'
import { filterUpcomingEvents, nowIso } from '../../utils/dates'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Upcoming Events'
const DESCRIPTION = 'Local happenings around North Woodstock and the White Mountains, near Inn 32 — check back for confirmed dates, or contact us directly for what is currently on the calendar.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/events') },
    openGraph: {
        url: canonicalUrl('/events'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Events at Inn 32 in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

import PageLayout from '../../components/ui/PageLayout'

export default function EventsPage() {
    const upcomingEvents = filterUpcomingEvents(websiteData.events, nowIso())

    const eventsJsonLd = upcomingEvents.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": upcomingEvents.map((event, index) => ({
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
                "image": event.image ? canonicalUrl(event.image) : undefined,
                "organizer": { "@type": "Organization", "name": "Inn 32", "url": canonicalUrl('/') }
            }
        }))
    } : null

    return (
        <PageLayout
            title="Calendar of Events"
            subtitle="From local festivals to live music in our lounge, see what's happening during your stay."
        >
            {eventsJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
                />
            )}
            {upcomingEvents.length > 0 ? (
                <Events events={upcomingEvents} />
            ) : (
                <p className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-600 dark:text-gray-300 font-sans">
                    We don&apos;t have any confirmed upcoming dated events to list right now. Check back soon, or contact us at{' '}
                    <a href={`mailto:${websiteData.property.contact.email}`} className="text-mountain-blue hover:underline">
                        {websiteData.property.contact.email}
                    </a>{' '}
                    for what&apos;s happening locally during your stay.
                </p>
            )}
        </PageLayout>
    )
}
