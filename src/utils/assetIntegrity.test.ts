import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { HERO_MEDIA_BYTE_BUDGET, extractLocalAssetRefs, verifyAssetExistsCaseSensitive } from './assetIntegrity'

function read(relativePath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')
}

const PUBLIC_DIR = path.join(process.cwd(), 'public')

test('extractLocalAssetRefs finds site-relative asset paths and ignores remote URLs', () => {
    const source = `
        const a = "/gallery/front-view.webp"
        const b = 'https://images.unsplash.com/photo-1.webp'
        const c = "/gallery/front-view.webp"
    `
    assert.deepEqual(extractLocalAssetRefs(source), ['/gallery/front-view.webp'])
})

test('verifyAssetExistsCaseSensitive is case-sensitive on every path segment', () => {
    assert.equal(verifyAssetExistsCaseSensitive(PUBLIC_DIR, '/gallery/front-view.webp'), true)
    assert.equal(verifyAssetExistsCaseSensitive(PUBLIC_DIR, '/gallery/Front-View.webp'), false)
    assert.equal(verifyAssetExistsCaseSensitive(PUBLIC_DIR, '/Gallery/front-view.webp'), false)
    assert.equal(verifyAssetExistsCaseSensitive(PUBLIC_DIR, '/gallery/does-not-exist.webp'), false)
})

test('public/hero.mp4 has been removed from the repository', () => {
    assert.equal(fs.existsSync(path.join(process.cwd(), 'public/hero.mp4')), false)
})

test('website-data no longer references the generic hero.mp4 or an Unsplash hero background', () => {
    const source = read('src/data/website-data.ts')
    assert.doesNotMatch(source, /hero\.mp4/)
    assert.doesNotMatch(source, /images\.unsplash\.com/)
})

test('Hero component renders no <video> element and no poster/Unsplash fallback', () => {
    const source = read('src/components/Hero.tsx')
    assert.doesNotMatch(source, /<video/)
    assert.doesNotMatch(source, /poster=/)
    assert.doesNotMatch(source, /unsplash/i)
})

test('every local asset referenced in website-data.ts exists in public/ with matching case', () => {
    const source = read('src/data/website-data.ts')
    const refs = extractLocalAssetRefs(source)
    assert.ok(refs.length > 20, 'expected many local asset references in website-data.ts')
    for (const ref of refs) {
        assert.ok(
            verifyAssetExistsCaseSensitive(PUBLIC_DIR, ref),
            `missing or case-mismatched local asset: ${ref}`
        )
    }
})

test('the hero image stays within the media byte budget', () => {
    const { size } = fs.statSync(path.join(PUBLIC_DIR, 'gallery/front-view.webp'))
    assert.ok(size <= HERO_MEDIA_BYTE_BUDGET, `hero image is ${size} bytes, over the ${HERO_MEDIA_BYTE_BUDGET} byte budget`)
})
