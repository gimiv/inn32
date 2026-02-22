import { Helmet } from 'react-helmet-async'
import { websiteData } from '../data/website-data'

interface SEOProps {
    title?: string
    description?: string
    image?: string
    type?: string
    canonicalUrl?: string
}

export default function SEO({
    title,
    description,
    image,
    type = 'website',
    canonicalUrl
}: SEOProps) {
    const { property, websiteConfig } = websiteData

    const siteTitle = title ? `${title} | ${websiteConfig.metaTitle}` : websiteConfig.metaTitle
    const metaDescription = description || websiteConfig.metaDescription
    const metaImage = image || websiteConfig.socialImage
    const siteUrl = 'https://inn32.com' // Should ideally come from config, but hardcoding for now based on user request context or config if available
    const url = canonicalUrl || siteUrl

    // Hotel Schema (JSON-LD)
    const hotelSchema = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": property.name,
        "description": property.description,
        "image": metaImage,
        "telephone": property.contact.phone,
        "email": property.contact.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": property.address.street,
            "addressLocality": property.address.city,
            "addressRegion": property.address.state,
            "postalCode": property.address.zip,
            "addressCountry": property.address.country
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": property.address.coordinates.lat,
            "longitude": property.address.coordinates.lng
        },
        "url": siteUrl,
        "priceRange": "$$$",
        "checkinTime": property.checkInTime,
        "checkoutTime": property.checkOutTime,
        "starRating": {
            "@type": "Rating",
            "ratingValue": "4" // Assumed 4 star based on premium feel, can be adjusted
        }
    }

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Geo Tags */}
            <meta name="geo.region" content={`US-${property.address.state}`} />
            <meta name="geo.placename" content={property.address.city} />
            <meta name="geo.position" content={`${property.address.coordinates.lat};${property.address.coordinates.lng}`} />
            <meta name="ICBM" content={`${property.address.coordinates.lat}, ${property.address.coordinates.lng}`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(hotelSchema)}
            </script>
        </Helmet>
    )
}
