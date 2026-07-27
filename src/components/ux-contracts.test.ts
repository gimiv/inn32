import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

test('Navigation renders the shared primary, secondary, and mobile link sets without weather duplication', () => {
    const source = read('src/components/Navigation.tsx')
    assert.match(source, /PRIMARY_NAV_LINKS\.map/)
    assert.match(source, /SECONDARY_NAV_LINKS\.map/)
    assert.match(source, /ALL_NAV_LINKS\.map/)
    assert.doesNotMatch(source, /<Temperature\b/)
})

test('Navigation exposes menu state and keyboard/focus behavior', () => {
    const source = read('src/components/Navigation.tsx')
    assert.match(source, /aria-expanded=/)
    assert.match(source, /aria-controls=/)
    assert.match(source, /key === ['"]Escape['"]/)
    assert.match(source, /key\s*(?:===|!==)\s*['"]Tab['"]/)
    assert.match(source, /\.focus\(\)/)
    assert.match(source, /role=['"]dialog['"]/)
    assert.match(source, /inert=\{isMobileMenuOpen\}/)
    assert.match(source, /aria-hidden=\{isMobileMenuOpen\}/)
})

test('BookingWidget labels Mews iframes and observes late-created frames', () => {
    const source = read('src/components/BookingWidget.tsx')
    assert.match(source, /MutationObserver/)
    assert.match(source, /setAttribute\(['"]title['"],\s*MEWS_IFRAME_TITLE\)/)
    assert.match(source, /observer\.disconnect\(\)/)
})

test('homepage keeps discovery modules intentionally bounded', () => {
    const source = read('src/app/page.tsx')
    assert.match(source, /<Reviews\s+limit=\{3\}/)
    assert.match(source, /<Offers\s+limit=\{3\}/)
    assert.match(source, /<Events\s+limit=\{3\}/)
    assert.match(source, /<ThingsToDo\s+limit=\{6\}/)
    assert.match(source, /websiteData\.gallery\.slice\(0,\s*8\)/)
    assert.doesNotMatch(source, /<SocialReel|import SocialReel/, 'Gallery is the single homepage image-discovery module')
})

test('hero alt text is truthful daylight property description', () => {
    const source = read('src/components/Hero.tsx')
    assert.match(source, /^['"]use client['"]/)
    assert.match(source, /alt="Inn 32/)
    assert.doesNotMatch(source, /dusk|illuminated/i)
})

test('small offer and event actions use an AA-safe blue on light backgrounds', () => {
    for (const file of ['src/components/Offers.tsx', 'src/components/Events.tsx']) {
        const source = read(file)
        assert.doesNotMatch(source, /text-mountain-blue/)
        assert.match(source, /text-blue-700/)
    }
})

test('shared homepage labels and card actions avoid the failing mountain-blue token', () => {
    for (const file of [
        'src/components/ui/SectionHeader.tsx',
        'src/components/ui/ImageCard.tsx',
        'src/components/SocialReel.tsx',
    ]) {
        assert.doesNotMatch(read(file), /text-mountain-blue/)
    }
    assert.doesNotMatch(
        read('src/components/Location.tsx'),
        /text-sm text-gray-500 dark:text-gray-400 max-w-xs/
    )
})
