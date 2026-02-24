import { Metadata } from 'next'
import RoomList from '../../components/RoomList'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: `Rooms & Suites`,
    description: `Browse our fully renovated rooms and suites at ${websiteData.property.name}.`,
}

import PageLayout from '../../components/ui/PageLayout'

export default function RoomsPage() {
    return (
        <PageLayout
            title="Stay With Us"
            subtitle="Experience the perfect blend of modern comfort and vintage charm in our newly renovated rooms and suites."
        >
            {/* Room List Grid */}
            <div className="py-20">
                <RoomList roomTypes={websiteData.roomTypes} />
            </div>
        </PageLayout>
    )
}
