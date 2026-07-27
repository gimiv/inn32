import Image from 'next/image'
import SectionHeader from './ui/SectionHeader'
import { LinkButton } from './ui/Button'
import { ExperienceHighlight } from '../data/guest-content'

interface ExperienceHighlightsProps {
    highlights: ExperienceHighlight[]
    header?: {
        label: string
        title: string
        subtitle?: string
    }
    viewAllLink?: {
        href: string
        text: string
    }
}

export default function ExperienceHighlights({ highlights, header, viewAllLink }: ExperienceHighlightsProps) {
    if (!highlights || highlights.length === 0) return null

    return (
        <section id="experience" className="py-14 md:py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {header && (
                    <SectionHeader
                        label={header.label}
                        title={header.title}
                        subtitle={header.subtitle}
                    />
                )}
                <div
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0 auto-rows-fr"
                    tabIndex={0}
                    role="region"
                    aria-label="Inn 32 experience highlights"
                >
                    {highlights.map((highlight) => (
                        <article
                            key={highlight.id}
                            className="snap-start flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-auto bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all h-full flex flex-col"
                        >
                            <div className="relative aspect-[16/10]">
                                <Image
                                    src={highlight.image}
                                    alt={highlight.imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 84vw, (max-width: 1024px) 46vw, 25vw"
                                />
                            </div>
                            <div className="p-5 flex-grow">
                                <h3 className="font-display text-lg text-navy dark:text-white mb-2 tracking-wide">{highlight.title}</h3>
                                <p className="font-sans text-charcoal dark:text-gray-300 leading-relaxed text-sm">{highlight.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
                {viewAllLink && (
                    <div className="mt-8 text-center">
                        <LinkButton href={viewAllLink.href} variant="outline">
                            {viewAllLink.text}
                        </LinkButton>
                    </div>
                )}
            </div>
        </section>
    )
}
