'use client'

import { useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'
import ImageCard from './ui/ImageCard'
import CarouselNavigation from './ui/CarouselNavigation'

interface ThingsToDoProps {
    limit?: number
    showFilters?: boolean
}

export default function ThingsToDo({ limit, showFilters = true }: ThingsToDoProps) {
    const { thingsToDo } = websiteData
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    // Derived state from URL parameter, defaulting to "All Activities"
    const activeCategory = searchParams.get('category') || "All Activities"

    const handleCategorySelect = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (category === "All Activities") {
            params.delete('category')
        } else {
            params.set('category', category)
        }
        router.push(pathname + '?' + params.toString(), { scroll: false })
    }

    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const categories = useMemo(() => {
        const uniqueCategories = new Set(thingsToDo.map(item => item.category))
        return ["All Activities", ...Array.from(uniqueCategories)]
    }, [thingsToDo])

    const filteredItems = useMemo(() => {
        if (activeCategory === "All Activities") return thingsToDo
        return thingsToDo.filter(item => item.category === activeCategory)
    }, [activeCategory, thingsToDo])




    // Reset carousel to start when category changes
    useEffect(() => {
        if (emblaApi) emblaApi.scrollTo(0)
    }, [emblaApi, activeCategory])

    const isSlider = limit !== undefined; // Determine if it's in slider mode (home page)

    return (
        <section id="things-to-do" className={cn("transition-colors duration-300", isSlider ? "py-20 bg-cream dark:bg-slate-900" : "pb-20 pt-4 md:pt-8 bg-transparent")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isSlider && (
                    <div className="transition-spacing duration-300 mb-12">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                            <div className="text-center md:text-left">
                                <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                    Explore The Area
                                </span>
                                <h2 className="font-display text-page-title text-navy dark:text-white mb-4">Things To Do</h2>
                                <p className="font-sans text-subheading text-charcoal dark:text-gray-300 max-w-2xl">
                                    North Woodstock is your gateway to the White Mountains.
                                </p>
                            </div>
                            <CarouselNavigation onPrev={scrollPrev} onNext={scrollNext} />
                        </div>
                    </div>
                )}

                {/* Filter Bar - Hide if limit (Home mode) */}
                {showFilters && (
                    <div className="flex overflow-x-auto whitespace-nowrap pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-4 sm:mb-8 gap-3 hide-scrollbar relative z-10">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform flex-shrink-0",
                                    activeCategory === category
                                        ? "bg-primary text-white scale-105 shadow-md"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}

                {limit ? (
                    /* Carousel View */
                    <div className="overflow-hidden p-4 -m-4" ref={emblaRef}>
                        <div className="flex touch-pan-y" style={{ gap: '1.5rem' }}>
                            {filteredItems.map((item) => (
                                <div key={item.id} className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_28%] min-w-0">
                                    <ImageCard
                                        href="/things-to-do"
                                        image={item.image}
                                        title={item.name}
                                        subtitle={item.category}
                                        description={item.description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Grid View */
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ImageCard
                                        href="/things-to-do"
                                        image={item.image}
                                        title={item.name}
                                        subtitle={item.category}
                                        description={item.description}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {limit && (
                    <div className="mt-12 text-center">
                        <Link
                            href="/things-to-do"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            See All Activities
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
