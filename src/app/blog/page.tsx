import { Metadata } from 'next'
import Blog from '../../components/Blog'
import PageLayout from '../../components/ui/PageLayout'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: `Inn 32 Blog - Latest News & Guides`,
    description: `Read our latest travel guides, hotel updates, and local tips for visiting the White Mountains.`,
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
