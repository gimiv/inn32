# Inn 32 Website Audit Report

## Performance Issues

### 1. Images Not Using Next.js `<Image>` Component (Critical)

Almost every component uses raw `<img>` tags instead of Next.js's `<Image>` component. This is the single biggest performance issue on the site.

**Affected components:** StandardCard, ImageCard, Gallery, SocialReel, LightboxGallery, Hero (poster fallback)

Raw `<img>` tags mean you get no automatic lazy loading (except where manually added), no responsive `srcset` generation, no WebP/AVIF conversion, and no image size optimization. On the homepage alone there are 40+ images loading without any of these optimizations.

**Fix:** Replace `<img>` with `next/image` throughout. For the gallery and lightbox where you need `object-cover` on unknown-size images, use `fill` mode with `sizes` prop.

### 2. Google Fonts Loaded via `<link>` Instead of `next/font` (High)

The layout loads three font families (DM Serif Display, Outfit, Lora) via a `<link>` tag in `<head>`, which creates a render-blocking request to Google's servers. Meanwhile, the layout *also* initializes `Inter` and `Playfair_Display` via `next/font/google` but these aren't the fonts the site actually uses.

**Fix:** Remove the `<link>` tag and load DM Serif Display, Outfit, and Lora through `next/font/google` instead. Remove the unused Inter and Playfair imports.

### 3. Every Section Component Is `'use client'` (High)

Nearly every component is marked `'use client'`, which means the entire page is client-rendered. Components like Reviews, Events, Blog, and Amenities are essentially static content displays — they don't need client interactivity unless they're in carousel mode.

**Fix:** Split components into a server-rendered wrapper and a small client carousel sub-component. For example, `Reviews` in grid mode (the /rooms page) needs zero client JS.

### 4. No Scroll Event Throttling in Navigation (Medium)

The Navigation component attaches a raw `scroll` event listener that fires on every pixel of scrolling with no throttling or `requestAnimationFrame` wrapper.

**Fix:** Wrap the scroll handler in `requestAnimationFrame` or use `IntersectionObserver` to detect when the hero section leaves the viewport.

### 5. Mews Script Loaded on Every Page (Medium)

The Mews booking engine script is loaded via `<Script strategy="afterInteractive">` in the root layout, meaning it downloads and executes on every single page, even if the user never clicks "Book Now."

**Fix:** Load Mews lazily — only when the booking widget is first requested via `strategy="lazyOnload"` or dynamic import.

### 6. Framer Motion Bundle Size (Medium)

Framer Motion is imported in ThingsToDo, GroupReservations, and Temperature for relatively simple animations (fade/scale on filter change, scroll-reveal, icon toggle). It adds ~30KB gzipped to the client bundle.

**Fix:** For the filter animation in ThingsToDo, CSS `@starting-style` or `View Transitions API` could replace it. The Temperature icon toggle could use CSS transitions. Reserve Framer Motion only where it provides layout animation that CSS can't.

---

## Component Architecture & Code Quality

### 7. Massive Duplicated Carousel Boilerplate (High)

Every carousel component (RoomList, Reviews, Offers, Events, Blog, Amenities, ThingsToDo) repeats the exact same Embla setup pattern:

```tsx
const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, containScroll: 'trimSnaps' })
const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])
```

This is 7 copies of the same ~10 lines.

**Fix:** Create a `useCarousel` custom hook that returns `{ emblaRef, scrollPrev, scrollNext }` and a `<CarouselSection>` wrapper component that handles the carousel vs. grid toggle, section header, and "View All" link pattern.

### 8. Duplicated Section Header Pattern (High)

Every section repeats the same header structure: an uppercase tracking-wider label, a display font title, a subheading, and a carousel navigation. This block is copied with slight variations 8 times.

**Fix:** Extract a `<SectionHeader>` component that accepts `label`, `title`, `subtitle`, and optional carousel nav props.

### 9. Duplicated "View All" Button Pattern (Medium)

Six components have an identical "View All" CTA button with the same classes: `inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`.

**Fix:** Create a `<Button>` or `<LinkButton>` component with variant props.

### 10. Carousel/Grid Dual-Mode Pattern Not Abstracted (High)

Every section component implements the same pattern: if `limit` prop is present, render a carousel; otherwise render a grid. This conditional logic is duplicated across 7 components with near-identical structure.

**Fix:** Create a generic `<ContentSection>` component that accepts `items`, a `renderItem` function, `limit`, and display configuration. It internally decides between carousel and grid mode.

### 11. `websiteData` Imported Everywhere (Medium)

Almost every component directly imports from `../data/website-data`. This creates tight coupling between display components and the data source. If you ever want to fetch data from a CMS or API, you'd need to refactor every component.

**Fix:** Have page-level components (route files) fetch/import the data and pass it down as props. The section components should only receive the data they need.

### 12. Gallery Has Its Own Lightbox While LightboxGallery Exists (Medium)

`Gallery.tsx` implements its own inline lightbox (lines 74-130) with navigation and captions, while `LightboxGallery.tsx` is a more polished lightbox component with Embla carousel, keyboard nav, and portal rendering. RoomList uses `LightboxGallery` but Gallery doesn't.

**Fix:** Remove the inline lightbox from Gallery and use `LightboxGallery` instead.

### 13. Unused Imports (Low)

- `Events.tsx` imports `ChevronLeft`, `ChevronRight` from lucide-react but uses `CarouselNavigation` instead
- `Blog.tsx` imports `ChevronLeft`, `ChevronRight` but doesn't use them
- `ThingsToDo.tsx` imports `ChevronLeft`, `ChevronRight` but uses `CarouselNavigation`
- `RoomList.tsx` imports `ChevronLeft`, `ChevronRight` but uses `CarouselNavigation`

### 14. Inline SVGs Instead of Lucide Icons (Low)

`Gallery.tsx`, `Location.tsx`, and `ImageCard.tsx` use inline `<svg>` elements for icons (zoom, close, chevrons, map pin, phone, email, clock) while the rest of the codebase uses `lucide-react` for the same icons.

**Fix:** Replace inline SVGs with their Lucide equivalents for consistency and smaller JSX.

### 15. `BookingWidget` Polling Pattern (Low)

The BookingWidget uses `setInterval` polling (every 500ms for up to 10s) to wait for the Mews script. The `useEffect` also has `mewsApi` in its dependency array, which means it re-runs every time the API ref changes, potentially creating multiple intervals.

**Fix:** Use a `MutationObserver` or the Script component's `onLoad` callback instead of polling.

### 16. Offers Component Has Duplicated Card Rendering (Medium)

The Offers component duplicates the entire `StandardCard` rendering with actions JSX for both the carousel and grid views (lines 58-93 and 103-136 are nearly identical). Other components like Events and Blog avoid this by extracting a sub-component.

**Fix:** Extract the offer card rendering into an `OfferCard` sub-component, matching the pattern used by `EventCard` and `BlogCard`.

### 17. Type Safety Gaps (Low)

- `BookingWidget` uses `any` for the Mews API (`useState<any>(null)`)
- Navigation's custom event handler types the event as `any` (`const handleOpenWidget = (e: any)`)
- `Amenities` uses `Record<string, any>` for `iconMap`

**Fix:** Define proper TypeScript interfaces for the Mews API surface, custom events, and icon map.

---

## Design & UX Improvements

### 18. No Loading/Skeleton States

When components are loading (especially the Temperature widget and image-heavy sections), there are no skeleton screens. The Temperature widget shows a tiny gray pulse bar, but sections like the gallery have no loading indication.

**Fix:** Add skeleton loading states for image grids and carousels using Tailwind's `animate-pulse`.

### 19. No Error Boundaries

If the Google Maps API fails, the weather API fails, or any component throws, the entire page crashes with no recovery.

**Fix:** Add React Error Boundaries around the Map, Temperature, and each major section.

### 20. Mobile Carousel Has No Visual Affordance

On mobile, carousels rely on swipe gestures but there's no visual indicator (dots, partial card peek, or scroll bar) telling users there's more content to swipe through. The `CarouselNavigation` arrows are hidden on mobile (`hidden md:flex`).

**Fix:** Add dot indicators or a scroll progress bar for mobile carousel views.

### 21. Accessibility Gaps

- Gallery images use `<button>` but have no visible focus styles
- The lightbox in Gallery.tsx has no focus trap — keyboard users can tab to elements behind the overlay
- Mobile menu overlay has no focus trap
- Color contrast may be insufficient for the light gray text on white backgrounds (e.g., `text-gray-500` on white)

### 22. No Structured Data / JSON-LD (SEO)

For a hotel website, Google's rich results for `Hotel`, `LodgingBusiness`, `Review`, and `Event` schemas would significantly boost search visibility. Currently there's no structured data.

**Fix:** Add JSON-LD to the layout for the Hotel entity, and to individual pages for rooms, reviews, events, and blog posts.

### 23. Dark Mode Color Inconsistencies

Some components use `dark:bg-slate-900` while others use `dark:bg-slate-800` or `dark:bg-slate-700` at the same hierarchy level. The GroupReservations component uses `dark:bg-slate-700` for cards while every other card uses `dark:bg-slate-800`.

**Fix:** Standardize dark mode colors by defining semantic color tokens (e.g., `bg-surface`, `bg-surface-elevated`).

---

## Quick Wins (Easy fixes with big impact)

1. **Replace `<img>` with `next/image`** — biggest single performance win
2. **Move Google Fonts to `next/font`** — eliminates render-blocking request
3. **Remove unused imports** — cleaner bundle, cleaner code
4. **Reuse `LightboxGallery` in Gallery.tsx** — delete ~60 lines of duplicate code
5. **Extract `useCarousel` hook** — delete ~70 lines of duplicated boilerplate across 7 files
6. **Add JSON-LD structured data** — immediate SEO improvement with zero visual change
