import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import RoomList from '../components/RoomList'
import Offers from '../components/Offers'
import Amenities from '../components/Amenities'
import ThingsToDo from '../components/ThingsToDo'
import Events from '../components/Events'
import SEO from '../components/SEO'
import Blog from '../components/Blog'
import SocialReel from '../components/SocialReel'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import { websiteData } from '../data/website-data'

export default function Home() {
    const location = useLocation()

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const id = location.state.scrollTo
            setTimeout(() => {
                const element = document.getElementById(id)
                if (element) {
                    const navHeight = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            }, 100)
        } else {
            window.scrollTo(0, 0)
        }
    }, [location])

    return (
        <>
            <SEO
                title="Boutique Hotel in North Woodstock, NH"
                description="Experience the charm of the White Mountains at Inn 32. Modern comfort meets rustic elegance in the heart of North Woodstock, New Hampshire."
            />
            <Hero hero={websiteData.sections.hero} />
            <RoomList limit={3} />
            <Offers />
            <Gallery gallery={websiteData.gallery} />
            <Amenities limit={6} />
            <ThingsToDo limit={4} showFilters={true} />
            <Events limit={4} />
            <Blog limit={3} />
            <SocialReel />
            <Location property={websiteData.property} />
        </>
    )
}
