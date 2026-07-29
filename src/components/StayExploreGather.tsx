import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface IntentPanel {
    id: string
    label: string
    title: string
    description: string
    href: string
    linkText: string
    image: string
    imageAlt: string
}

const PANELS: IntentPanel[] = [
    {
        id: 'stay',
        label: 'Stay',
        title: 'Rooms & apartments',
        description: '24 rooms reimagined in 2025, from compact rooms for two to multi-bedroom apartments.',
        href: '/rooms',
        linkText: 'Browse rooms',
        image: '/gallery/room04-1.webp',
        imageAlt: 'Renovated Double Queen guest room at Inn 32 in North Woodstock',
    },
    {
        id: 'explore',
        label: 'Explore',
        title: 'White Mountains basecamp',
        description: 'Hiking, rivers, and the Kancamagus Highway sit alongside the walkable Main Street village.',
        href: '/things-to-do',
        linkText: 'See things to do',
        image: '/gallery/kancamagus.webp',
        imageAlt: 'Kancamagus Highway scenic overlook near Inn 32 in the White Mountains',
    },
    {
        id: 'gather',
        label: 'Gather',
        title: 'Group stays & buyouts',
        description: 'Take over the whole inn for weddings, reunions, and friend-group getaways.',
        href: '/groups',
        linkText: 'Plan a group stay',
        image: '/gallery/pool-firepit-night-.webp',
        imageAlt: 'Evening fire pit gathering area at Inn 32',
    },
]

export default function StayExploreGather() {
    return (
        <section aria-labelledby="stay-explore-gather-heading" className="bg-linen py-14 md:py-16 dark:bg-slate-900 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 id="stay-explore-gather-heading" className="sr-only">Stay, explore, and gather at Inn 32</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {PANELS.map((panel) => (
                        <Link
                            key={panel.id}
                            href={panel.href}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={panel.image}
                                    alt={panel.imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 767px) 100vw, 33vw"
                                />
                            </div>
                            <div className="flex flex-grow flex-col p-6">
                                <span className="font-sans text-sm font-semibold uppercase tracking-wider text-rust">
                                    {panel.label}
                                </span>
                                <h3 className="mt-1 font-display text-xl text-spruce dark:text-white">{panel.title}</h3>
                                <p className="mt-2 flex-grow font-sans text-sm leading-relaxed text-charcoal dark:text-gray-300">
                                    {panel.description}
                                </p>
                                <span className="mt-4 inline-flex items-center font-sans font-medium text-rust group-hover:underline">
                                    {panel.linkText}
                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
