import { Star } from 'lucide-react'
import { cn } from '../utils/cn'
import ContentSection from './ui/ContentSection'
import { Review } from '../types/website'

interface ReviewsProps {
    limit?: number
    reviews: Review[]
}

export default function Reviews({ limit, reviews }: ReviewsProps) {
    const isSlider = limit !== undefined;
    const displayReviews = limit ? reviews.slice(0, limit) : reviews;

    if (!reviews || reviews.length === 0) return null;

    const reviewItems = displayReviews.map((review) => (
        <div key={review.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 shadow-sm h-full flex flex-col border border-gray-100 dark:border-slate-700">
            <div className="flex text-yellow-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                ))}
            </div>
            <p className="font-sans text-charcoal dark:text-gray-300 italic mb-6 flex-grow leading-relaxed">
                "{review.text}"
            </p>
            <div>
                <p className="font-display font-bold text-navy dark:text-white tracking-wide">{review.author}</p>
                <p className="font-sans text-sm text-gray-500 font-medium">
                    {review.source} • {review.date}
                </p>
            </div>
        </div>
    ))

    return (
        <ContentSection
            id="reviews"
            className={cn("transition-colors duration-300", isSlider ? "py-20 bg-white dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800" : "pb-20 pt-4 md:pt-8 bg-transparent")}
            isCarousel={isSlider}
            items={reviewItems}
            header={{
                label: "Guest Experiences",
                title: "What Our Guests Say",
                subtitle: "Real stories from recent travelers who made Inn 32 their White Mountains basecamp."
            }}
            carouselItemClassName="flex-[0_0_85%] sm:flex-[0_0_60%] lg:flex-[0_0_40%] min-w-0 flex"
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        />
    )
}
