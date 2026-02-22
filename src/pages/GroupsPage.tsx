import { useEffect } from 'react'
import GroupReservations from '../components/GroupReservations'
import SEO from '../components/SEO'

export default function GroupsPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SEO
                title="Group Reservations & Private Events"
                description="Host your wedding, family reunion, or corporate retreat at Inn 32. Full property buyouts and group rates available."
            />

            <main className="pt-24 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
                <GroupReservations />
            </main>
        </>
    )
}
