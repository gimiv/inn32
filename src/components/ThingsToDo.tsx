import { useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { websiteData } from '../data/website-data'
import { cn } from '../utils/cn'

interface ThingsToDoProps {
    limit?: number
    showFilters?: boolean
}

export default function ThingsToDo({ limit, showFilters = true }: ThingsToDoProps) {
    const { thingsToDo } = websiteData
    const [searchParams, setSearchParams] = useSearchParams()

    // Derived state from URL parameter, defaulting to "All Activities"
    const activeCategory = searchParams.get('category') || "All Activities"

    const handleCategorySelect = (category: string) => {
        if (category === "All Activities") {
            setSearchParams({})
        } else {
            setSearchParams({ category })
        }
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

    return (
        <section id="things-to-do" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Things To Do</h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            North Woodstock is your gateway to the White Mountains.
                        </p>
                    </div>

                    {limit && (
                        <div className="hidden md:flex space-x-2 mt-4 md:mt-0">
                            <button onClick={scrollPrev} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={scrollNext} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Filter Bar - Hide if limit (Home mode) */}
                {showFilters && (
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform",
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
                                    <Link to="/things-to-do" className="block group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="text-xs font-semibold tracking-wider uppercase text-blue-200 mb-2 block">
                                                {item.category}
                                            </span>
                                            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                            <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
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
                                    className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-xs font-semibold tracking-wider uppercase text-blue-200 mb-2 block">
                                            {item.category}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                        <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {limit && (
                    <div className="mt-12 text-center">
                        <Link
                            to="/things-to-do"
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            See All Activities
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
