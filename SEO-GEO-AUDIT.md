# Inn 32 — SEO & GEO Audit

**Date:** February 24, 2026
**Scope:** Full codebase review for search engine optimization (SEO) and generative engine optimization (GEO)

---

## Summary

The site has solid foundations — metadata on every page, structured data in the layout, `next/image` throughout, semantic HTML, and a clean URL structure. But there are meaningful gaps that will hold back both traditional search rankings and AI-generated answer visibility. This audit identifies **18 findings** across 6 categories, ranked by impact.

---

## 1. Crawlability & Indexing

### 1.1 — No `robots.txt` (Critical)

**Status:** Missing
**Impact:** Without `robots.txt`, search engines have no crawl guidance. While they'll still index, you lose control over crawl budget and can't block irrelevant paths.

**Fix:** Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://inn32.com/sitemap.xml
```

### 1.2 — No Sitemap (Critical)

**Status:** Missing
**Impact:** Search engines (and AI crawlers like GPTBot, Anthropic's Claude-Web) rely on sitemaps to discover and prioritize pages. Without one, interior pages like `/blog/[slug]`, `/rooms`, `/things-to-do` may take weeks to be discovered. This also directly impacts GEO — AI models typically consume sitemaps to understand site structure.

**Fix:** Next.js 13+ supports `app/sitemap.ts` natively. Create one that dynamically generates from `websiteData`:
```typescript
// app/sitemap.ts
export default function sitemap() {
  return [
    { url: 'https://inn32.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://inn32.com/rooms', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://inn32.com/offers', ... },
    { url: 'https://inn32.com/amenities', ... },
    { url: 'https://inn32.com/things-to-do', ... },
    { url: 'https://inn32.com/events', ... },
    { url: 'https://inn32.com/groups', ... },
    { url: 'https://inn32.com/blog', ... },
    { url: 'https://inn32.com/location', ... },
    // Dynamic blog posts
    ...websiteData.blogPosts.map(post => ({
      url: `https://inn32.com/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
  ]
}
```

### 1.3 — No Per-Page Canonical Tags (Medium)

**Status:** Only the root layout sets `alternates.canonical` to `https://inn32.com`. Interior pages have no canonical.
**Impact:** Duplicate content risk if pages are accessed via query params (e.g., `/things-to-do?category=Hiking`). The `ThingsToDoInteractive` component puts category into URL params, creating indexable parameter variants.

**Fix:** Add `alternates.canonical` to each page's metadata export, or add a global canonical in `layout.tsx` using the `metadataBase` config:
```typescript
// layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://inn32.com'),
  // ... rest
}
```
This enables Next.js to automatically resolve relative canonical URLs for all pages.

---

## 2. Metadata Quality

### 2.1 — Duplicate Title Pattern on Homepage (Medium)

**Status:** Both `layout.tsx` and `page.tsx` export metadata with the same title pattern:
- Layout default: `"Inn 32 | Refined & Reopened"`
- Page: `"Inn 32 | Refined & Reopened"`

**Impact:** The layout template `%s | Inn 32` is designed to prepend page titles, but the homepage overrides it with a duplicate. Also, the homepage title doesn't contain any location keywords.

**Fix:** Set the homepage title to something keyword-rich:
```typescript
// page.tsx
export const metadata: Metadata = {
  title: "Boutique Hotel in North Woodstock, NH | White Mountains Lodging",
  description: "...",
}
```

### 2.2 — Page Descriptions Missing Location Keywords (Medium)

**Status:** Several pages have generic descriptions:
- Rooms: `"Browse our fully renovated rooms and suites at Inn 32."` — no "North Woodstock" or "White Mountains"
- Amenities: `"Enjoy our premium amenities..."` — no location
- Events: `"Discover what's happening at Inn 32..."` — uses dynamic name but no geo signal
- Things To Do: `"Explore attractions, dining, and activities near Inn 32."` — weak geo

**Impact:** Google uses meta descriptions for snippet generation and relevance scoring. AI engines use them for entity grounding. Without location signals, the pages compete poorly for geo-modified queries like "hotels in North Woodstock NH" or "things to do near Franconia Notch."

**Fix:** Every page description should include "North Woodstock, NH" or "White Mountains" at minimum.

### 2.3 — Missing `<meta name="geo.*">` Tags (Low)

**Status:** No geo meta tags present.
**Impact:** While not a major ranking factor, geo meta tags help local search and AI models confirm physical location.

**Fix:** Add to `layout.tsx` `<head>`:
```html
<meta name="geo.region" content="US-NH" />
<meta name="geo.placename" content="North Woodstock" />
<meta name="geo.position" content="44.0281;-71.6817" />
<meta name="ICBM" content="44.0281, -71.6817" />
```

---

## 3. Structured Data (JSON-LD)

### 3.1 — LodgingBusiness Schema is Minimal (High)

**Status:** The root layout includes a basic `LodgingBusiness` schema with name, image, description, address, phone, url, and priceRange. Missing:
- `amenityFeature` — list of amenities
- `checkinTime` / `checkoutTime`
- `numberOfRooms`
- `aggregateRating` — from reviews data
- `hasOfferCatalog` — room types with pricing
- `geo` — lat/lng coordinates
- `sameAs` — social media links
- `image` array — multiple property images

**Impact:** Rich structured data is the #1 driver for appearing in Google Hotel Pack results and for AI-generated hotel recommendations. An incomplete schema means Google's knowledge panel, rich snippets, and AI overviews will pull less data from your site and may prefer competitors.

**Fix:** Expand the JSON-LD significantly:
```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Inn 32",
  "description": "...",
  "url": "https://inn32.com",
  "telephone": "(603) 745-2416",
  "email": "info@inn32.com",
  "address": { ... },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 44.0281,
    "longitude": -71.6817
  },
  "checkinTime": "15:00",
  "checkoutTime": "11:00",
  "numberOfRooms": 24,
  "priceRange": "$$",
  "starRating": { "@type": "Rating", "ratingValue": "3" },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5"
  },
  "image": [
    "https://inn32.com/gallery/front-view.webp",
    "https://inn32.com/gallery/pool-firepit-night-.webp"
  ],
  "sameAs": [
    "https://instagram.com/inn32nh"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Room Types",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "HotelRoom",
          "name": "...",
          "description": "..."
        },
        "price": "...",
        "priceCurrency": "USD"
      }
    ]
  }
}
```

### 3.2 — No Page-Level Structured Data (High)

**Status:** Only the root layout has JSON-LD. No individual pages add their own schemas.

**Impact:** Page-level schemas dramatically improve visibility:
- **Blog posts** → `Article` schema (author, datePublished, image)
- **Events** → `Event` schema (date, location, description)
- **Rooms** → `HotelRoom` or `Product` schema (price, availability)
- **Reviews** → `Review` schema (individual reviews, not just aggregate)
- **FAQs/Groups** → `FAQPage` schema
- **Things To Do** → `TouristAttraction` schema for local activities

These are the schemas that AI engines like Google's AI Overview, Bing Copilot, and Perplexity consume when generating travel recommendations.

**Fix:** Add `generateMetadata` or inline `<script type="application/ld+json">` to each page type.

### 3.3 — Social Image is a Stock Photo URL (Low)

**Status:** `websiteData.websiteConfig.socialImage` points to `images.unsplash.com/...`
**Impact:** Open Graph images should be self-hosted for reliability and branding. External URLs can break if Unsplash changes CDN paths, and some social platforms prefer same-domain images.

**Fix:** Download and self-host as `/og-image.jpg` in `public/`, then reference it.

---

## 4. Content & Heading Hierarchy

### 4.1 — Multiple H1 Tags on the Homepage (Medium)

**Status:** The homepage renders:
- `Hero.tsx` → `<h1>` "Your White Mountains Gateway"
- `PageHeader.tsx` → `<h1>` (used by interior pages, not homepage — OK)
- But `SectionHeader.tsx` uses `<h2>` for all sections — this is correct.

However, every interior page gets an `<h1>` from `PageHeader` AND the section components render their own `<h2>` tags. This hierarchy is clean.

**Status:** Pass ✓ — heading hierarchy is correct.

### 4.2 — Blog Posts Lack Internal Linking and Content Depth (High — GEO)

**Status:** The blog post page reads markdown from `src/content/blog/`, but no markdown files exist yet. Posts fall back to `post.content` from the data file, which appears to be empty or minimal.

**Impact:** Blog content is the #1 GEO lever for hotels. AI models learn about properties through long-form content that answers traveler questions. Empty blog posts provide zero value for both search and AI indexing.

**Fix:** Create actual markdown content for each blog slug. Each post should:
- Be 800–1500 words
- Include internal links to relevant pages (`/rooms`, `/things-to-do`, `/location`)
- Answer specific traveler queries (e.g., "best hiking near North Woodstock NH")
- Include the property name, location, and amenities naturally
- Use semantic headings (H2, H3) for key topics

### 4.3 — Thin Content on Interior Pages (Medium — GEO)

**Status:** Pages like `/rooms`, `/amenities`, `/events` are pure listing pages with no introductory copy beyond the `PageHeader` subtitle. The data comes entirely from card grids.

**Impact:** AI engines need prose context to understand what a page is about. A grid of cards with 1-sentence descriptions gives very little for AI to cite when answering queries like "what amenities does Inn 32 offer?" or "what are the rooms like at Inn 32?"

**Fix:** Add a 2–3 sentence introductory paragraph below each `PageHeader` and above the grid. This content should be unique, keyword-rich prose — not just the subtitle repeated.

---

## 5. Image SEO

### 5.1 — Gallery Filenames Are Not SEO-Friendly (Low)

**Status:** Gallery images have inconsistent naming: `Bedroom_01.webp`, `Detail_Couch.webp`, `Room03_Bath.webp`, `pool-firepit-night-.webp`, `2026 girlfriends weekend spring fling.webp` (spaces in filename).

**Impact:** Search engines use image filenames as a ranking signal. Spaces in filenames can cause URL encoding issues. Descriptive, hyphenated filenames improve image search visibility.

**Fix:** Rename images to follow a consistent pattern: `inn32-[room/area]-[descriptor].webp`. Example: `inn32-bedroom-king-suite.webp`, `inn32-pool-firepit-evening.webp`.

### 5.2 — Missing `sizes` on Groups Page Images (Low)

**Status:** The three images on `/groups` use `next/image` with `fill` but no `sizes` prop.

**Fix:** Add `sizes="(max-width: 768px) 100vw, 33vw"` to each.

### 5.3 — LightboxGallery Alt Tags Are Generic (Low)

**Status:** `LightboxGallery.tsx` line 104: `alt={`Gallery image ${index + 1}`}`.
**Impact:** These are the full-screen images users see. Descriptive alt text improves image search and accessibility.

**Fix:** Pass the actual alt text array from `Gallery.tsx` into `LightboxGallery` instead of just URLs.

---

## 6. GEO-Specific (Generative Engine Optimization)

### 6.1 — No FAQ Content or Schema (High)

**Status:** The site has no FAQ section on any page.
**Impact:** FAQs are the highest-converting GEO content type. AI engines frequently pull FAQ-style answers for queries like "does Inn 32 have parking?", "is Inn 32 pet friendly?", "how far is Inn 32 from Franconia Notch?". Without FAQ content, AI models have to infer answers from scattered page content — or skip you entirely.

**Fix:** Add an FAQ section to the homepage or a dedicated `/faq` page with `FAQPage` schema markup. Target 10–15 common traveler questions.

### 6.2 — No "About" or "Story" Content (Medium)

**Status:** The property description is a single paragraph in the data file. There's no dedicated about page or expanded brand story.
**Impact:** AI models build entity profiles from narrative content. A rich "About Inn 32" section helps AI engines confidently describe the property in generated answers. This is especially important for establishing E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).

**Fix:** Add an `/about` page with the property's renovation story, team, philosophy, and connection to the community.

### 6.3 — No Explicit Entity Relationships (Medium)

**Status:** The site mentions "Franconia Notch," "White Mountains," "North Woodstock" in scattered places, but doesn't make these relationships explicit in a way AI models can reliably extract.
**Impact:** GEO depends on entity co-occurrence. AI models deciding which hotels to recommend for "White Mountains getaway" need to confidently associate Inn 32 with these landmarks.

**Fix:**
- Ensure every page mentions the property's location at least once
- Blog content should name specific landmarks, trails, restaurants with distances
- Structured data should include `containedInPlace` and `nearbyAttraction` relationships
- The Things To Do data already has this — make sure it's crawlable as prose, not just card titles

### 6.4 — Social Proof Not Machine-Readable (Medium)

**Status:** Reviews are rendered as visual cards but have no `Review` schema markup. The aggregate isn't in structured data either.
**Impact:** When an AI engine processes "Inn 32 reviews," it has to parse your HTML cards. With schema markup, it can directly consume rating, author, date, and text — making it far more likely to cite your reviews in generated answers.

**Fix:** Add `Review` schema for individual reviews and `AggregateRating` in the `LodgingBusiness` schema (see 3.1 above).

---

## Priority Matrix

| Priority | Issue | Category |
|----------|-------|----------|
| 🔴 Critical | 1.1 No robots.txt | Crawlability |
| 🔴 Critical | 1.2 No sitemap | Crawlability |
| 🔴 High | 3.1 Minimal LodgingBusiness schema | Structured Data |
| 🔴 High | 3.2 No page-level structured data | Structured Data |
| 🔴 High | 4.2 Blog posts have no content | Content/GEO |
| 🔴 High | 6.1 No FAQ content or schema | GEO |
| 🟡 Medium | 1.3 No per-page canonicals | Crawlability |
| 🟡 Medium | 2.1 Homepage title lacks keywords | Metadata |
| 🟡 Medium | 2.2 Descriptions missing location | Metadata |
| 🟡 Medium | 4.3 Thin interior page content | Content/GEO |
| 🟡 Medium | 6.2 No about/story content | GEO |
| 🟡 Medium | 6.3 Weak entity relationships | GEO |
| 🟡 Medium | 6.4 Reviews not machine-readable | GEO |
| 🟢 Low | 2.3 No geo meta tags | Metadata |
| 🟢 Low | 3.3 Stock photo for OG image | Structured Data |
| 🟢 Low | 5.1 Non-SEO-friendly filenames | Images |
| 🟢 Low | 5.2 Missing sizes on groups page | Images |
| 🟢 Low | 5.3 Generic lightbox alt tags | Images |

---

## What's Already Good

- `next/image` with proper `sizes` across all components
- `lang="en"` on `<html>`
- Open Graph and Twitter Card metadata on root layout
- JSON-LD LodgingBusiness (basic but present)
- Semantic heading hierarchy (H1 → H2 → H3)
- All images have alt text
- Clean URL structure (`/rooms`, `/blog/[slug]`, `/things-to-do`)
- `webmanifest` configured
- GTM and GA4 installed
- Server-rendered pages (good for crawlers)
- `generateStaticParams` on blog slugs (pre-rendered paths)
