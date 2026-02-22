import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'

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
        <section id="blog" className={cn("py-20 transition-colors duration-300", isSlider ? "bg-slate-50 dark:bg-slate-900" : "bg-white dark:bg-slate-900")}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        {isSlider ? (
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                                Latest News
                            </h2>
                        ) : (
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                                Inn 32 Blog
                            </h1>
                        )}
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                            {isSlider
                                ? "Stories, updates, and travel tips from the heart of the White Mountains."
                                : "Explore our collection of stories about local adventures, seasonal highlights, and hotel updates."}
                        </p>
                    </div>

                    {/* Desktop Arrows for Slider */}
                    {isSlider && (
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={scrollPrev}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 text-slate-600" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 text-slate-600" />
                            </button>
                        </div>
                    )}
                </div>

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
                            to="/blog"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => window.scrollTo(0, 0)}
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
        <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[3/2] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-primary dark:text-blue-400" />
                        {post.date}
                    </div>
                    {post.author && (
                        <div className="flex items-center">
                            <User className="w-3 h-3 mr-1 text-slate-400" />
                            {post.author}
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                    <span className="inline-flex items-center text-primary dark:text-blue-400 font-semibold text-sm group-hover:underline">
                        Read Story <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                </div>
            </div>
        </div>
    )
}
