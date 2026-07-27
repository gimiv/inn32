import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

function read(relativePath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')
}

test('robots.txt points at the canonical www sitemap', () => {
    const txt = read('public/robots.txt')
    assert.match(txt, /Sitemap:\s*https:\/\/www\.inn32\.com\/sitemap\.xml/)
})

test('robots.txt lets crawlers reach the booking page noindex directive', () => {
    const txt = read('public/robots.txt')
    assert.doesNotMatch(txt, /Disallow:\s*\/booking/)
    assert.match(read('src/app/booking/page.tsx'), /index:\s*false/)
})
