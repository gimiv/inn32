import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { experienceHighlights } from '../data/guest-content'
import { websiteData } from '../data/website-data'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('exactly 4 experience highlights with unique ids, real images, and alt text', () => {
    assert.equal(experienceHighlights.length, 4)
    assert.equal(new Set(experienceHighlights.map(h => h.id)).size, 4)
    for (const highlight of experienceHighlights) {
        assert.match(highlight.image, /^\/gallery\//, `${highlight.id} must use a real gallery image`)
        assert.ok(fs.existsSync(path.join(process.cwd(), 'public', highlight.image)),
            `${highlight.id} image ${highlight.image} must exist on disk`)
        assert.ok(highlight.imageAlt.length > 10, `${highlight.id} needs descriptive alt text`)
    }
})

test('experience highlight copy stays within verified facts', () => {
    const copy = experienceHighlights.map(h => `${h.title} ${h.description}`).join(' ')
    assert.doesNotMatch(copy, /\d+(?:\.\d+)?[\s-]*(?:minute|min\b|mile|hour)/i)
    assert.doesNotMatch(copy, /\$\s?\d/)
    assert.doesNotMatch(copy, /\bpool\b|hot tub|premium|luxur/i)
})

test('river and fire-pit storytelling does not use the pool-forward image', () => {
    const highlight = experienceHighlights.find(h => h.id === 'river-firepit-evenings')
    assert.ok(highlight)
    assert.doesNotMatch(highlight.image, /pool/i)
})

test('experience highlights stay separate from the basic amenity inventory used by global schema', () => {
    const amenityIds = new Set(websiteData.amenities.map(a => a.id))
    for (const highlight of experienceHighlights) {
        assert.ok(!amenityIds.has(highlight.id),
            `highlight "${highlight.id}" must not collide with a schema amenity id`)
    }
    // the global LodgingBusiness schema keeps consuming the factual amenity inventory
    assert.match(read('src/app/layout.tsx'), /"amenityFeature":\s*websiteData\.amenities\.map/)
    assert.equal(websiteData.amenities.length, 6, 'basic amenity inventory must remain untouched')
})

test('ExperienceHighlights component renders highlight data as a photo-led section', () => {
    const src = read('src/components/ExperienceHighlights.tsx')
    assert.match(src, /ExperienceHighlight/)
    assert.match(src, /<Image|next\/image/)
    assert.match(src, /<h2|SectionHeader/)
})

test('ExperienceHighlights stays compact on mobile with a keyboard-accessible horizontal snap row', () => {
    const src = read('src/components/ExperienceHighlights.tsx')
    assert.match(src, /overflow-x-auto/)
    assert.match(src, /snap-x/)
    assert.match(src, /lg:grid/)
    assert.match(src, /tabIndex=\{0\}/)
    assert.match(src, /role=["']region["']/)
    assert.match(src, /aria-label=["'][^"']*experience/i)
})

test('homepage shows at most 4 highlights with a View all amenities link, between Reviews and Offers', () => {
    const src = read('src/app/page.tsx')
    assert.match(src, /<ExperienceHighlights[\s\S]*?highlights=\{experienceHighlights\}/)
    assert.match(src, /viewAllLink/)
    assert.match(src, /<Reviews[\s\S]*<ExperienceHighlights[\s\S]*<Offers/)
})

test('amenities page leads with experience highlights above the basic amenity grid', () => {
    const src = read('src/app/amenities/page.tsx')
    assert.match(src, /<ExperienceHighlights[\s\S]*<Amenities/)
    assert.doesNotMatch(src, /premium/i, 'subtitle must not claim premium amenities')
    assert.doesNotMatch(src, /common areas/i, 'no unsupported common-area claims')
})
