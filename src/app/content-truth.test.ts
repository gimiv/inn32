import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

// Numeric or spelled-out drive-time/distance claims are routing-fragile and unverified.
const FRAGILE_DISTANCE = /(?:\d+(?:\.\d+)?|one|two|three|four|five|ten|fifteen|twenty)[\s-]*(?:minutes?|min\b|miles?|hours?|hr\b)/i

test('touched pages carry no exact drive-time/distance claims', () => {
    for (const file of [
        'src/app/things-to-do/page.tsx',
        'src/app/faq/page.tsx',
        'src/app/about/page.tsx',
        'src/components/InsiderGuide.tsx',
    ]) {
        assert.doesNotMatch(read(file), FRAGILE_DISTANCE, `${file} contains an exact distance/time claim`)
    }
})

test('amenities copy avoids universal room-equipment claims', () => {
    assert.doesNotMatch(read('src/app/amenities/page.tsx'), /in every room/i)
})

test('canonical metadata behavior is intact on touched routes', () => {
    assert.match(read('src/app/page.tsx'), /canonical:\s*canonicalUrl\(['"]\/['"]\)/)
    assert.match(read('src/app/things-to-do/page.tsx'), /canonical:\s*canonicalUrl\(['"]\/things-to-do['"]\)/)
    assert.match(read('src/app/faq/page.tsx'), /canonical:\s*canonicalUrl\(['"]\/faq['"]\)/)
})

test('no fabricated schema claims are introduced', () => {
    for (const file of [
        'src/app/things-to-do/page.tsx',
        'src/components/InsiderGuide.tsx',
        'src/data/guest-content.ts',
        'src/components/FaqPreview.tsx',
    ]) {
        const src = read(file)
        assert.doesNotMatch(src, /aggregateRating/i, `${file} must not add aggregateRating`)
        assert.doesNotMatch(src, /"availability"|schema\.org\/InStock/i, `${file} must not add availability schema`)
    }
})
