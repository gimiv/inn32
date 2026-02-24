export interface Property {
    id: string
    name: string
    tagline: string
    description: string
    checkInTime: string
    checkOutTime: string
    contact: {
        phone: string
        email: string
        instagram?: string
    }
    address: {
        street: string
        city: string
        state: string
        zip: string
        country: string
        coordinates: {
            lat: number
            lng: number
        }
    }
}

export interface WebsiteConfig {
    theme: string
    primaryColor: string
    secondaryColor?: string
    fontFamily: string
    metaTitle: string
    metaDescription: string
    socialImage: string
    customDomain?: string
}

export interface SectionContent {
    heading?: string
    subheading?: string
    description?: string
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    backgroundImage?: string
    backgroundVideo?: string // kept for backward compatibility if needed, though we will prefer the array
    backgroundVideos?: string[]
    [key: string]: any
}

export interface SectionConfig {
    id: string
    enabled: boolean
    order: number
    title: string
    content: SectionContent
}

export interface Sections {
    hero: SectionConfig
    rooms: SectionConfig
    amenities: SectionConfig
    thingsToDo: SectionConfig
    events: SectionConfig
    reviews: SectionConfig
    gallery: SectionConfig
    location: SectionConfig
    [key: string]: SectionConfig
}

export interface RoomType {
    id: string
    name: string
    shortDescription: string
    basePrice: number
    currency: string
    maxOccupancy: number
    bedType: string
    images: string[]
    amenities: string[]
    available: boolean
}

export interface Amenity {
    id: string
    name: string
    icon: string
    category: string
}

export interface ThingToDo {
    id: string
    name: string
    category: string
    distance?: string
    image: string
    description: string
    link?: string
}

export interface Event {
    id: string
    title: string
    date: string
    location: string
    image: string
    description?: string
    isFeatured?: boolean
    customLabel?: string
}

export interface BlogPost {
    id: string
    title: string
    excerpt: string
    date: string
    image: string
    author?: string
    slug: string
    content?: string
}

export interface Review {
    id: string
    author: string
    rating: number
    date: string
    text: string
    source: string
}

export interface Promotion {
    id: string
    name: string
    description: string
    code: string
    featured: boolean
}

export interface GalleryImage {
    id: string
    url: string
    alt: string
    category: string
}

export interface SocialPost {
    id: string
    image: string
    caption: string
    platform: 'instagram' | 'facebook' | 'tiktok'
    link: string
}

export interface GuestWebsiteProps {
    property: Property
    websiteConfig: WebsiteConfig
    sections: Sections
    roomTypes: RoomType[]
    amenities: Amenity[]
    thingsToDo: ThingToDo[]
    events: Event[]
    blogPosts: BlogPost[]
    socialPosts: SocialPost[]
    reviews: Review[]
    promotions: Promotion[]
    gallery: GalleryImage[]
    offers: Offer[]
}

export interface Offer {
    id: string
    title: string
    description: string
    image: string
    validUntil?: string
    minStay?: number
    promoCode?: string
}
