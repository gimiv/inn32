import { Metadata } from 'next'
import RoomList from '../../components/RoomList'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Rooms & Suites',
    description: 'Browse 24 newly renovated rooms and suites at Inn 32 in North Woodstock, NH — from cozy singles to spacious family apartments. Starting at $79/night in the White Mountains.',
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                    Choose from 24 newly renovated accommodations at Inn 32 in North Woodstock, New Hampshire — from affordable
                    standard rooms starting at $79/night to spacious multi-bedroom apartments perfect for families and groups.
                    Every room features modern amenities including free Wi-Fi, smart TVs, and individual climate control,
                    just minutes from Franconia Notch and Loon Mountain.
                </p>
            </div>
            {/* Room List Grid */}
            <div className="py-20">
                <RoomList roomTypes={websiteData.roomTypes} />
            </div>
        </PageLayout>
    )
}
