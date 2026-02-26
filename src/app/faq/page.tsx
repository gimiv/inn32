import { Metadata } from 'next'
import PageLayout from '../../components/ui/PageLayout'
import { websiteData } from '../../data/website-data'

export const metadata: Metadata = {
    title: 'Frequently Asked Questions',
    description: 'Common questions about staying at Inn 32 in North Woodstock, NH — check-in/check-out times, parking, pet policy, nearby attractions, and more.',
}

const faqs = [
    {
        question: "What are the check-in and check-out times at Inn 32?",
        answer: "Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request — please contact us at (603) 825-4790."
    },
    {
        question: "Is parking free at Inn 32?",
        answer: "Yes, Inn 32 offers complimentary on-site parking for all guests. You can park directly in front of your room for easy access."
    },
    {
        question: "How far is Inn 32 from Franconia Notch State Park?",
        answer: "Inn 32 is approximately 10 minutes (7 miles) from the entrance to Franconia Notch State Park, home to the Flume Gorge, Cannon Mountain Aerial Tramway, and the trailhead for Franconia Ridge."
    },
    {
        question: "How far is Inn 32 from Loon Mountain?",
        answer: "Loon Mountain Resort in Lincoln, NH is just 5 minutes (3 miles) from Inn 32, making us an ideal base for skiing, snowboarding, and summer gondola rides."
    },
    {
        question: "Does Inn 32 allow pets?",
        answer: "Inn 32 is not a pet-friendly property at this time. We recommend checking local boarding options in the Lincoln-Woodstock area if you are traveling with pets."
    },
    {
        question: "Is there Wi-Fi at Inn 32?",
        answer: "Yes, complimentary high-speed Wi-Fi is available in all rooms and common areas throughout the property."
    },
    {
        question: "Can I walk to restaurants and shops from Inn 32?",
        answer: "Absolutely. Inn 32 is located on Main Street in North Woodstock, within walking distance of restaurants like the Woodstock Inn Brewery, local shops, and Cascade Park on the Pemigewasset River."
    },
    {
        question: "Does Inn 32 have a pool or hot tub?",
        answer: "Inn 32 features an outdoor fire pit area by the river — perfect for relaxing in the evening. The Pemigewasset River is also accessible for wading during summer months."
    },
    {
        question: "What types of rooms are available at Inn 32?",
        answer: "We offer 24 rooms ranging from cozy Standard Singles ($79/night) to spacious Four-Bedroom Apartments ($199/night) that sleep up to 8 guests. All rooms were fully renovated in 2025 with modern amenities."
    },
    {
        question: "Can I book Inn 32 for a group event or wedding?",
        answer: "Yes! Inn 32 is available for full-property buyouts, perfect for intimate weddings, family reunions, and corporate retreats. Contact our group coordinator at info@inn32.com or (603) 825-4790 to discuss your event."
    },
    {
        question: "What is the best time to visit North Woodstock, NH?",
        answer: "North Woodstock is a year-round destination. Summer offers hiking, kayaking, and outdoor adventures. Fall brings spectacular foliage along the Kancamagus Highway. Winter is ideal for skiing at Loon Mountain and Cannon Mountain. Spring features Maple Month tours and the return of wildflowers."
    },
    {
        question: "Is there a kitchen in the rooms at Inn 32?",
        answer: "Select rooms include kitchenettes or full kitchens. Our Two-Bedroom and Four-Bedroom Apartments feature full kitchen facilities with cookware, while standard rooms include a mini fridge and coffee maker."
    },
    {
        question: "How do I get to Inn 32?",
        answer: "Inn 32 is located at 180 Main Street, North Woodstock, NH 03262. We are easily accessible via I-93 (Exit 32). From Boston, the drive is approximately 2 hours. From Manchester, NH it is about 1.5 hours."
    },
    {
        question: "Does Inn 32 offer any special deals or packages?",
        answer: "Yes, we regularly offer seasonal promotions including winter weekday discounts, extended stay packages, and early summer deals. Visit our Offers page for current specials or enter a promo code when booking."
    }
]

export default function FAQPage() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    }

    return (
        <PageLayout
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about staying at Inn 32 in the White Mountains."
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-8">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-slate-700 pb-8 last:border-0">
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
