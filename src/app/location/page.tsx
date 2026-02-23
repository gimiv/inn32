import { Metadata } from 'next'
import { websiteData } from '../../data/website-data'
import PageLayout from '../../components/ui/PageLayout'
import Location from '../../components/Location'

export const metadata: Metadata = {
    title: `Location & Contact | ${websiteData.property.name}`,
    description: `Contact ${websiteData.property.name} and get directions to our prime location in the White Mountains.`,
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
