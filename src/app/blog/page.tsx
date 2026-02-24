import { Metadata } from 'next'
import Blog from '../../components/Blog'
import PageLayout from '../../components/ui/PageLayout'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Inn 32 Blog — White Mountains Travel Guides & Tips',
    description: 'Travel guides, seasonal tips, and local recommendations from Inn 32 in North Woodstock, NH. Hiking trails, craft breweries, foliage drives, and more in the White Mountains.',
}

export default function BlogPage() {
    return (
        <PageLayout
            title="Inn 32 Blog"
            subtitle="Explore our collection of stories about local adventures, seasonal highlights, and hotel updates."
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
                    Your insider guide to the White Mountains from Inn 32 in North Woodstock, NH.
                    We cover the best hiking trails, local craft breweries, seasonal events, fall foliage drives,
                    and everything else you need to plan the perfect New Hampshire getaway.
                </p>
            </div>
            <Blog blogPosts={websiteData.blogPosts} />
        </PageLayout>
    )
}
