import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('InsiderGuide renders compact curated link panels from central guest content', () => {
    const src = read('src/components/InsiderGuide.tsx')
    assert.match(src, /from ['"]\.\.\/data\/guest-content['"]/)
    assert.match(src, /resolveInsiderGuide/)
    assert.match(src, /next\/link/)
    assert.match(src, /<ul/)
    assert.doesNotMatch(src, /ImageCard/, 'the curated guide must not duplicate the full photo-card browser below')
    assert.doesNotMatch(src, /^['"]use client['"]/, 'InsiderGuide must be a server component')
})

test('InsiderGuide never turns missing destinations into self-links and announces new tabs', () => {
    const src = read('src/components/InsiderGuide.tsx')
    assert.doesNotMatch(src, /thing\.link\s*\|\|\s*['"]\/things-to-do['"]/)
    assert.match(src, /thing\.link\s*\?/, 'linked and unlinked picks must render differently')
    assert.match(src, /opens in a new tab/i)
})

test('InsiderGuide uses a distinct section heading beneath the page title', () => {
    const src = read('src/components/InsiderGuide.tsx')
    assert.match(src, /Pick Your Kind of Day/)
    assert.doesNotMatch(src, />\s*Inn 32 Insider Guide\s*</)
})

test('InsiderGuide tells guests to verify hours and seasonality with venues', () => {
    const src = read('src/components/InsiderGuide.tsx')
    assert.match(src, /hours and seasonal/i)
    assert.match(src, /directly/i)
})

test('/things-to-do is the Inn 32 Insider Guide with the full browser retained below', () => {
    const src = read('src/app/things-to-do/page.tsx')
    assert.match(src, /Inn 32 Insider Guide/)
    assert.match(src, /<InsiderGuide/)
    assert.match(src, /<InsiderGuide[\s\S]*<ThingsToDo/, 'curated guide must come before the full category browser')
    assert.match(src, /<ThingsToDo\s+thingsToDo=\{websiteData\.thingsToDo\}/, 'full existing browser must be retained')
    assert.doesNotMatch(src, /Browse Everything/, 'the browser component already provides its own heading')
    assert.match(src, /canonicalUrl\(['"]\/things-to-do['"]\)/, 'route and canonical must not change')
})
