import type { Metadata } from 'next'
import PageLayout from '../../components/ui/PageLayout'
import { canonicalUrl } from '../../lib/seo'

const TITLE = 'Privacy Policy'
const DESCRIPTION = 'How Inn 32 handles information submitted through its website and third-party booking services.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: canonicalUrl('/privacy') },
    openGraph: {
        url: canonicalUrl('/privacy'),
        title: TITLE,
        description: DESCRIPTION,
        images: [{ url: canonicalUrl('/gallery/front-view.webp'), width: 1200, height: 630, alt: 'Inn 32 in North Woodstock, New Hampshire' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [canonicalUrl('/gallery/front-view.webp')],
    },
}

export default function PrivacyPage() {
    return (
        <PageLayout
            title="Privacy Policy"
            subtitle="How information is handled when you use the Inn 32 website."
        >
            <div className="mx-auto max-w-3xl space-y-8 px-4 py-16 text-charcoal dark:text-gray-200 sm:px-6 lg:px-8">
                <p className="text-sm text-gray-600 dark:text-gray-300">Last updated July 26, 2026.</p>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Information you provide</h2>
                    <p>When you submit a group inquiry, we receive the contact and event details you choose to provide so the property can respond. Please do not submit payment-card or other sensitive information through the inquiry form.</p>
                </section>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Bookings</h2>
                    <p>Online bookings are processed by Mews. Information entered in the Mews booking experience is handled under the notices and terms presented in that service.</p>
                </section>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Service providers and site data</h2>
                    <p>We may use service providers for group inquiry email delivery, website hosting, analytics, maps, and booking functionality. Those providers receive only the information needed to provide their service. Basic technical information such as browser type, device information, and pages visited may be processed for security and site analytics.</p>
                </section>

                <section className="space-y-3">
                    <h2 className="font-display text-2xl text-navy dark:text-white">Questions and requests</h2>
                    <p>To ask about information you submitted through this site, email <a className="font-medium text-blue-700 underline underline-offset-4 dark:text-sky-300" href="mailto:info@inn32.com">info@inn32.com</a> or call <a className="font-medium text-blue-700 underline underline-offset-4 dark:text-sky-300" href="tel:+16038254790">(603) 825-4790</a>.</p>
                </section>
            </div>
        </PageLayout>
    )
}
