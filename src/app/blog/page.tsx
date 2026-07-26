import { Metadata } from 'next'
import Blog from '../../components/Blog'
import PageLayout from '../../components/ui/PageLayout'
import { websiteData } from '../../data/website-data'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Inn 32 Blog — White Mountains Travel Guides & Tips'
const DESCRIPTION = 'Your insider guide to the White Mountains from Inn 32 in North Woodstock, NH. We cover the best hiking trails, local craft breweries, seasonal events, fall foliage drives, and everything else you need to plan the perfect New Hampshire getaway.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/blog') },
    openGraph: {
        url: canonicalUrl('/blog'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/blog_hiking.webp'), width: 1200, height: 630, alt: 'Inn 32 blog — White Mountains travel guides' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/blog_hiking.webp')],
    },
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
