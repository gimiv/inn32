import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { resolveInsiderGuide } from '../data/guest-content'
import { ThingToDo } from '../types/website'

interface InsiderGuideProps {
    thingsToDo: ThingToDo[]
}

/**
 * Compact, intent-based picks resolved from the existing thingsToDo records.
 * The complete photo browser remains below, so this guide avoids duplicating it.
 */
export default function InsiderGuide({ thingsToDo }: InsiderGuideProps) {
    const sections = resolveInsiderGuide(thingsToDo)

    return (
        <section id="insider-guide" aria-labelledby="insider-guide-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="font-sans text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2 block">
                    Plan Your Stay
                </span>
                <h2 id="insider-guide-heading" className="font-display text-page-title text-navy dark:text-white mb-4">
                    Pick Your Kind of Day
                </h2>
                <p className="font-sans text-gray-600 dark:text-gray-300 text-lg">
                    Pick the kind of day you want, then use these shortlists to start planning.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sections.map((section) => (
                    <article
                        key={section.id}
                        aria-labelledby={`guide-${section.id}`}
                        className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm"
                    >
                        <h3 id={`guide-${section.id}`} className="font-display text-2xl text-navy dark:text-white mb-2">
                            {section.title}
                        </h3>
                        <p className="font-sans text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-5">
                            {section.intro}
                        </p>
                        <ul className="divide-y divide-gray-200 dark:divide-slate-700 border-t border-gray-200 dark:border-slate-700">
                            {section.things.map((thing) => (
                                <li key={`${section.id}-${thing.id}`}>
                                    {thing.link ? (
                                        <Link
                                            href={thing.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-3 py-3 text-blue-800 dark:text-blue-300 font-sans font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 rounded-sm"
                                        >
                                            <span>{thing.name}</span>
                                            <span className="sr-only"> (opens in a new tab)</span>
                                            <ArrowUpRight size={17} aria-hidden="true" className="flex-shrink-0" />
                                        </Link>
                                    ) : (
                                        <span className="flex items-center py-3 text-charcoal dark:text-gray-300 font-sans font-medium">
                                            {thing.name}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>

            <p className="mt-10 font-sans text-sm text-gray-500 dark:text-gray-400 text-center max-w-2xl mx-auto">
                Hours and seasonal openings change often in the mountains — please verify current hours and
                seasonality directly with each venue before you head out.
            </p>
        </section>
    )
}
