'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'
import CarouselNavigation from './ui/CarouselNavigation'
import StandardCard from './ui/StandardCard'

interface BlogProps {
    limit?: number
}

export default function Blog({ limit }: BlogProps) {
    const { blogPosts } = websiteData
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const isSlider = !!limit
    const displayPosts = limit ? blogPosts.slice(0, limit) : blogPosts

    return (
        <section id="blog" className={cn("transition-colors duration-300", isSlider ? "py-20 bg-slate-50 dark:bg-slate-900" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isSlider && (
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                Travel Guide
                            </span>
                            <h2 className="font-display text-page-title text-navy dark:text-white mb-4">
                                Latest News
                            </h2>
                            <p className="font-sans text-subheading text-charcoal dark:text-slate-300 max-w-2xl">
                                Stories, updates, and travel tips from the heart of the White Mountains.
                            </p>
                        </div>
                        <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                    </div>
                )}

                {isSlider ? (
                    // Carousel Layout
                    <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                        <div className="flex gap-6">
                            {displayPosts.map((post) => (
                                <div key={post.id} className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                                    <BlogCard post={post} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Grid Layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}

                {isSlider && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Read All Articles
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

function BlogCard({ post }: { post: typeof websiteData.blogPosts[0] }) {
    return (
        <Link href={`/blog/${post.slug}`} className="block h-full">
            <StandardCard
                image={post.image}
                title={post.title}
                description={post.excerpt}
                metadata={
                    <div className="flex items-center gap-4 text-xs font-medium text-charcoal dark:text-slate-400">
                        <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 text-mountain-blue" />
                            {post.date}
                        </div>
                        {post.author && (
                            <div className="flex items-center">
                                <User className="w-3 h-3 mr-1 text-gray-brand dark:text-slate-400" />
                                {post.author}
                            </div>
                        )}
                    </div>
                }
                actions={
                    <span className="inline-flex items-center text-mountain-blue font-semibold text-sm group-hover:underline">
                        Read Story <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                }
            />
        </Link>
    )
}
