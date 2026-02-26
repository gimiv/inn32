import { cn } from '../utils/cn'
import ImageCard from './ui/ImageCard'
import ContentSection from './ui/ContentSection'
import ThingsToDoInteractive from './ui/ThingsToDoInteractive'
import { ThingToDo } from '../types/website'

interface ThingsToDoProps {
    limit?: number
    showFilters?: boolean
    thingsToDo: ThingToDo[]
}

export default function ThingsToDo({ limit, showFilters = true, thingsToDo }: ThingsToDoProps) {

    // Feature limited slice for home page slider
    const displayItems = limit ? thingsToDo.slice(0, limit) : thingsToDo;

    if (!thingsToDo || thingsToDo.length === 0) return null;

    if (limit) {
        // Render simple carousel view for home page
        const items = displayItems.map((item) => (
            <ImageCard
                key={item.id}
                href={item.link || "/things-to-do"}
                image={item.image}
                title={item.name}
                subtitle={item.category}
                description={item.description}
            />
        ))

        return (
            <ContentSection
                id="things-to-do"
                className="transition-colors duration-300 py-20 bg-cream dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800"
                isCarousel={true}
                items={items}
                header={{
                    label: "Explore The Area",
                    title: "Things To Do",
                    subtitle: "North Woodstock is your gateway to the White Mountains."
                }}
                viewAllLink={{ href: "/things-to-do", text: "See All Activities" }}
                carouselItemClassName="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_28%] min-w-0 flex"
                gridClassName=""
            />
        )
    }

    // Render interactive grid view with filters for dedicated page
    return (
        <section id="things-to-do" className="transition-colors duration-300 bg-transparent">
            {showFilters && (
                <ThingsToDoInteractive thingsToDo={thingsToDo} />
            )}
        </section>
    )
}
