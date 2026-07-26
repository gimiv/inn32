import { test } from 'node:test'
import assert from 'node:assert/strict'
import sitemap from './sitemap'
import { CANONICAL_ORIGIN } from '../lib/seo'

test('sitemap uses the canonical www origin for every entry', () => {
    const entries = sitemap()
    assert.ok(entries.length > 0)
    for (const entry of entries) {
        assert.ok(
            entry.url === CANONICAL_ORIGIN || entry.url.startsWith(`${CANONICAL_ORIGIN}/`),
            `non-canonical sitemap url: ${entry.url}`
        )
    }
})

test('sitemap excludes the booking route', () => {
    const entries = sitemap()
    assert.ok(!entries.some(e => e.url.includes('/booking')))
})

test('sitemap includes privacy and terms', () => {
    const entries = sitemap()
    assert.ok(entries.some(e => e.url === `${CANONICAL_ORIGIN}/privacy`))
    assert.ok(entries.some(e => e.url === `${CANONICAL_ORIGIN}/terms`))
})
