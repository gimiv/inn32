import { ChevronDown } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import { LinkButton } from './ui/Button'
import { homepageFaqs } from '../data/guest-content'

export default function FaqPreview() {
    return (
        <section id="faq" className="py-14 md:py-16 bg-slate-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    label="Good to Know"
                    title="Questions Before You Book"
                    subtitle="Quick answers about arriving, parking, and staying at Inn 32."
                />
                <div className="space-y-3">
                    {homepageFaqs.map((faq, index) => (
                        <details
                            key={faq.id}
                            open={index === 0}
                            className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm"
                        >
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 py-4 font-display text-lg text-navy dark:text-white rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                                {faq.question}
                                <ChevronDown size={20} aria-hidden="true" className="flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="px-6 pb-5 font-sans text-charcoal dark:text-gray-300 leading-relaxed">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <LinkButton href="/faq" variant="outline">
                        Read All FAQs
                    </LinkButton>
                </div>
            </div>
        </section>
    )
}
