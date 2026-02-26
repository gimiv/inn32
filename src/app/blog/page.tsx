import { Metadata } from 'next'
import Blog from '../../components/Blog'
import PageLayout from '../../components/ui/PageLayout'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Inn 32 Blog — White Mountains Travel Guides & Tips',
    description: 'Your insider guide to the White Mountains from Inn 32 in North Woodstock, NH. We cover the best hiking trails, local craft breweries, seasonal events, fall foliage drives, and everything else you need to plan the perfect New Hampshire getaway.',
}

export default function BlogPage() {
    return (
        <PageLayout
            title="Inn 32 Blog"
            subtitle="Explore our collection of stories about local adventures, seasonal highlights, and hotel updates."
        >
            <Blog blogPosts={websiteData.blogPosts} />
        </PageLayout>
    )
}
