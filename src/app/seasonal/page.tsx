import { Metadata } from 'next'
import Image from 'next/image'
import { Mountain, Briefcase, Home } from 'lucide-react'
import PageLayout from '../../components/ui/PageLayout'
import SeasonalInquiryForm from '../../components/SeasonalInquiryForm'
import { websiteData } from '../../data/website-data'
import { SEASONS, BOOKING_WINDOWS, SEASONAL_ROOM_OPTIONS, SEASONAL_PAGE_PATH, formatSeasonalRate, lowestRate } from '../../data/seasonal'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Seasonal Monthly Rentals'
const DESCRIPTION = 'Discounted monthly rentals for the winter ski season and summer/fall at Inn 32 in North Woodstock, NH. Rooms and full apartments on Main Street in the White Mountains.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl(SEASONAL_PAGE_PATH) },
    openGraph: {
        url: canonicalUrl(SEASONAL_PAGE_PATH),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/group_skiing.webp'), width: 1200, height: 630, alt: 'Skiing in the White Mountains near Inn 32' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/group_skiing.webp')],
    },
}

export default function SeasonalPage() {
    const rooms = SEASONAL_ROOM_OPTIONS
        .map((option) => {
            const room = websiteData.roomTypes.find((r) => r.id === option.roomTypeId)
            return room ? { ...option, room } : null
        })
        .filter((r): r is NonNullable<typeof r> => r !== null)

    const winterFrom = lowestRate('winter')

    const formRoomOptions = SEASONAL_ROOM_OPTIONS.map((option) => ({
        label: option.label,
        soldOutSeasons: SEASONS.filter((season) => option.rates[season.id] === 'sold-out').map((season) => season.name),
    }))

    const reasons = [
        {
            icon: Mountain,
            title: 'A basecamp for every season',
            description: 'Ski Loon and Cannon all winter, or spend summer and fall hiking Franconia Ridge and the Kancamagus.',
        },
        {
            icon: Briefcase,
            title: 'Work remotely',
            description: 'Wi-Fi is included, so you can put in a work day and still catch the afternoon light on the slopes.',
        },
        {
            icon: Home,
            title: 'Live like a local',
            description: 'Walk to North Woodstock restaurants, breweries, and shops from our spot on Main Street.',
        },
    ]

    return (
        <PageLayout
            title="Seasonal Rentals"
            subtitle={`Interested in renting a room for the summer, fall or winter ski season? We offer discounted monthly rentals${winterFrom ? `, with winter stays from ${formatSeasonalRate(winterFrom)}/month` : ''}.`}
            backgroundImage="/gallery/group_skiing.webp"
        >
            {/* Rate table */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16" aria-labelledby="seasonal-rates-heading">
                <h2 id="seasonal-rates-heading" className="font-display text-page-title text-navy dark:text-white mb-6 text-center">
                    Seasonal Rates
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <table className="w-full text-center bg-white dark:bg-slate-800">
                        <caption className="sr-only">Monthly rates by room type and season</caption>
                        <thead className="bg-slate-50 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className="px-4 py-4 font-bold text-slate-900 dark:text-white">Room Type</th>
                                {SEASONS.map((season) => (
                                    <th key={season.id} scope="col" className="px-4 py-4 font-bold text-slate-900 dark:text-white">
                                        {season.name}
                                        <span className="block text-sm font-semibold text-slate-500 dark:text-slate-300">({season.months})</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {SEASONAL_ROOM_OPTIONS.map((option) => (
                                <tr key={option.roomTypeId}>
                                    <th scope="row" className="px-4 py-4 font-medium text-slate-900 dark:text-white">{option.label}</th>
                                    {SEASONS.map((season) => {
                                        const rate = option.rates[season.id]
                                        return (
                                            <td
                                                key={season.id}
                                                className={`px-4 py-4 ${rate === 'sold-out' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white font-semibold'}`}
                                            >
                                                {rate === 'sold-out' ? '(Sold Out)' : formatSeasonalRate(rate)}
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-3">Monthly rates in USD.</p>
            </section>

            {/* Why + Form */}
            <section id="seasonal-inquiry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-24">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2">
                        <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                            Stay the Season
                        </span>
                        <h2 className="font-display text-page-title text-navy dark:text-white mb-6">
                            Make the Mountains Home for a Season
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                            Skip the weekend drive and the nightly rates. Our monthly stays give skiers, hikers, remote workers,
                            and seasonal staff a furnished place to land for a month or the whole season,
                            with the village right outside the door.
                        </p>
                        <div className="space-y-6">
                            {reasons.map((reason) => (
                                <div key={reason.title} className="flex gap-4">
                                    <div className="w-10 h-10 flex-shrink-0 bg-primary/10 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-primary dark:text-blue-400">
                                        <reason.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{reason.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{reason.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <SeasonalInquiryForm
                            property={websiteData.property}
                            roomOptions={formRoomOptions}
                            seasonOptions={BOOKING_WINDOWS.map((w) => w.label)}
                        />
                    </div>
                </div>
            </section>

            {/* Room options */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="seasonal-rooms-heading">
                <h2 id="seasonal-rooms-heading" className="font-display text-page-title text-navy dark:text-white mb-8 text-center">
                    The Rooms
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map(({ room, label, rates }) => (
                        <div
                            key={room.id}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col"
                        >
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src={room.images[0]}
                                    alt={room.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{label}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    {room.bedType} · Sleeps up to {room.maxOccupancy}
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">{room.shortDescription}</p>
                                <div className="flex items-end justify-between">
                                    <dl className="text-sm">
                                        {SEASONS.map((season) => (
                                            <div key={season.id} className="flex gap-2">
                                                <dt className="text-slate-500 dark:text-slate-400">{season.name}:</dt>
                                                <dd className="font-bold text-navy dark:text-white">
                                                    {formatSeasonalRate(rates[season.id])}
                                                    {typeof rates[season.id] === 'number' ? '/mo' : ''}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                    <a href="#seasonal-inquiry" className="text-primary font-medium hover:underline">
                                        Inquire
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    )
}
