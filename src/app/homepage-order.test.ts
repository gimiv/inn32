import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

// Target homepage pacing: Hero → Stay/Explore/Gather intent panels → Rooms →
// Why Inn 32 → Reviews → active Offers → Group CTA →
// (conditional Events) → Insider Guide teaser → Location → FAQ preview.
// The homepage Gallery module was retired in favor of StayExploreGather;
// gallery data/routes/components remain intact elsewhere.
const SECTION_ORDER = [
    '<Hero',
    '<StayExploreGather',
    '<RoomList',
    '<WhyInn32',
    '<Reviews',
    '<Offers',
    '<GroupBuyoutCta',
    '<Events',
    '<ThingsToDo',
    '<Location',
    '<FaqPreview',
]

test('homepage sections are wired in the intended order', () => {
    const src = read('src/app/page.tsx')
    const returnBlock = src.slice(src.indexOf('return ('))
    let cursor = -1
    for (const tag of SECTION_ORDER) {
        const index = returnBlock.indexOf(tag)
        assert.ok(index !== -1, `homepage is missing section ${tag}`)
        assert.ok(index > cursor, `${tag} is out of order in the homepage flow`)
        cursor = index
    }
})

test('Events stays conditional and renders null when there is nothing upcoming', () => {
    assert.match(read('src/app/page.tsx'), /filterUpcomingEvents/)
    assert.match(read('src/components/Events.tsx'), /if \(!events \|\| events\.length === 0\) return null/)
})

test('homepage ends its discovery flow with FAQ instead of a duplicate social gallery', () => {
    const src = read('src/app/page.tsx')
    assert.match(src, /<Location[\s\S]*<FaqPreview/)
    assert.doesNotMatch(src, /<SocialReel|import SocialReel/)
    assert.doesNotMatch(src, /<Gallery\b|import Gallery from/, 'the homepage Gallery module was retired for StayExploreGather')
})

test('homepage stays lean: no newsletter modal, overlays, or duplicate booking UI', () => {
    const src = read('src/app/page.tsx')
    assert.doesNotMatch(src, /newsletter/i)
    assert.doesNotMatch(src, /Modal|Overlay/i)
    assert.doesNotMatch(src, /BookingWidget/, 'booking CTA lives in the shared layout, not duplicated on the homepage')
    assert.doesNotMatch(src, /ExperienceHighlights/, 'amenity storytelling belongs on the dedicated Amenities page, not duplicated on the homepage')
})

test('homepage ThingsToDo teaser links to the Insider Guide', () => {
    const src = read('src/components/ThingsToDo.tsx')
    assert.match(src, /href:\s*["']\/things-to-do["']/)
    assert.match(src, /Explore the Insider Guide/)
})
