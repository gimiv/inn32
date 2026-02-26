import { Metadata } from 'next'
import Offers from '../../components/Offers'
import { websiteData } from '../../data/website-data'
import PageLayout from '../../components/ui/PageLayout'

export const metadata: Metadata = {
    title: 'Special Offers & Packages',
    description: 'Make the most of your White Mountains getaway with exclusive deals at Inn 32 in North Woodstock, NH. Whether you are planning a winter weekday escape, an extended spring retreat, or a summer family adventure, our seasonal packages help you save while enjoying everything the region has to offer.',
}

export default function OffersPage() {
    return (
        <PageLayout
            title="Special Offers"
            subtitle="Enhance your stay with our curated packages and seasonal discounts."
        >
            <Offers offers={websiteData.offers} />
        </PageLayout>
    )
}
