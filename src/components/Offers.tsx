import { websiteData } from '../data/website-data'
import { Tag, Calendar, ArrowRight } from 'lucide-react'

export default function Offers() {
    const { offers } = websiteData

    if (!offers || offers.length === 0) return null

    const handleBookOffer = (promoCode?: string) => {
        // If we want to support passing promo code to Mews, we might need to store it in a global state 
        // or URL param before opening. For now, we'll just open the widget.
        // In a real implementation, we'd dispatch an event with details:
        window.dispatchEvent(new CustomEvent('open-booking-widget', {
            detail: { promoCode }
        }))
    }

    return (
        <section id="offers" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                        Special Offers
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Elevate your stay with our exclusive packages and seasonal promotions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <div key={offer.id} className="group bg-gray-50 dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                {offer.promoCode && (
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1">
                                        <Tag size={12} className="text-blue-600" />
                                        CODE: {offer.promoCode}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                                    {offer.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200 dark:border-slate-700">
                                    {offer.validUntil && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            <Calendar size={14} />
                                            Valid thru {offer.validUntil}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleBookOffer(offer.promoCode)}
                                        className="ml-auto inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                    >
                                        Book Offer
                                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
