import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('StayExploreGather exists and defines exactly the Stay, Explore, and Gather panels', () => {
    const src = read('src/components/StayExploreGather.tsx')
    assert.match(src, /Stay[\s\S]*?href:\s*["']\/rooms["']/)
    assert.match(src, /Explore[\s\S]*?href:\s*["']\/things-to-do["']/)
    assert.match(src, /Gather[\s\S]*?href:\s*["']\/groups["']/)
})

test('StayExploreGather panels use real local gallery images with descriptive alt text', () => {
    const src = read('src/components/StayExploreGather.tsx')
    const imageMatches = Array.from(src.matchAll(/image:\s*["'](\/gallery\/[^"']+)["']/g))
    assert.equal(imageMatches.length, 3, 'expected exactly 3 panel images')
    for (const match of imageMatches) {
        const imagePath = match[1]
        assert.ok(
            fs.existsSync(path.join(process.cwd(), 'public', imagePath)),
            `image ${imagePath} must exist on disk`
        )
    }
    const altMatches = Array.from(src.matchAll(/imageAlt:\s*["']([^"']+)["']/g))
    assert.equal(altMatches.length, 3, 'expected exactly 3 panel alt texts')
    for (const match of altMatches) {
        assert.ok(match[1].length > 10, 'alt text must be descriptive')
    }
})

test('StayExploreGather renders as a keyboard-accessible, responsive section with no competitor phrasing', () => {
    const src = read('src/components/StayExploreGather.tsx')
    assert.match(src, /<section/)
    assert.match(src, /grid-cols-1/)
    assert.match(src, /md:grid-cols-3|lg:grid-cols-3/)
    assert.match(src, /focus-visible:/)
    assert.doesNotMatch(src, /eat here|play here|we are inn/i)
})

test('homepage wires StayExploreGather immediately after Hero', () => {
    const src = read('src/app/page.tsx')
    assert.match(src, /<Hero[\s\S]*?\/>[\s\S]*?<StayExploreGather/, 'StayExploreGather must render directly after Hero')
    assert.match(src, /import StayExploreGather from ['"]\.\.\/components\/StayExploreGather['"]/)
})
