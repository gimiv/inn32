import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, Outfit, Lora } from 'next/font/google'
import '../index.css'
import { ThemeProvider } from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { websiteData } from '../data/website-data'
import Script from 'next/script'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
}

export const metadata: Metadata = {
    metadataBase: new URL('https://inn32.com'),
    title: {
        template: `%s | ${websiteData.property.name} — North Woodstock, NH`,
        default: `${websiteData.property.name} | Boutique Hotel in North Woodstock, NH — White Mountains Lodging`,
    },
    description: "Inn 32 is a newly revitalized boutique hotel in North Woodstock, New Hampshire — minutes from Franconia Notch, Loon Mountain, and the White Mountain National Forest. Modern comforts, vintage charm, 24 rooms from $79/night.",
    keywords: ["Boutique Hotel", "North Woodstock NH", "White Mountains", "Franconia Notch", "Lodging", "Inn", "Loon Mountain", "New Hampshire Hotel", "White Mountain National Forest", "NH Lodging"],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://inn32.com',
        title: `${websiteData.property.name} — Boutique Hotel in North Woodstock, NH`,
        description: "Newly revitalized boutique hotel in the heart of the White Mountains. 24 rooms from $79/night, minutes from Franconia Notch and Loon Mountain.",
        siteName: websiteData.property.name,
        images: [
            {
                url: '/gallery/front-view.webp',
                width: 1200,
                height: 630,
                alt: 'Inn 32 boutique hotel exterior in North Woodstock, New Hampshire',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${websiteData.property.name} — Boutique Hotel in the White Mountains`,
        description: "Newly revitalized boutique hotel in North Woodstock, NH. 24 rooms from $79/night, minutes from Franconia Notch.",
        images: ['/gallery/front-view.webp'],
    },
    manifest: '/site.webmanifest',
    other: {
        'geo.region': 'US-NH',
        'geo.placename': 'North Woodstock',
        'geo.position': '44.0281;-71.6817',
        'ICBM': '44.0281, -71.6817',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const themeConfig = websiteData.websiteConfig

    const inlineStyles = `
        :root {
            --color-primary: ${themeConfig.primaryColor};
            --color-secondary: ${themeConfig.secondaryColor};
            --color-accent: ${themeConfig.primaryColor};
        }
    `

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": websiteData.property.name,
        "description": websiteData.property.description,
        "url": "https://inn32.com",
        "telephone": websiteData.property.contact.phone,
        "email": websiteData.property.contact.email,
        "image": [
            "https://inn32.com/gallery/front-view.webp",
            "https://inn32.com/gallery/pool-firepit-night-.webp",
            "https://inn32.com/gallery/river-entry.webp",
            "https://inn32.com/gallery/living-room-01--1-.webp"
        ],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": websiteData.property.address.street,
            "addressLocality": websiteData.property.address.city,
            "addressRegion": websiteData.property.address.state,
            "postalCode": websiteData.property.address.zip,
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": websiteData.property.address.coordinates.lat,
            "longitude": websiteData.property.address.coordinates.lng
        },
        "checkinTime": "15:00",
        "checkoutTime": "11:00",
        "numberOfRooms": 24,
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Credit Card, Debit Card",
        "amenityFeature": websiteData.amenities.map(a => ({
            "@type": "LocationFeatureSpecification",
            "name": a.name,
            "value": true
        })),
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": String(websiteData.reviews.length),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": websiteData.reviews.slice(0, 5).map(r => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": r.author },
            "reviewRating": { "@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5" },
            "datePublished": r.date,
            "reviewBody": r.text
        })),
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Room Types",
            "itemListElement": websiteData.roomTypes.map(room => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "HotelRoom",
                    "name": room.name,
                    "description": room.shortDescription,
                    "bed": { "@type": "BedDetails", "typeOfBed": room.bedType, "numberOfBeds": 1 },
                    "occupancy": { "@type": "QuantitativeValue", "maxValue": room.maxOccupancy }
                },
                "price": String(room.basePrice),
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            }))
        },
        "sameAs": [
            "https://instagram.com/inn32nh"
        ],
        "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "White Mountains, New Hampshire"
        },
        "tourBookingPage": "https://inn32.com"
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/inn32-favicon-32.png" type="image/png" sizes="32x32" />
                <link rel="icon" href="/inn32-favicon-16.png" type="image/png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${outfit.variable} ${dmSerif.variable} ${lora.variable} font-sans antialiased text-gray-900 bg-white dark:bg-slate-900 dark:text-gray-100 transition-colors duration-300`}>
                <GoogleTagManager gtmId="GTM-TTL7KR6Q" />
                <GoogleAnalytics gaId="G-FGY7MWEYHF" />
                {/* Mews Booking Engine */}
                <Script
                    src="https://app.mews.com/distributor/distributor.min.js"
                    strategy="lazyOnload"
                />
                <ThemeProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navigation property={websiteData.property} />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer property={websiteData.property} />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
