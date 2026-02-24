import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { websiteData } from '../../../data/website-data'

export function generateStaticParams() {
    return websiteData.blogPosts.map((post) => ({
        slug: post.slug,
    }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = websiteData.blogPosts.find((p) => p.slug === params.slug)

    if (!post) {
        return { title: 'Post Not Found' }
    }

    return {
        title: `${post.title} | Inn 32 Blog`,
        description: post.excerpt,
    }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = websiteData.blogPosts.find((p) => p.slug === params.slug)

    if (!post) {
        notFound()
    }

    // Split content by paragraphs to render them distinctly
    const paragraphs = post.content ? post.content.split('\n\n') : []

    return (
        <article className="min-h-screen bg-cream dark:bg-slate-900 pb-20 pt-32">
            {/* Header section with image and title */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-mountain-blue hover:underline mb-8 font-sans font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all articles
                </Link>

                <h1 className="text-4xl md:text-5xl font-display font-bold text-navy dark:text-white mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-charcoal dark:text-gray-400 mb-10">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-mountain-blue" />
                        {post.date}
                    </div>
                    {post.author && (
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2 text-gray-brand dark:text-gray-400" />
                            {post.author}
                        </div>
                    )}
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl mb-16">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content rendering */}
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none font-sans text-charcoal dark:text-gray-300">
                    {paragraphs.length > 0 ? (
                        paragraphs.map((para, index) => (
                            <p key={index} className="mb-6 leading-relaxed text-lg">
                                {para}
                            </p>
                        ))
                    ) : (
                        <p className="text-lg italic text-gray-500">
                            Check back soon for the full story.
                        </p>
                    )}
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-800">
                    <Link
                        href="/blog"
                        className="inline-flex justify-center items-center w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Explore More Travel Guides
                    </Link>
                </div>
            </div>
        </article>
    )
}
