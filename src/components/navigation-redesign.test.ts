import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('Navigation exposes a desktop-only utility line with verified phone and location', () => {
    const src = read('src/components/Navigation.tsx')
    assert.match(src, /hidden lg:flex[^"']*/, 'utility line must be desktop-only')
    assert.match(src, /\{!isScrolled && \([\s\S]*property\.contact\.phone/, 'collapsed utility content must leave the DOM and tab order')
    assert.doesNotMatch(src, /max-h-0|opacity-0 py-0/, 'do not visually collapse focusable utility content')
    assert.match(src, /property\.contact\.phone/)
    assert.match(src, /property\.address\.city/)
})

test('Navigation and Footer adopt the Mountain Main Street shell palette', () => {
    const nav = read('src/components/Navigation.tsx')
    const footer = read('src/components/Footer.tsx')
    assert.match(nav, /spruce|linen/)
    assert.match(footer, /spruce/)
})

test('mobile booking bar keeps its Mews dispatch and safety contract intact', () => {
    const src = read('src/components/Navigation.tsx')
    assert.match(src, /mobile-booking-bar/)
    assert.match(src, /setIsBookingOpen\(true\)/)
    assert.match(src, />Check live rates</)
})
