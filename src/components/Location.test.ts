import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

function read(relativePath: string): string {
    return fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')
}

test('Location does not statically import the Google Maps SDK (it must load lazily)', () => {
    const source = read('src/components/Location.tsx')
    assert.doesNotMatch(source, /^import[^\n]*@vis\.gl\/react-google-maps/m)
})

test('Location loads the interactive map lazily via next/dynamic with no SSR', () => {
    const source = read('src/components/Location.tsx')
    assert.match(source, /next\/dynamic/)
    assert.match(source, /ssr:\s*false/)
})

test('Location renders an accessible control to explicitly show the interactive map', () => {
    const source = read('src/components/Location.tsx')
    assert.match(source, /Show interactive map/i)
})

test('Location always renders a directions link that works without the map', () => {
    const source = read('src/components/Location.tsx')
    assert.match(source, /google\.com\/maps\/dir\/\?api=1&destination=/)
})

test('Location keeps directions usable when the Maps API key is absent', () => {
    const source = read('src/components/Location.tsx')
    assert.match(source, /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY/)
    assert.match(source, /unavailable/i)
})

test('the Google Maps embed never uses greedy gesture handling', () => {
    const source = read('src/components/GoogleMapEmbed.tsx')
    assert.doesNotMatch(source, /gestureHandling[^,]*greedy/)
})

test('the Google Maps embed uses cooperative gesture handling so mobile page scroll is never trapped', () => {
    const source = read('src/components/GoogleMapEmbed.tsx')
    assert.match(source, /gestureHandling[^,]*cooperative/)
})
