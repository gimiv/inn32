import { Metadata } from 'next'
import Amenities from '../../components/Amenities'

export const metadata: Metadata = {
    title: `Hotel Amenities & Services`,
    description: `Enjoy our premium amenities including complimentary breakfast, high-speed Wi-Fi, and cozy common areas.`,
}

import PageLayout from '../../components/ui/PageLayout'

export default function AmenitiesPage() {
    return (
        <PageLayout
            title="Hotel Amenities & Services"
            subtitle="Enjoy our premium amenities including complimentary breakfast, high-speed Wi-Fi, and cozy common areas."
        >
            <Amenities />
        </PageLayout>
    )
}
