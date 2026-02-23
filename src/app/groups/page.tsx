import { Metadata } from 'next'
import GroupReservations from '../../components/GroupReservations'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: `Group Events & Buyouts`,
    description: `Host your wedding, retreat, or reunion at ${websiteData.property.name}.`,
}

import PageLayout from '../../components/ui/PageLayout'

export default function GroupsPage() {
    return (
        <PageLayout
            title="Group Events & Buyouts"
            subtitle="Create unforgettable memories in the heart of the White Mountains. Perfect for intimate weddings, family reunions, and corporate retreats."
        >
            <GroupReservations />
        </PageLayout>
    )
}
