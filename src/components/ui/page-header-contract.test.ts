import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('PageHeader keeps a single semantic h1 and responsive title sizing', () => {
    const src = read('src/components/ui/PageHeader.tsx')
    assert.equal((src.match(/<h1/g) || []).length, 1)
    assert.match(src, /text-page-title|md:text-5xl/)
})

test('PageLayout clears the fixed shell on mobile and desktop without changing the children contract', () => {
    const src = read('src/components/ui/PageLayout.tsx')
    assert.match(src, /pt-\[\d+px\]/)
    assert.match(src, /<div className="flex-grow pt-10 md:pt-16 pb-20">/)
    assert.doesNotMatch(src, /<main\b/)
    assert.match(src, /\{children\}/)
})

test('PageHeader and PageLayout carry the Mountain Main Street palette, not the prior plain slate shell', () => {
    const header = read('src/components/ui/PageHeader.tsx')
    assert.match(header, /spruce|linen/)
})
