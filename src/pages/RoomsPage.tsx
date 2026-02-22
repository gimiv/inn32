import RoomList from '../components/RoomList'
import SEO from '../components/SEO'


export default function RoomsPage() {
    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <SEO
                title="Luxury Rooms & Suites"
                description="Choose from our selection of beautifully appointed rooms and suites. Perfect for couples, families, and solo travelers."
            />
            <div className="container mx-auto px-4 py-8">
                <RoomList />
            </div>
        </div>
    )
}
