import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function read(relativePath: string): string {
    return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

test('privacy and terms pages exist with conservative booking and data disclosures', () => {
    const privacy = read('src/app/privacy/page.tsx')
    const terms = read('src/app/terms/page.tsx')

    assert.match(privacy, /Mews/i)
    assert.match(privacy, /group inquir/i)
    assert.match(terms, /booking-specific terms/i)
    assert.match(terms, /Mews/i)
    assert.doesNotMatch(terms, /non-refundable|guaranteed refund/i)
})

test('footer links to privacy and terms pages', () => {
    const footer = read('src/components/Footer.tsx')
    assert.match(footer, /href=["']\/privacy["']/)
    assert.match(footer, /href=["']\/terms["']/)
})
