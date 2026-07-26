import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CANONICAL_ORIGIN, canonicalUrl } from './seo'

test('CANONICAL_ORIGIN is exactly the www origin, no trailing slash', () => {
    assert.equal(CANONICAL_ORIGIN, 'https://www.inn32.com')
})

test('canonicalUrl defaults to the homepage', () => {
    assert.equal(canonicalUrl(), 'https://www.inn32.com/')
})

test('canonicalUrl builds an absolute url for a given path', () => {
    assert.equal(canonicalUrl('/rooms'), 'https://www.inn32.com/rooms')
    assert.equal(canonicalUrl('/blog/lincoln-ice-castles'), 'https://www.inn32.com/blog/lincoln-ice-castles')
})
