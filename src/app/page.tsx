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
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: `${websiteData.property.name} | ${websiteData.property.tagline}`,
    description: websiteData.property.description,
}

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero hero={websiteData.sections.hero} />
            <RoomList limit={3} roomTypes={websiteData.roomTypes} />
            <Reviews limit={6} reviews={websiteData.reviews} />
            <Offers limit={4} offers={websiteData.offers} />
            <Events limit={3} events={websiteData.events} />
            <Suspense fallback={<div className="py-20 text-center">Loading activities...</div>}>
                <ThingsToDo limit={12} thingsToDo={websiteData.thingsToDo} />
            </Suspense>
            <Gallery gallery={websiteData.gallery} />
            <Location property={websiteData.property} />
            <SocialReel socialPosts={websiteData.socialPosts} />
        </div>
    )
}
