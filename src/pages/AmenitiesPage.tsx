import Amenities from '../components/Amenities'
import SEO from '../components/SEO'

export default function AmenitiesPage() {
    return (
        <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <SEO
                title="Hotel Amenities & Services"
                description="Enjoy our premium amenities including complimentary breakfast, high-speed Wi-Fi, and cozy common areas."
            />
            <div className="container mx-auto px-4 py-8">
                <Amenities />
            </div>
        </div>
    )
}
