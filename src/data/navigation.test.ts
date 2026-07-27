import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS, ALL_NAV_LINKS } from './navigation'

test('desktop primary navigation has at most five destinations (Book Now is separate)', () => {
    assert.ok(PRIMARY_NAV_LINKS.length <= 5, `expected <= 5 primary links, got ${PRIMARY_NAV_LINKS.length}`)
})

test('mobile navigation includes every destination, primary and secondary combined', () => {
    assert.deepEqual(ALL_NAV_LINKS, [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS])
    assert.ok(SECONDARY_NAV_LINKS.length > 0, 'expected at least one lower-priority destination')
})

test('no destination appears in both the primary nav and the secondary More menu', () => {
    const primaryHrefs = new Set(PRIMARY_NAV_LINKS.map(l => l.href))
    for (const link of SECONDARY_NAV_LINKS) {
        assert.ok(!primaryHrefs.has(link.href), `${link.href} duplicated across primary and secondary nav`)
    }
})

test('every nav link has a non-empty name and a site-relative href', () => {
    for (const link of ALL_NAV_LINKS) {
        assert.ok(link.name.length > 0)
        assert.ok(link.href.startsWith('/'))
    }
})
