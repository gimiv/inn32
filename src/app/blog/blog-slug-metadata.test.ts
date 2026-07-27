import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

function read(relativePath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')
}

test('blog article generateMetadata sets a page-specific canonical, Open Graph, and Twitter data', () => {
    const src = read('src/app/blog/[slug]/page.tsx')
    assert.match(src, /alternates:\s*{\s*canonical:\s*canonicalUrl\(`\/blog\/\$\{slug\}`\)/)
    assert.match(src, /openGraph:\s*{/)
    assert.match(src, /twitter:\s*{/)
    assert.match(src, /card:\s*['"]summary_large_image['"]/)
})

test('blog article JSON-LD uses the www canonical origin', () => {
    const src = read('src/app/blog/[slug]/page.tsx')
    assert.doesNotMatch(src, /https:\/\/inn32\.com/)
    assert.match(src, /canonicalUrl\(/)
})
