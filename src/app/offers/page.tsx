import { Metadata } from 'next'
import Offers from '../../components/Offers'
import { websiteData } from '../../data/website-data'
import PageLayout from '../../components/ui/PageLayout'

export const metadata: Metadata = {
    title: 'Special Offers & Packages',
    description: 'Save on your White Mountains getaway with seasonal deals and packages at Inn 32 in North Woodstock, NH. Winter weekday discounts, extended stay offers, and more.',
}

export default function OffersPage() {
    return (
        <PageLayout
            title="Special Offers"
            subtitle="Enhance your stay with our curated packages and seasonal discounts."
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                    Make the most of your White Mountains getaway with exclusive deals at Inn 32 in North Woodstock, NH.
                    Whether you are planning a winter weekday escape, an extended spring retreat, or a summer family
                    adventure, our seasonal packages help you save while enjoying everything the region has to offer.
                </p>
            </div>
            <Offers offers={websiteData.offers} />
        </PageLayout>
    )
}
