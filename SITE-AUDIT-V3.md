# Inn 32 — Site Audit v3

## What's Been Fixed Since v2

Another strong round. Here's what was addressed:

- **Offers now uses ContentSection** — it was the last holdout and is now consistent with every other section component.
- **ContentSection split into server + client** — `ContentSection` itself is now a server component that conditionally renders a `CarouselWrapper` (client) only when in carousel mode. Grid mode no longer instantiates Embla. This was the #8 issue from v2 and it's well done.
- **SectionHeader `align="center"` fixed** — the conflicting `flex` + `block` display issue is gone. Center mode now uses a clean `text-center max-w-2xl mx-auto` layout, while left mode keeps the flex row. Two separate return branches instead of one messy conditional.
- **Framer Motion removed from Temperature** — sun/moon toggle now uses CSS transitions (`transition-all duration-300 transform` with conditional classes for opacity, translate, rotate, scale). Framer Motion is no longer in the critical bundle for every page.
- **BookingWidget polling fixed** — uses `initializedRef` with `useRef(false)` and empty `[]` deps. The re-initialization loop from v2 is gone.
- **Temperature null state handled** — `{temp !== null ? <span>{temp}°F</span> : null}` — no more bare "°F" when the weather API fails.
- **SocialReel accepts props** — `socialPosts: SocialPost[]` passed from page, no longer imports `websiteData` directly. Explicit `loading="lazy"` added.
- **Footer accepts `property` prop** — no longer imports `websiteData` directly.
- **Navigation accepts `property` prop** — uses `property.contact.phone` instead of direct import.
- **Layout passes props down** — `<Navigation property={websiteData.property} />` and `<Footer property={websiteData.property} />`.
- **RoomList properly typed** — `roomTypes: RoomType[]` instead of `any[]`.
- **Gallery uses SectionHeader** — no more hand-rolled centered header.
- **Location uses SectionHeader** — same fix, plus switched to `align="center"`.
- **ErrorBoundary created and used** — wraps Google Maps in Location with a nice fallback showing a MapPin icon and helpful message.
- **Mobile focus trap implemented** — Navigation applies `inert` to `<main>` and `<footer>` when mobile menu opens, plus `overflow: hidden` on body.
- **StandardCard converted to server component** — no longer `'use client'`, uses CSS-only skeleton (a persistent `animate-pulse` div behind the image at `z-0`, image at `z-10`).
- **ImageCard converted to server component** — same CSS-only skeleton approach, no more `useState`.
- **Item keys improved** — `ContentSection` and `CarouselWrapper` now extract `item.key` from React elements instead of always using array index.

---

## Remaining Issues

### 1. `Offers` still has `'use client'` but doesn't need it

```tsx
'use client'  // line 1 of Offers.tsx
```

Offers now delegates entirely to `ContentSection` (which renders `CarouselWrapper` client-side when needed). The component itself doesn't use any hooks, browser APIs, or event handlers. The `OfferCard` sub-component has an `onClick` handler for the booking widget, but that's rendered inside `StandardCard` as a passed `actions` ReactNode — it'll still work because the card is ultimately rendered within the client-side `CarouselWrapper` or within a server-rendered grid where the button's `onClick` is hydrated as a client interaction.

Actually, the `OfferCard` uses `window.dispatchEvent` and `onClick` in its actions prop, so this needs `'use client'` after all. However, the `OfferCard` could be extracted to its own `'use client'` file, letting the main `Offers` component be a server component.

**Verdict:** Minor optimization, low priority. Works correctly as-is.

### 2. `GroupReservations` still imports `websiteData` directly

This is the one component left that directly accesses `websiteData`:

```tsx
import { websiteData } from '../data/website-data'
// ...
<span>{websiteData.property.contact.phone}</span>
<span>{websiteData.property.contact.email}</span>
```

Every other component now receives its data via props.

**Fix:** Accept `property` or `contact` as a prop and pass from the `/groups` page.

### 3. `Amenities` iconMap still typed as `Record<string, any>`

```tsx
const iconMap: Record<string, any> = {
    wifi: Wifi, wind: Wind, coffee: Coffee, car: Car, tv: Tv, snowflake: Snowflake,
}
```

This is the last remaining `any` in the display components (besides the Mews API declarations, which genuinely need `any` since Mews doesn't provide types).

**Fix:** Type it as `Record<string, React.ComponentType<{ size?: number; className?: string }>>` or use Lucide's `LucideIcon` type.

### 4. `SocialReel` still builds its own header manually

SocialReel has a hand-rolled centered header with the Instagram icon, label, title, and subtitle — it doesn't use `SectionHeader`. This is because its header has a unique element (the Instagram icon circle) that `SectionHeader` doesn't accommodate.

**Verdict:** Acceptable divergence — the Instagram icon above the label makes this header genuinely different from the standard pattern. Not worth forcing into `SectionHeader` unless you add an `icon` slot to it.

### 5. `SocialReel` doesn't use `ContentSection` or `CarouselWrapper`

SocialReel manually creates its own Embla instance with `useEmblaCarousel` directly. It's the only carousel component not using the shared hook/wrapper, which means it doesn't get mobile dot indicators.

This is semi-intentional — SocialReel uses `loop: true` (infinite scroll) while `useCarousel` defaults to `loop: false`, and its full-bleed layout (`w-full` with no max-width container) doesn't fit `ContentSection`'s `max-w-7xl` container.

**Verdict:** Reasonable divergence for now. If you want dots, you could use `useCarousel` with `{ loop: true, dragFree: true }` and build the dots manually. Low priority.

### 6. Navigation imports `Sun` and `Moon` but doesn't use them directly

```tsx
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
```

`Sun` and `Moon` are never used in Navigation's JSX — they're used by `Temperature` (which is a child component) and by the `Footer` (separate component). These are dead imports that slightly increase the bundle.

**Fix:** Remove `Sun, Moon` from Navigation's import.

### 7. LightboxGallery doesn't use `useCarousel` hook

It manually creates its own Embla instance and `scrollPrev`/`scrollNext` callbacks. This is the same boilerplate the hook was created to eliminate.

**Verdict:** Semi-reasonable — the Lightbox uses different options (`loop: true, align: 'center'`) and has a unique `onSelect` callback for the image counter. However, `useCarousel` already supports custom options and returns `selectedIndex`. It would work fine here.

**Fix:** Replace the manual Embla setup with `useCarousel({ loop: true, align: 'center' })` to eliminate ~20 lines.

### 8. No `Suspense` boundary for weather fetch in Temperature

The Temperature component makes a `fetch` call inside `useEffect` on mount. If this were refactored to use React Server Components or Next.js data fetching in the future, having a `Suspense` boundary around it would be useful. Currently it handles loading state internally, which is fine.

**Verdict:** Not a bug, just a note for future architecture.

---

## Overall Architecture Assessment

The codebase has reached a clean, consistent state. Here's the pattern map:

| Component | Uses ContentSection | Uses SectionHeader | Data via Props | Server-compatible |
|-----------|--------------------|--------------------|----------------|-------------------|
| RoomList | Yes | Yes (via CS) | Yes | Yes (via CS split) |
| Reviews | Yes | Yes (via CS) | Yes | Yes |
| Offers | Yes | Yes (via CS) | Yes | No (onClick in OfferCard) |
| Events | Yes | Yes (via CS) | Yes | Yes |
| Blog | Yes | Yes (via CS) | Yes | Yes |
| Amenities | Yes | Yes (via CS) | Yes | Yes |
| ThingsToDo | Yes (home) / Custom (page) | Yes (via CS) | Yes | Partially |
| Gallery | No (custom grid) | Yes | Yes | No (useState for lightbox) |
| Location | No (custom layout) | Yes | Yes | No (useTheme) |
| SocialReel | No (unique layout) | No (unique header) | Yes | No (Embla) |
| GroupReservations | No (form component) | No (inline) | **No** | No (form state) |

The only data-flow outlier is `GroupReservations`. Everything else is clean.

---

## Summary Scorecard

| Area | v1 Issues | v2 Found | v3 Status |
|------|-----------|----------|-----------|
| Performance | 6 | +3 | **All resolved** |
| Architecture | 11 | +6 | **2 minor remaining** (GroupRes data, Amenities any type) |
| Design/UX | 6 | +1 | **All resolved** |
| Code cleanup | — | +2 | **1 minor remaining** (unused Nav imports) |
| **Totals** | **23** | **+12 = 35** | **32 fixed, 3 remaining** |

You've gone from 23 issues to 3 minor ones across three rounds. The site is in strong shape. The remaining items are:

1. GroupReservations still reads websiteData directly (consistency)
2. Amenities iconMap typed as `any` (type safety)
3. Navigation has unused `Sun, Moon` imports (dead code)

None of these affect functionality or performance — they're purely cleanliness.
