import { Metadata } from 'next'
import Hero from '../components/Hero'
import RoomList from '../components/RoomList'
import Events from '../components/Events'
import ThingsToDo from '../components/ThingsToDo'
import Reviews from '../components/Reviews'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import SocialReel from '../components/SocialReel'
import Offers from '../components/Offers'
import { websiteData } from '../data/website-data'
import { filterActiveOffers, filterUpcomingEvents, nowIso } from '../utils/dates'
import { Suspense } from 'react'
import { canonicalUrl } from '../lib/seo'

const TITLE = 'Boutique Hotel in North Woodstock, NH | White Mountains Lodging'
const DESCRIPTION = 'Stay at Inn 32, a newly revitalized boutique hotel on Main Street in North Woodstock, New Hampshire. 24 rooms from $79/night, minutes from Franconia Notch, Loon Mountain, and the Kancamagus Highway.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/') },
    openGraph: {
        url: canonicalUrl('/'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Inn 32 boutique hotel exterior in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

export default function Home() {
    const today = nowIso()
    const activeOffers = filterActiveOffers(websiteData.offers, today)
    const upcomingEvents = filterUpcomingEvents(websiteData.events, today)

    return (
        <div className="flex flex-col min-h-screen">
            <Hero hero={websiteData.sections.hero} />
            <RoomList limit={3} roomTypes={websiteData.roomTypes} />
            <Reviews limit={3} reviews={websiteData.reviews} />
            <Offers limit={3} offers={activeOffers} />
            <Events limit={3} events={upcomingEvents} />
            <Suspense fallback={<div className="py-20 text-center">Loading activities...</div>}>
                <ThingsToDo limit={6} thingsToDo={websiteData.thingsToDo} />
            </Suspense>
            <Gallery gallery={websiteData.gallery.slice(0, 8)} />
            <Location property={websiteData.property} />
            <SocialReel socialPosts={websiteData.socialPosts.slice(0, 8)} />
        </div>
    )
}
