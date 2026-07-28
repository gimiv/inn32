import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('GroupBuyoutCta states verified buyout facts and links to the groups page', () => {
    const src = read('src/components/GroupBuyoutCta.tsx')
    assert.match(src, /all 24 rooms/i)
    assert.match(src, /buyout/i)
    assert.match(src, /wedding/i)
    assert.match(src, /href=["']\/groups["']/)
    assert.match(src, /href=["']\/groups#group-inquiry["']/)
    assert.doesNotMatch(src, /\d+(?:\.\d+)?[\s-]*(?:minute|min\b|mile|hour)/i)
    assert.doesNotMatch(src, /\$\s?\d/)
})

test('GroupBuyoutCta uses a real Inn 32 property image, not stock adventure imagery', () => {
    const src = read('src/components/GroupBuyoutCta.tsx')
    const imageMatch = src.match(/src="(\/gallery\/[^"]+)"/)
    assert.ok(imageMatch, 'CTA must use an image from public/gallery')
    assert.ok(fs.existsSync(path.join(process.cwd(), 'public', imageMatch![1])),
        `image ${imageMatch![1]} must exist on disk`)
    assert.doesNotMatch(src, /group_hiking|group_skiing|group_kayaking/,
        'no generic adventure stock imagery')
})

test('GroupBuyoutCta is an accessible high-contrast band', () => {
    const src = read('src/components/GroupBuyoutCta.tsx')
    assert.match(src, /aria-labelledby=/)
    assert.match(src, /<h2/)
    assert.match(src, /focus-visible:/)
})

test('the real groups inquiry form exposes the #group-inquiry anchor target', () => {
    const src = read('src/components/GroupReservations.tsx')
    assert.match(src, /id="group-inquiry"/)
})

test('homepage renders the group CTA after Offers and before ThingsToDo', () => {
    const src = read('src/app/page.tsx')
    assert.match(src, /<GroupBuyoutCta\s*\/>/)
    assert.match(src, /<Offers[\s\S]*<GroupBuyoutCta[\s\S]*<ThingsToDo/)
})
