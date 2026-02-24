import Link from 'next/link'
import { cn } from '../utils/cn'
import StandardCard from './ui/StandardCard'
import ContentSection from './ui/ContentSection'
import { LinkButton } from './ui/Button'
import { Event } from '../types/website'

interface EventsProps {
    limit?: number
    events: Event[]
}

export default function Events({ limit, events }: EventsProps) {
    const isSlider = limit !== undefined;
    const displayEvents = limit ? events.slice(0, limit) : events;

    if (!events || events.length === 0) return null;

    const eventItems = displayEvents.map((event: Event) => (
        <StandardCard
            key={event.id}
            image={event.image}
            subtitle={event.date}
            title={event.title}
            description={event.description || ""}
            actions={
                <Link href={`/events#${event.id}`} className="text-mountain-blue hover:text-navy dark:hover:text-white font-medium transition-colors flex items-center">
                    Event Details <span className="ml-1">→</span>
                </Link>
            }
        />
    ))

    return (
        <ContentSection
            id="events"
            className={cn("transition-colors duration-300", isSlider ? "py-20 bg-white dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800" : "pb-20 pt-4 md:pt-8 bg-transparent")}
            isCarousel={isSlider}
            items={eventItems}
            header={{
                label: "Local Happenings",
                title: isSlider ? "Upcoming Events" : "Events Calendar",
                subtitle: isSlider
                    ? "Discover what's happening around North Woodstock and the White Mountains."
                    : "Join us for local festivals, seasonal celebrations, and community gatherings."
            }}
            viewAllLink={isSlider && events.length > limit ? { href: "/events", text: "View All Events" } : undefined}
            carouselItemClassName="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 flex"
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        />
    )
}
