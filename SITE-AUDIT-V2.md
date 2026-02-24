# Inn 32 — Site Audit v2

## What's Been Fixed Since v1

Nice progress. Here's what was addressed from the first audit:

- **`next/image` adopted** across StandardCard, ImageCard, Gallery, SocialReel, Hero, and LightboxGallery — with skeleton loading states and proper `sizes` props. This was the #1 performance issue and it's resolved.
- **Google Fonts moved to `next/font`** — DM Serif Display, Outfit, and Lora now load via `next/font/google` instead of render-blocking `<link>` tags. The unused Inter/Playfair imports are gone.
- **`useCarousel` hook extracted** — eliminates repeated Embla boilerplate across all carousel components.
- **`ContentSection` component created** — standardizes the carousel-vs-grid dual-mode pattern. Blog, Amenities, Events, Reviews, RoomList, and ThingsToDo (home mode) all use it.
- **`SectionHeader` component created** — replaces the 8 copies of the section header pattern.
- **`Button` / `LinkButton` components created** — replaces the 6 identical "View All" button class strings.
- **Gallery now uses `LightboxGallery`** — the duplicate inline lightbox is gone.
- **Offers extracted `OfferCard`** — no more duplicated card JSX for carousel vs. grid mode.
- **`RoomCard` extracted** — room rendering logic now lives in its own component with self-contained lightbox state.
- **Inline SVGs replaced with Lucide icons** — Location.tsx uses MapPin, Phone, Mail, Clock instead of raw SVGs. Gallery uses ZoomIn.
- **Scroll handler throttled** — Navigation now uses `requestAnimationFrame` and `{ passive: true }`.
- **Mews script set to `lazyOnload`** — no longer blocks interactivity on every page.
- **JSON-LD structured data added** — `LodgingBusiness` schema in the root layout.
- **Mobile carousel dots added** — `ContentSection` renders dot indicators on mobile for all carousels.
- **Data passed as props** — page-level components now pass `websiteData.roomTypes`, `websiteData.reviews`, etc. as props rather than section components importing the data directly.
- **Unused imports cleaned** — ChevronLeft/ChevronRight removed from components that use `CarouselNavigation` instead.
- **Focus-visible styles added** — ImageCard, Gallery buttons, and Location contact cards now have `focus-visible:ring-2` outlines.
- **ThingsToDo split** — Server-renderable carousel mode via `ContentSection`, client-only interactive filter mode via `ThingsToDoInteractive`.

---

## Remaining Issues

### Architecture & Code

**1. Offers doesn't use ContentSection (inconsistency)**

Every other section component (RoomList, Reviews, Events, Blog, Amenities, ThingsToDo) now delegates to `ContentSection` for its carousel/grid rendering. Offers still manually implements the carousel and grid with `useCarousel`, `SectionHeader`, `CarouselNavigation`, and its own layout JSX. This means Offers misses the mobile dot indicators that `ContentSection` provides, and it duplicates the same carousel wrapper markup.

**Fix:** Refactor Offers to use `ContentSection` like the other section components.

**2. RoomList types `roomTypes` as `any[]`**

```tsx
interface RoomListProps {
    limit?: number
    roomTypes: any[]  // ← should be RoomType[]
}
```

Every other refactored component properly types its data (e.g., `reviews: Review[]`, `events: Event[]`). RoomList is the only one using `any[]`.

**Fix:** Import and use `RoomType` from `../types/website`.

**3. SocialReel still imports `websiteData` directly**

All other section components now receive their data as props, but SocialReel still does `const { socialPosts } = websiteData` internally. This breaks the new pattern.

**Fix:** Accept `socialPosts: SocialPost[]` as a prop and pass it from the home page.

**4. Footer still imports `websiteData` directly**

Same issue as SocialReel — the Footer reads `websiteData.property` and `websiteData.property.description` directly instead of receiving `property` as a prop. Navigation has the same pattern for `websiteData.property.contact.phone`.

**Fix:** Pass `property` as a prop from the layout.

**5. Gallery doesn't use `SectionHeader`**

Gallery manually builds its own header (lines 32-41) with the same label/title/subtitle pattern that `SectionHeader` now handles. It's one of only two sections (along with Location) that still hand-rolls the header.

**Fix:** Use `SectionHeader` with `align="center"`.

**6. Location doesn't use `SectionHeader`**

Same issue — Location builds its own centered header manually (lines 63-71).

**Fix:** Use `SectionHeader` with `align="center"`.

**7. StandardCard and ImageCard are `'use client'` only for skeleton state**

Both components are marked `'use client'` and use `useState` solely to track image loading for the skeleton. This forces them (and their parents) to be client components. The `onLoad` callback approach requires client JS.

**Alternative:** Consider using CSS-only skeleton loading (background placeholder that's hidden by the loaded image) or Next.js `placeholder="blur"` with `blurDataURL`. This would let these cards be server components again, which would reduce the client JS bundle for grid-mode pages.

**8. ContentSection always instantiates `useCarousel` even in grid mode**

```tsx
const { emblaRef, scrollPrev, scrollNext, selectedIndex, scrollSnaps, scrollTo } = useCarousel({ dragFree: true })
```

This hook runs even when `isCarousel` is `false` (grid mode), creating an unused Embla instance. While Embla is lightweight, it's unnecessary work and it forces `ContentSection` to be `'use client'`.

**Fix:** Either conditionally render a `<CarouselWrapper>` sub-component only when `isCarousel` is true, or split `ContentSection` into a server-rendered grid and a client-rendered carousel variant.

**9. `dragFree: true` in ContentSection but not in Offers**

`ContentSection` passes `dragFree: true` to `useCarousel`, but Offers (which manages its own carousel) doesn't. This creates an inconsistent swipe feel between sections.

**10. Missing `key` prop on ContentSection items wrapping**

Inside `ContentSection`, items are re-wrapped with `<div key={index}>`. Since the items themselves already have keys (set by the parent), the outer wrapper keys by array index. This is fine functionally but means React can't efficiently reconcile if items are reordered.

### Performance

**11. `BookingWidget` polling issue persists**

The `useEffect` that initializes Mews still has `mewsApi` in its dependency array, which means every time `setMewsApi` is called, the effect re-runs and potentially creates a new interval. After the first successful init, `mewsApi` is truthy so the early return prevents re-initialization, but the effect still runs the cleanup/setup cycle unnecessarily.

**Fix:** Remove `mewsApi` from the dependency array and use a ref to track initialization instead:

```tsx
const initializedRef = useRef(false)
useEffect(() => {
    if (initializedRef.current) return
    // ... polling logic
    // On success: initializedRef.current = true
}, []) // empty deps — run once
```

**12. Temperature component still uses Framer Motion**

The animated sun/moon icon toggle in `Temperature.tsx` still imports `motion` and `AnimatePresence` from framer-motion. Since this component renders in the Navigation (which is on every page), Framer Motion is in the critical bundle for every page load. The animation itself is a simple vertical slide + rotate that CSS transitions can handle.

**Fix:** Replace with CSS `@keyframes` or a `transition` + conditional class approach.

**13. No `loading="lazy"` or priority hints on below-fold images**

While `next/image` handles lazy loading by default, the hero background image correctly uses `priority`. However, the `SocialReel` images (always at the very bottom of the page) could benefit from explicit `loading="lazy"` and lower `fetchpriority` to prevent them from competing with above-fold content.

### Design & UX

**14. SectionHeader `align="center"` mode has layout issues**

When `align="center"` is used, the outer div has `flex` + `text-center mx-auto block`. The `flex` and `block` display properties conflict. The children wrapper also gets `mx-auto w-full md:w-auto` which makes the carousel nav (if present) float weirdly in centered mode. Currently only used with `align="left"` so this hasn't been visible yet, but Gallery and Location should use it.

**Fix:** Test and fix the center alignment mode — likely remove `flex` when centering, or use a different layout approach for centered headers without children.

**15. Mobile menu still has no focus trap**

When the mobile menu overlay opens, keyboard users can tab through to elements behind it. This was flagged in v1 and remains.

**Fix:** Add `inert` to the main content when the mobile menu is open, or use a focus-trap library.

**16. No error boundary around Google Maps**

If the Maps API key is missing or the API fails, the Location component will crash. This was flagged in v1.

**Fix:** Wrap the `APIProvider` + `Map` in a React Error Boundary with a fallback static map image or address-only display.

**17. `temperature` widget shows nothing if weather API fails**

If the open-meteo API request fails, `temp` stays `null` and `loading` becomes `false`. The component renders `{null}°F` — which displays as just "°F" with no number.

**Fix:** Either show a fallback (just the theme toggle icon without temperature) or handle the null state.

---

## Summary Scorecard

| Area | v1 Issues | Fixed | Remaining | New Issues Found |
|------|-----------|-------|-----------|-----------------|
| Performance | 6 | 4 | 2 | 1 |
| Architecture | 11 | 9 | 2 | 6 |
| Design/UX | 6 | 3 | 3 | 1 |
| **Total** | **23** | **16** | **7** | **8** |

The big wins are done — `next/image`, `next/font`, shared components, and the carousel abstraction were the highest-impact changes. The remaining items are mostly consistency issues (Offers not using ContentSection, a few components still importing websiteData directly) and edge-case robustness (error boundaries, focus traps, null weather state).
