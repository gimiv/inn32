import ThingsToDo from '../components/ThingsToDo'
import SEO from '../components/SEO'

export default function ThingsToDoPage() {
    return (
        <div className="pt-24">
            <SEO
                title="Things To Do in North Woodstock"
                description="Explore the best attractions, hiking trails, and activities near Inn 32 in the White Mountains."
            />
            <div className="container mx-auto px-4 py-8">
                <ThingsToDo showFilters={true} />
            </div>
        </div>
    )
}
