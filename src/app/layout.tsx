import type { Metadata } from 'next'
import { DM_Serif_Display, Outfit, Lora } from 'next/font/google'
import '../index.css'
import { ThemeProvider } from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { websiteData } from '../data/website-data'
import Script from 'next/script'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-display' })
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
    title: {
        template: `%s | ${websiteData.property.name}`,
        default: `${websiteData.property.name} | ${websiteData.property.tagline}`,
    },
    description: websiteData.property.description,
    keywords: ["Boutique Hotel", "North Woodstock NH", "White Mountains", "Franconia Notch", "Lodging", "Inn"],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://inn32.com',
        title: websiteData.property.name,
        description: websiteData.property.description,
        siteName: websiteData.property.name,
        images: [
            {
                url: websiteData.websiteConfig.socialImage,
                width: 1200,
                height: 630,
                alt: websiteData.property.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: websiteData.property.name,
        description: websiteData.property.description,
        images: [websiteData.websiteConfig.socialImage],
    },
    manifest: '/site.webmanifest',
    alternates: {
        canonical: 'https://inn32.com',
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
        "image": websiteData.websiteConfig.socialImage,
        "description": websiteData.property.description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": websiteData.property.address.street,
            "addressLocality": websiteData.property.address.city,
            "addressRegion": websiteData.property.address.state,
            "postalCode": websiteData.property.address.zip,
            "addressCountry": "US"
        },
        "telephone": websiteData.property.contact.phone,
        "url": "https://inn32.com",
        "priceRange": "$$"
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
                {/* Mews Booking Engine */}
                <Script
                    src="https://app.mews.com/distributor/distributor.min.js"
                    strategy="lazyOnload"
                />
                <ThemeProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navigation />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
