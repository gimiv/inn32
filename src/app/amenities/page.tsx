import { Metadata } from 'next'
import Amenities from '../../components/Amenities'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Hotel Amenities & Services',
    description: 'Every guest at Inn 32 in North Woodstock, NH enjoys complimentary amenities designed to make your White Mountains getaway effortless. From free on-site parking to high-speed Wi-Fi and in-room coffee, we have everything you need to relax after a day of hiking Franconia Ridge or skiing Loon Mountain.',
}

import PageLayout from '../../components/ui/PageLayout'

export default function AmenitiesPage() {
    return (
        <PageLayout
            title="Hotel Amenities & Services"
            subtitle="Enjoy our premium amenities including high-speed Wi-Fi, free parking, and cozy common areas."
        >
            <Amenities amenities={websiteData.amenities} />
        </PageLayout>
    )
}
