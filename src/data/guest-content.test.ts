import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

import { fullFaqs, homepageFaqs, buildFaqJsonLd, serializeJsonLd } from './guest-content'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

// Exact distance/time claims ("5 minutes", "3 miles", "2 hours") are routing-fragile and unverified.
const FRAGILE_DISTANCE = /\d+(?:\.\d+)?[\s-]*(?:minute|min\b|mile|hour|hr\b)/i
const PRICE_CLAIM = /\$\s?\d/
const PROMO_CLAIM = /promo|discount|% off|special offer|deals|packages/i
const AVOIDED_TOPICS = /\bpets?\b|pet-friendly|\bpool\b|hot tub|cancel/i

test('full FAQ is a non-trivial unique set', () => {
    assert.ok(fullFaqs.length >= 8, `expected at least 8 full FAQs, got ${fullFaqs.length}`)
    const ids = fullFaqs.map(f => f.id)
    const questions = fullFaqs.map(f => f.question)
    assert.equal(new Set(ids).size, ids.length, 'FAQ ids must be unique')
    assert.equal(new Set(questions).size, questions.length, 'FAQ questions must be unique')
})

test('homepage FAQ is a curated 5-question subset of the full FAQ', () => {
    assert.equal(homepageFaqs.length, 5, `expected 5 homepage FAQs, got ${homepageFaqs.length}`)
    assert.equal(new Set(homepageFaqs.map(f => f.id)).size, homepageFaqs.length)
    for (const faq of homepageFaqs) {
        assert.ok(fullFaqs.some(f => f.id === faq.id && f.question === faq.question && f.answer === faq.answer),
            `homepage FAQ "${faq.id}" must exist verbatim in the full FAQ`)
    }
})

test('FAQ copy contains no fragile distance/time, price, or promotion claims', () => {
    for (const faq of fullFaqs) {
        const copy = `${faq.question} ${faq.answer}`
        assert.doesNotMatch(copy, FRAGILE_DISTANCE, `FAQ "${faq.id}" contains an exact distance/time claim`)
        assert.doesNotMatch(copy, PRICE_CLAIM, `FAQ "${faq.id}" contains a price claim`)
        assert.doesNotMatch(copy, PROMO_CLAIM, `FAQ "${faq.id}" contains a promotion claim`)
    }
})

test('FAQ copy omits unverifiable topics (pets, pool/hot tub, cancellation)', () => {
    for (const faq of fullFaqs) {
        assert.doesNotMatch(`${faq.question} ${faq.answer}`, AVOIDED_TOPICS,
            `FAQ "${faq.id}" touches a topic we intentionally omit`)
    }
})

test('buildFaqJsonLd emits an FAQPage whose entities exactly mirror the given FAQs', () => {
    const jsonLd = buildFaqJsonLd(homepageFaqs)
    assert.equal(jsonLd['@context'], 'https://schema.org')
    assert.equal(jsonLd['@type'], 'FAQPage')
    assert.equal(jsonLd.mainEntity.length, homepageFaqs.length)
    homepageFaqs.forEach((faq, i) => {
        assert.equal(jsonLd.mainEntity[i]['@type'], 'Question')
        assert.equal(jsonLd.mainEntity[i].name, faq.question)
        assert.equal(jsonLd.mainEntity[i].acceptedAnswer['@type'], 'Answer')
        assert.equal(jsonLd.mainEntity[i].acceptedAnswer.text, faq.answer)
    })
})

test('serializeJsonLd escapes tag-opening characters before script injection', () => {
    const serialized = serializeJsonLd({ text: '</script><img src=x>' })
    assert.doesNotMatch(serialized, /</)
    assert.match(serialized, /\\u003c\/script>/)
})

test('/faq page renders the central FAQ data and safely serialized schema helper, not a local copy', () => {
    const src = read('src/app/faq/page.tsx')
    assert.match(src, /from ['"].*data\/guest-content['"]/)
    assert.match(src, /fullFaqs/)
    assert.match(src, /buildFaqJsonLd/)
    assert.match(src, /serializeJsonLd/)
    assert.doesNotMatch(src, /JSON\.stringify\(faqJsonLd\)/)
    assert.doesNotMatch(src, /const faqs\s*=\s*\[/, '/faq must not keep a local FAQ array')
    assert.doesNotMatch(src, FRAGILE_DISTANCE)
    assert.doesNotMatch(src, PRICE_CLAIM)
})

test('touched About location copy carries no exact drive-time/distance claims', () => {
    const src = read('src/app/about/page.tsx')
    assert.doesNotMatch(src, /\d+\s*minutes?/i)
    assert.doesNotMatch(src, /\d+\s*miles?/i)
})
