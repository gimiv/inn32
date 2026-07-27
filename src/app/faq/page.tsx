import { Metadata } from 'next'
import PageLayout from '../../components/ui/PageLayout'
import { websiteData } from '../../data/website-data'
import { fullFaqs, buildFaqJsonLd, serializeJsonLd } from '../../data/guest-content'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Frequently Asked Questions'
const DESCRIPTION = 'Common questions about staying at Inn 32 in North Woodstock, NH — check-in/check-out times, parking, walkability, room types, and group buyouts.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/faq') },
    openGraph: {
        url: canonicalUrl('/faq'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Inn 32 boutique hotel in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

export default function FAQPage() {
    const faqJsonLd = buildFaqJsonLd(fullFaqs)

    return (
        <PageLayout
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about staying at Inn 32 in the White Mountains."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-8">
                    {fullFaqs.map((faq) => (
                        <div key={faq.id} className="border-b border-gray-200 dark:border-slate-700 pb-8 last:border-0">
                            <h2 className="font-display text-xl text-navy dark:text-white mb-3">
                                {faq.question}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-300 font-sans mb-4">
                        Still have questions? We would love to hear from you.
                    </p>
                    <a
                        href={`mailto:${websiteData.property.contact.email}`}
                        className="inline-flex items-center justify-center px-8 py-3 bg-navy text-white rounded-full hover:bg-mountain-blue transition-colors font-sans font-medium shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </PageLayout>
    )
}
