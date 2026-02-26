import Link from 'next/link'
import { cn } from '../utils/cn'
import StandardCard from './ui/StandardCard'
import ContentSection from './ui/ContentSection'
import { LinkButton } from './ui/Button'
import { BlogPost } from '../types/website'

interface BlogProps {
    limit?: number
    blogPosts: BlogPost[]
}

export default function Blog({ limit, blogPosts }: BlogProps) {
    const isSlider = limit !== undefined;
    const displayPosts = limit ? blogPosts.slice(0, limit) : blogPosts;

    if (!blogPosts || blogPosts.length === 0) return null;

    const blogItems = displayPosts.map((post: BlogPost) => (
        <StandardCard
            key={post.id}
            image={post.image}
            title={post.title}
            description={post.excerpt}
            actions={
                <Link href={`/blog/${post.slug}`} className="text-mountain-blue hover:text-navy dark:hover:text-white font-medium transition-colors flex items-center">
                    Read Article <span className="ml-1">→</span>
                </Link>
            }
        />
    ))

    return (
        <ContentSection
            id="blog"
            className={cn("transition-colors duration-300", isSlider ? "py-20 bg-slate-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800" : "pb-20 pt-4 md:pt-8 bg-transparent")}
            isCarousel={isSlider}
            items={blogItems}
            header={isSlider ? {
                label: "Travel Guide",
                title: "Latest News",
                subtitle: "Stories, updates, and travel tips from the heart of the White Mountains."
            } : undefined}
            viewAllLink={isSlider && blogPosts.length > limit ? { href: "/blog", text: "Read All Articles" } : undefined}
            carouselItemClassName="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 flex"
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        />
    )
}
