import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

function read(relativePath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')
}

test('root layout JSON-LD has no aggregateRating or reviewCount claim', () => {
    const src = read('src/app/layout.tsx')
    assert.doesNotMatch(src, /aggregateRating/i)
    assert.doesNotMatch(src, /reviewCount/i)
})

test('root layout JSON-LD has no unverified static price or InStock availability', () => {
    const src = read('src/app/layout.tsx')
    assert.doesNotMatch(src, /hasOfferCatalog/)
    assert.doesNotMatch(src, /schema\.org\/InStock/)
    assert.doesNotMatch(src, /"priceCurrency"/)
})

test('rooms page JSON-LD has no unverified static price or InStock availability', () => {
    const src = read('src/app/rooms/page.tsx')
    assert.doesNotMatch(src, /schema\.org\/InStock/)
    assert.doesNotMatch(src, /"priceCurrency"/)
    assert.doesNotMatch(src, /"price":/)
})

test('root layout, rooms, about, events, and blog article JSON-LD never use the bare (non-www) origin', () => {
    for (const file of [
        'src/app/layout.tsx',
        'src/app/rooms/page.tsx',
        'src/app/about/page.tsx',
        'src/app/events/page.tsx',
        'src/app/blog/[slug]/page.tsx',
    ]) {
        const src = read(file)
        assert.doesNotMatch(src, /https:\/\/inn32\.com/, `${file} must not reference the bare origin`)
    }
})

test('events page only emits Event JSON-LD when there are upcoming events, and filters through the valid-ISO-future helper', () => {
    const src = read('src/app/events/page.tsx')
    assert.match(src, /filterUpcomingEvents/)
    assert.match(src, /upcomingEvents\.length > 0 \? \{/)
})

test('website data never links the booking CTA to the bare origin', () => {
    const src = read('src/data/website-data.ts')
    assert.doesNotMatch(src, /https:\/\/inn32\.com/)
})
