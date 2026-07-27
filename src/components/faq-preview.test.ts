import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('FaqPreview renders curated FAQs without duplicating /faq structured data', () => {
    const src = read('src/components/FaqPreview.tsx')
    assert.match(src, /from ['"]\.\.\/data\/guest-content['"]/)
    assert.match(src, /homepageFaqs/)
    assert.doesNotMatch(src, /buildFaqJsonLd|application\/ld\+json/,
        'FAQPage structured data belongs only on the canonical /faq page')
})

test('FaqPreview uses native disclosure semantics that work without JavaScript', () => {
    const src = read('src/components/FaqPreview.tsx')
    assert.match(src, /<details/)
    assert.match(src, /<summary/)
    assert.match(src, /webkit-details-marker/)
    assert.doesNotMatch(src, /^['"]use client['"]/, 'FaqPreview must be a server component')
    assert.doesNotMatch(src, /useState|useEffect/, 'FaqPreview must not depend on client JS')
})

test('FaqPreview links to the full FAQ page and has a semantic section heading', () => {
    const src = read('src/components/FaqPreview.tsx')
    assert.match(src, /href=["']\/faq["']/)
    assert.match(src, /<h2|SectionHeader/)
})

test('homepage integrates the FAQ preview after Location without a duplicate social gallery', () => {
    const src = read('src/app/page.tsx')
    assert.match(src, /<FaqPreview\s*\/>/)
    assert.match(src, /<Location[\s\S]*<FaqPreview/)
    assert.doesNotMatch(src, /<SocialReel|import SocialReel/)
})
