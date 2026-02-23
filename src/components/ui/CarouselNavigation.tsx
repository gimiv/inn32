import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselNavigationProps {
    onPrev: () => void
    onNext: () => void
}

export default function CarouselNavigation({ onPrev, onNext }: CarouselNavigationProps) {
    return (
        <div className="flex gap-2">
            <button
                onClick={onPrev}
                className="p-3 rounded-full border border-gray-200 dark:border-slate-700 text-charcoal dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-x-1 hover:shadow-sm transition-all bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-mountain-blue"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button
                onClick={onNext}
                className="p-3 rounded-full border border-gray-200 dark:border-slate-700 text-charcoal dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:translate-x-1 hover:shadow-sm transition-all bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-mountain-blue"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    )
}
