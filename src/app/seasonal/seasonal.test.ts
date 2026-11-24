import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import sitemap from '../sitemap'
import { CANONICAL_ORIGIN } from '../../lib/seo'
import { SEASONAL_ROOM_OPTIONS, BOOKING_WINDOWS, SEASONS } from '../../data/seasonal'
import { websiteData } from '../../data/website-data'
import { ALL_NAV_LINKS } from '../../data/navigation'
import { validateGroupInquiry, GROUP_INQUIRY_EVENT_TYPES, SEASONAL_STAY_INQUIRY_TYPE } from '../../utils/groupInquiry'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('/seasonal is in the sitemap and site navigation', () => {
    assert.ok(sitemap().some((e) => e.url === `${CANONICAL_ORIGIN}/seasonal`))
    assert.ok(ALL_NAV_LINKS.some((l) => l.href === '/seasonal'))
})

test('/seasonal declares its own canonical URL', () => {
    assert.match(read('src/app/seasonal/page.tsx'), /canonical:\s*canonicalUrl\(SEASONAL_PAGE_PATH\)/)
})

test('every seasonal room option maps to a real room type', () => {
    for (const option of SEASONAL_ROOM_OPTIONS) {
        assert.ok(
            websiteData.roomTypes.some((r) => r.id === option.roomTypeId),
            `unknown roomTypeId: ${option.roomTypeId}`
        )
    }
})

test('the inquiry API accepts seasonal inquiries without adding them to the Groups dropdown', () => {
    const result = validateGroupInquiry({
        firstName: 'Ada',
        lastName: 'Skier',
        email: 'ada@example.com',
        eventType: SEASONAL_STAY_INQUIRY_TYPE,
        dates: 'Jan 5 - Mar 31',
    })
    assert.equal(result.ok, true)
    assert.ok(!(GROUP_INQUIRY_EVENT_TYPES as readonly string[]).includes(SEASONAL_STAY_INQUIRY_TYPE))
})

test('every booking window points at a defined season', () => {
    assert.ok(BOOKING_WINDOWS.length > 0)
    for (const w of BOOKING_WINDOWS) assert.ok(SEASONS.some((s) => s.id === w.season), w.label)
})
