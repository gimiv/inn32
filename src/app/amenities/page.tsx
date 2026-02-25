import { Metadata } from 'next'
import Amenities from '../../components/Amenities'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Hotel Amenities & Services',
    description: 'Inn 32 amenities in North Woodstock, NH — free Wi-Fi, free parking, air conditioning, smart TVs, in-room coffee, and more. Everything you need for a comfortable White Mountains stay.',
}

import PageLayout from '../../components/ui/PageLayout'

export default function AmenitiesPage() {
    return (
        <PageLayout
            title="Hotel Amenities & Services"
            subtitle="Enjoy our premium amenities including high-speed Wi-Fi, free parking, and cozy common areas."
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                    Every guest at Inn 32 in North Woodstock, NH enjoys complimentary amenities designed to make your White Mountains
                    getaway effortless. From free on-site parking to high-speed Wi-Fi and in-room coffee, we have everything you
                    need to relax after a day of hiking Franconia Ridge or skiing Loon Mountain.
                </p>
            </div>
            <Amenities amenities={websiteData.amenities} />
        </PageLayout>
    )
}
