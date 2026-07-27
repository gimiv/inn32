import type { Metadata } from 'next'
import BookingRouteLauncher from '../../components/BookingRouteLauncher'
import { canonicalUrl } from '../../lib/seo'

export const metadata: Metadata = {
    title: 'Book Your Stay',
    description: 'Check availability and book your stay directly with Inn 32 in North Woodstock, New Hampshire.',
    alternates: { canonical: canonicalUrl('/booking') },
    robots: { index: false, follow: true },
}

export default function BookingPage() {
    return <BookingRouteLauncher />
}
