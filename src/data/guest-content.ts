/**
 * Central guest-facing content: curated FAQs and experience highlights.
 *
 * Every claim here must be a durable, repo-verified fact. No exact drive
 * times/distances, no prices, no seasonal promotions — those live in
 * booking/offers systems that own their freshness.
 */

import { ThingToDo } from '../types/website'

export interface GuestFaq {
    id: string
    question: string
    answer: string
}

export const fullFaqs: GuestFaq[] = [
    {
        id: 'check-in-out',
        question: 'What are the check-in and check-out times at Inn 32?',
        answer: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. If you have questions about your arrival, call us at (603) 825-4790.',
    },
    {
        id: 'parking',
        question: 'Is parking free at Inn 32?',
        answer: 'Yes. Inn 32 offers complimentary on-site parking for all guests, and you can park right in front of your room for easy loading and unloading.',
    },
    {
        id: 'walkability',
        question: 'Can I walk to restaurants and shops from Inn 32?',
        answer: 'Absolutely. Inn 32 is on Main Street in North Woodstock, within walking distance of restaurants, local shops, the Woodstock Inn Brewery, and Cascade Park on the Pemigewasset River.',
    },
    {
        id: 'room-types',
        question: 'What types of rooms are available at Inn 32?',
        answer: 'We offer 24 rooms, all fully renovated in 2025, ranging from compact standard rooms for solo travelers and couples to multi-bedroom apartments that sleep up to 8 guests.',
    },
    {
        id: 'kitchens',
        question: 'Do any rooms at Inn 32 have kitchens?',
        answer: 'Select apartments include kitchen facilities and separate living space: the Two-Bedroom Apartment has a kitchenette and private patio, and the Four-Bedroom Apartment has a full kitchen. Standard rooms include a mini fridge and in-room coffee.',
    },
    {
        id: 'wifi',
        question: 'Is there Wi-Fi at Inn 32?',
        answer: 'Yes, complimentary high-speed Wi-Fi is available throughout the property.',
    },
    {
        id: 'group-buyouts',
        question: 'Can I book Inn 32 for a group event or wedding?',
        answer: 'Yes. Inn 32 offers full-property buyouts of all 24 rooms for weddings, family reunions, retreats, and friend-group getaways. Visit our Groups page or email info@inn32.com to start planning.',
    },
    {
        id: 'location',
        question: 'Where is Inn 32 located, and how do I get there?',
        answer: 'Inn 32 is at 180 Main Street in North Woodstock, New Hampshire, just off Interstate 93 at Exit 32 — the exit the inn is named for.',
    },
    {
        id: 'nearby',
        question: 'What is there to do near Inn 32?',
        answer: 'Loon Mountain, Franconia Notch State Park, and the Kancamagus Highway are all a short drive away, while the village itself offers breweries, restaurants, shops, and Cascade Park on the Pemigewasset River within walking distance.',
    },
    {
        id: 'outdoor-space',
        question: 'Does Inn 32 have outdoor space?',
        answer: 'Yes. Guests can gather at our outdoor fire pit area by the Pemigewasset River, and select apartments have private patios.',
    },
    {
        id: 'best-time',
        question: 'When is the best time to visit North Woodstock, NH?',
        answer: 'North Woodstock is a year-round destination: summer brings hiking and time on the river, fall means foliage along the Kancamagus Highway, winter is ski season at nearby Loon Mountain and Cannon Mountain, and spring features Maple Month at local sugarhouses.',
    },
]

const HOMEPAGE_FAQ_IDS = ['check-in-out', 'parking', 'walkability', 'room-types', 'group-buyouts'] as const

export const homepageFaqs: GuestFaq[] = HOMEPAGE_FAQ_IDS.map((id) => {
    const faq = fullFaqs.find((f) => f.id === id)
    if (!faq) throw new Error(`Homepage FAQ id "${id}" is missing from fullFaqs`)
    return faq
})

export interface ExperienceHighlight {
    id: string
    title: string
    description: string
    image: string
    imageAlt: string
}

/**
 * Experience-led highlights for the homepage and /amenities intro.
 * Separate from websiteData.amenities, which remains the factual basic
 * inventory consumed by the global LodgingBusiness schema.
 */
export const experienceHighlights: ExperienceHighlight[] = [
    {
        id: 'park-at-your-door',
        title: 'Park right outside your room',
        description: 'Free on-site parking in front of your room — unload in seconds and start your day without a shuttle or garage.',
        image: '/gallery/front-view.webp',
        imageAlt: 'Inn 32 front exterior with parking on Main Street in North Woodstock',
    },
    {
        id: 'river-firepit-evenings',
        title: 'Evenings by the river fire pit',
        description: 'Wind down at the outdoor fire pit area beside the Pemigewasset River after a day in the mountains.',
        image: '/gallery/river-entry.webp',
        imageAlt: 'Pemigewasset River access beside Inn 32 in North Woodstock',
    },
    {
        id: 'apartment-living',
        title: 'Apartments with space to spread out',
        description: 'Select apartments add kitchens or kitchenettes, separate living areas, and private patios — reimagined in the 2025 renovation.',
        image: '/gallery/living-room-01--1-.webp',
        imageAlt: 'Renovated apartment living room at Inn 32',
    },
    {
        id: 'walkable-main-street',
        title: 'Main Street at your doorstep',
        description: 'Walk to restaurants, shops, the Woodstock Inn Brewery, and Cascade Park in the village of North Woodstock.',
        image: '/gallery/cascade_park.webp',
        imageAlt: 'Cascade Park on the Pemigewasset River near Inn 32 in North Woodstock',
    },
]

export interface InsiderGuideSection {
    id: string
    title: string
    intro: string
    thingIds: string[]
}

/**
 * Curated "Inn 32 Insider Guide" for /things-to-do. Sections reference
 * existing websiteData.thingsToDo records by id — venue facts live only
 * there. resolveInsiderGuide throws if a referenced id disappears.
 */
export const insiderGuideSections: InsiderGuideSection[] = [
    {
        id: 'first-time-here',
        title: 'First Time Here',
        intro: 'New to North Woodstock? Start with the classics: the brewery you can walk to from the inn, the river park in the village, and the drives and gorges the White Mountains are known for.',
        thingIds: ['woodstock-inn', 'cascade-park', 'lost-river', 'kancamagus-byway'],
    },
    {
        id: 'family-day',
        title: 'Family Day',
        intro: 'Easy wins for kids and grandparents alike — attractions built for all ages, all within day-trip range of the inn.',
        thingIds: ['clarks-bears', 'lost-river', 'alpine-adventures', 'pemi-moose-tours'],
    },
    {
        id: 'mountain-day',
        title: 'Mountain Day',
        intro: 'Big views, earned or ridden. Pick a summit hike, or let a gondola or tramway do the climbing for you.',
        thingIds: ['franconia-ridge', 'loon-gondola', 'cannon-tramway', 'kancamagus-trails'],
    },
    {
        id: 'food-and-drink',
        title: 'Food & Drink',
        intro: 'Breweries, taprooms, and classic New England comfort food — starting on the Main Street you can stroll from your room.',
        thingIds: ['woodstock-inn', 'base-camp-brewing', 'schilling-beer', 'common-man'],
    },
    {
        id: 'winter',
        title: 'Winter',
        intro: 'When the snow flies, the valley turns into a cold-weather playground.',
        thingIds: ['ice-castles', 'winter-activities'],
    },
]

export interface ResolvedInsiderGuideSection extends InsiderGuideSection {
    things: ThingToDo[]
}

/** Resolve guide sections against the live thingsToDo records; throws on a missing id. */
export function resolveInsiderGuide(
    thingsToDo: ThingToDo[],
    sections: InsiderGuideSection[] = insiderGuideSections,
): ResolvedInsiderGuideSection[] {
    return sections.map((section) => ({
        ...section,
        things: section.thingIds.map((id) => {
            const thing = thingsToDo.find((t) => t.id === id)
            if (!thing) throw new Error(`Insider guide "${section.id}" references unknown thing-to-do id "${id}"`)
            return thing
        }),
    }))
}

export interface FaqJsonLd {
    '@context': 'https://schema.org'
    '@type': 'FAQPage'
    mainEntity: Array<{
        '@type': 'Question'
        name: string
        acceptedAnswer: { '@type': 'Answer'; text: string }
    }>
}

/** FAQPage JSON-LD for exactly the FAQs displayed on the calling page. */
export function buildFaqJsonLd(faqs: GuestFaq[]): FaqJsonLd {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    }
}

/** Serialize JSON-LD safely for embedding inside an HTML script element. */
export function serializeJsonLd(value: unknown): string {
    return JSON.stringify(value).replace(/</g, '\\u003c')
}
