import { Metadata } from 'next'
import GroupReservations from '../../components/GroupReservations'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: `Group Events & Buyouts`,
    description: `Host your wedding, retreat, or reunion at ${websiteData.property.name}.`,
}

import Image from 'next/image'
import PageLayout from '../../components/ui/PageLayout'

export default function GroupsPage() {
    return (
        <PageLayout
            title="Group Events & Buyouts"
            subtitle="Create unforgettable memories in the heart of the White Mountains. Perfect for intimate weddings, family reunions, and corporate retreats."
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/group_hiking.webp"
                            alt="Group hiking in the White Mountains"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg md:-mt-8">
                        <Image
                            src="/wedding_party.webp"
                            alt="Joyful wedding party in the mountains"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/corporate_retreat.webp"
                            alt="Corporate retreat gathered around a fire pit"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            <GroupReservations />
        </PageLayout>
    )
}
