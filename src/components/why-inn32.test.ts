import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('WhyInn32 uses a real Inn 32 gallery image with truthful alt text', () => {
    const src = read('src/components/WhyInn32.tsx')
    const imageMatch = src.match(/src="(\/gallery\/[^"]+)"/)
    assert.ok(imageMatch, 'WhyInn32 must use an image from public/gallery')
    assert.ok(fs.existsSync(path.join(process.cwd(), 'public', imageMatch![1])),
        `image ${imageMatch![1]} must exist on disk`)
    assert.match(src, /alt="[^"]*Inn 32[^"]*"/)
})

test('WhyInn32 keeps its supporting image desktop-only to protect mobile pacing', () => {
    const src = read('src/components/WhyInn32.tsx')
    assert.match(src, /hidden\s+lg:block/)
    assert.doesNotMatch(src, /aspect-\[4\/3\]/)
})

test('WhyInn32 presents verified reasons without exact drive-time or distance claims', () => {
    const src = read('src/components/WhyInn32.tsx')
    assert.match(src, /Exit 32/)
    assert.match(src, /Main Street/)
    assert.match(src, /walk/i)
    assert.match(src, /sleep up to 8/i)
    assert.match(src, /Loon Mountain/)
    assert.match(src, /Franconia Notch/)
    assert.match(src, /Kancamagus/)
    assert.doesNotMatch(src, /\d+(?:\.\d+)?[\s-]*(?:minute|min\b|mile\b)/i)
    assert.doesNotMatch(src, /\$\s?\d/)
})

test('WhyInn32 keeps a semantic heading and a detail link without extra booking CTAs', () => {
    const src = read('src/components/WhyInn32.tsx')
    assert.match(src, /<h2|SectionHeader/)
    assert.match(src, /href=["']\/(location|about)["']/)
    assert.doesNotMatch(src, /\/booking/, 'no duplicated Book Now CTA in this section')
    assert.doesNotMatch(src, /book now/i)
})

test('homepage renders Why Inn 32 immediately after Rooms and before Reviews', () => {
    const src = read('src/app/page.tsx')
    assert.match(src, /<WhyInn32\s*\/>/)
    assert.match(src, /<RoomList[\s\S]*<WhyInn32[\s\S]*<Reviews/)
})
