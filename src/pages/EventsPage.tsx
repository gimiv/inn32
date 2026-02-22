import { useEffect } from 'react'
import Events from '../components/Events'
import SEO from '../components/SEO'

export default function EventsPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SEO
                title="Local Events & Happenings"
                description="Stay up to date with the latest events, festivals, and activities happening in North Woodstock and Lincoln, NH."
            />

            <main className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 py-8">
                    <Events />
                </div>
            </main>
        </>
    )
}
