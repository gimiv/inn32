import { cn } from '../utils/cn'
import ContentSection from './ui/ContentSection'
import RoomCard from './ui/RoomCard'
import { RoomType } from '../types/website'

interface RoomListProps {
    limit?: number
    roomTypes: RoomType[]
}

export default function RoomList({ limit, roomTypes }: RoomListProps) {
    const roomItems = roomTypes.map((room) => (
        <RoomCard key={room.id} room={room} />
    ))

    return (
        <ContentSection
            id="rooms"
            className={cn("transition-colors duration-300", limit ? "py-20 bg-cream dark:bg-slate-800/50" : "pb-20 pt-4 md:pt-8 bg-transparent")}
            isCarousel={!!limit}
            items={roomItems}
            header={{
                label: "Stay With Us",
                title: "Our Rooms",
                subtitle: "Discover comfort and style in our newly renovated accommodations."
            }}
            viewAllLink={limit ? { href: "/rooms", text: "View All Rooms", variant: "navy" } : undefined}
            carouselItemClassName="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
            gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        />
    )
}
