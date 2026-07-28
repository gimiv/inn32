import Image from 'next/image'
import { MapPin, Footprints, BedDouble, Mountain } from 'lucide-react'
import { LinkButton } from './ui/Button'

const REASONS = [
    {
        icon: MapPin,
        title: 'Easy to find, easy to reach',
        description: 'Named for Exit 32 on I-93, Inn 32 sits right on Main Street in North Woodstock — free parking waiting outside your room.',
    },
    {
        icon: Footprints,
        title: 'A truly walkable village',
        description: 'Walk to restaurants, local shops, the Woodstock Inn Brewery, and Cascade Park on the Pemigewasset River.',
    },
    {
        icon: BedDouble,
        title: 'Rooms for every kind of trip',
        description: '24 rooms reimagined in 2025 — from compact rooms for two to apartments that sleep up to 8 guests.',
    },
    {
        icon: Mountain,
        title: 'Mountains and river all around',
        description: 'The Pemigewasset River runs through the setting, with Loon Mountain, Franconia Notch, and the Kancamagus Highway nearby.',
    },
]

export default function WhyInn32() {
    return (
        <section id="why-inn-32" aria-labelledby="why-inn-32-heading" className="py-14 md:py-16 bg-slate-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
                    <div className="hidden lg:block relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/gallery/river-entry.webp"
                            alt="Riverside entry area at Inn 32 in North Woodstock, New Hampshire"
                            fill
                            className="object-cover"
                            sizes="42vw"
                        />
                    </div>
                    <div>
                        <span className="font-sans text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2 block">
                            Why Inn 32
                        </span>
                        <h2 id="why-inn-32-heading" className="font-display text-page-title text-navy dark:text-white mb-6">
                            Your Main Street Basecamp in the White Mountains
                        </h2>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                            {REASONS.map((reason) => (
                                <li key={reason.title} className="flex gap-3">
                                    <div className="w-10 h-10 flex-shrink-0 bg-cream dark:bg-slate-700 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center" aria-hidden="true">
                                        <reason.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-lg text-navy dark:text-white mb-1 tracking-wide">{reason.title}</h3>
                                        <p className="font-sans text-charcoal dark:text-gray-300 leading-relaxed text-sm">{reason.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <LinkButton href="/location" variant="outline" size="sm">
                                More About Our Location
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
