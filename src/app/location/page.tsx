import { Metadata } from 'next'
import { websiteData } from '../../data/website-data'
import PageLayout from '../../components/ui/PageLayout'
import Location from '../../components/Location'

export const metadata: Metadata = {
    title: 'Location & Directions',
    description: 'Find Inn 32 at 180 Main Street, North Woodstock, NH 03262. Minutes from Franconia Notch, Loon Mountain, and the Kancamagus Highway. Call (603) 825-4790.',
}

export default function LocationPage() {
    return (
        <PageLayout
            title="Location & Contact"
            subtitle="Conveniently located on Main Street in the heart of the White Mountains."
        >
            <Location property={websiteData.property} standalone={true} />
        </PageLayout>
    )
}
