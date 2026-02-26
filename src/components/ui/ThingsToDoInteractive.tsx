'use client'

import { useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import ImageCard from './ImageCard'
import { cn } from '../../utils/cn'
import { ThingToDo } from '../../types/website'

interface ThingsToDoInteractiveProps {
    thingsToDo: ThingToDo[]
}

export default function ThingsToDoInteractive({ thingsToDo }: ThingsToDoInteractiveProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

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

    const categories = useMemo(() => {
        const uniqueCategories = new Set(thingsToDo.map(item => item.category))
        return ["All Activities", ...Array.from(uniqueCategories)]
    }, [thingsToDo])

    const filteredItems = useMemo(() => {
        if (activeCategory === "All Activities") return thingsToDo
        return thingsToDo.filter(item => item.category === activeCategory)
    }, [activeCategory, thingsToDo])

    return (
        <>
            <div className="flex overflow-x-auto md:justify-center whitespace-nowrap pt-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 mb-4 sm:mb-8 gap-3 hide-scrollbar relative z-10 w-full max-w-7xl mx-auto lg:px-8">
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

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
                                href={item.link || "/things-to-do"}
                                image={item.image}
                                title={item.name}
                                subtitle={item.category}
                                description={item.description}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    )
}
