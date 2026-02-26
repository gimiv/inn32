import { Metadata } from 'next'
import RoomList from '../../components/RoomList'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Rooms & Suites',
    description: 'Choose from 24 newly renovated accommodations at Inn 32 in North Woodstock, New Hampshire — from affordable standard rooms starting at $79/night to spacious multi-bedroom apartments perfect for families and groups. Every room features modern amenities including free Wi-Fi, smart TVs, and individual climate control, just minutes from Franconia Notch and Loon Mountain.',
}

import PageLayout from '../../components/ui/PageLayout'

export default function RoomsPage() {
    const roomsJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": websiteData.roomTypes.map((room, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "HotelRoom",
                "name": room.name,
                "description": room.shortDescription,
                "image": room.images[0]?.startsWith('/') ? `https://inn32.com${room.images[0]}` : room.images[0],
                "occupancy": { "@type": "QuantitativeValue", "maxValue": room.maxOccupancy },
                "bed": { "@type": "BedDetails", "typeOfBed": room.bedType },
                "offers": {
                    "@type": "Offer",
                    "price": String(room.basePrice),
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                }
            }
        }))
    }

    return (
        <PageLayout
            title="Stay With Us"
            subtitle="Experience the perfect blend of modern comfort and vintage charm in our newly renovated rooms and suites."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(roomsJsonLd) }}
            />
            {/* Room List Grid */}
            <RoomList roomTypes={websiteData.roomTypes} />
        </PageLayout>
    )
}
