import { Metadata } from 'next'
import Offers from '../../components/Offers'
import { websiteData } from '../../data/website-data'
import PageLayout from '../../components/ui/PageLayout'

export const metadata: Metadata = {
    title: `Special Offers & Packages | ${websiteData.property.name}`,
    description: `Browse exclusive deals, seasonal packages, and special offers at ${websiteData.property.name}.`,
}

export default function OffersPage() {
    return (
        <PageLayout
            title="Special Offers"
            subtitle="Enhance your stay with our curated packages and seasonal discounts."
        >
            <Offers />
        </PageLayout>
    )
}
