import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { websiteData } from '../data/website-data'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('hero is shorter than a full viewport on standard desktop', () => {
    const src = read('src/components/Hero.tsx')
    assert.doesNotMatch(src, /\bh-screen\b/)
    assert.doesNotMatch(src, /\bmin-h-screen\b/)
})

test('hero renders the eyebrow, verified heading, and dispatches the Mews booking widget', () => {
    const src = read('src/components/Hero.tsx')
    assert.match(src, /hero\.content\.eyebrow|content\.eyebrow|eyebrow/)
    assert.match(src, /open-booking-widget/)
    assert.match(src, /secondaryCtaText/)
})

test('hero copy in website-data states only verified facts', () => {
    const { heading, subheading, eyebrow } = websiteData.sections.hero.content
    assert.ok(heading)
    assert.ok(subheading)
    assert.ok(eyebrow)
    assert.equal(heading, 'Main Street. River behind. Mountains ahead.')
    assert.equal(eyebrow, 'North Woodstock, New Hampshire')
    assert.match(subheading, /24 rooms/)
    assert.match(subheading, /reimagined in 2025/)
    assert.match(subheading, /Main Street/)
    assert.match(subheading, /North Woodstock/)
    assert.match(subheading, /White Mountains/)
    assert.doesNotMatch(subheading, /award|spa|luxur|five-star|pool|shuttle|free breakfast/i)
})

test('hero keeps the real property photo, truthful alt text, and the View Rooms room action', () => {
    const src = read('src/components/Hero.tsx')
    assert.match(src, /alt="Inn 32/)
    assert.doesNotMatch(src, /dusk|illuminated/i)
    assert.equal(websiteData.sections.hero.content.secondaryCtaText, 'View Rooms')
})

test('hero image carries a top scrim behind the transparent navigation', () => {
    const src = read('src/components/Hero.tsx')
    assert.match(src, /bg-gradient-to-b/)
    assert.match(src, /from-spruce\/\d+/)
    assert.match(src, /to-transparent/)
    assert.match(src, /aria-hidden="true"/)
})
