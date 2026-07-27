import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
    LEGACY_VERCEL_HOST,
    LEGACY_PATH_REDIRECTS,
    resolveHostCanonicalRedirect,
    resolveHomepagePaginationRedirect,
    buildNextRedirects,
} from './redirects'

test('LEGACY_PATH_REDIRECTS maps every stale path to its replacement', () => {
    assert.deepEqual(LEGACY_PATH_REDIRECTS, [
        { source: '/getting-here', destination: '/location' },
        { source: '/thingstodo', destination: '/things-to-do' },
        { source: '/history', destination: '/about' },
        { source: '/area-events', destination: '/events' },
    ])
})

test('resolveHostCanonicalRedirect redirects the exact legacy vercel host, preserving path and query', () => {
    assert.equal(
        resolveHostCanonicalRedirect(LEGACY_VERCEL_HOST, '/rooms?promo=fall'),
        'https://www.inn32.com/rooms?promo=fall'
    )
    assert.equal(resolveHostCanonicalRedirect(LEGACY_VERCEL_HOST, '/'), 'https://www.inn32.com/')
})

test('resolveHostCanonicalRedirect never redirects generic vercel preview hosts', () => {
    assert.equal(resolveHostCanonicalRedirect('inn32-git-feature-branch-someuser.vercel.app', '/'), null)
    assert.equal(resolveHostCanonicalRedirect('some-other-project.vercel.app', '/'), null)
})

test('resolveHostCanonicalRedirect never redirects the canonical host itself', () => {
    assert.equal(resolveHostCanonicalRedirect('www.inn32.com', '/'), null)
    assert.equal(resolveHostCanonicalRedirect('inn32.com', '/'), null)
})

test('resolveHomepagePaginationRedirect strips ?p=1 and preserves unrelated attribution queries', () => {
    assert.equal(resolveHomepagePaginationRedirect('/', '?p=1'), 'https://www.inn32.com/')
    assert.equal(
        resolveHomepagePaginationRedirect('/', '?p=1&utm_source=facebook&utm_medium=cpc'),
        'https://www.inn32.com/?utm_source=facebook&utm_medium=cpc'
    )
})

test('resolveHomepagePaginationRedirect does nothing when p is absent or not "1"', () => {
    assert.equal(resolveHomepagePaginationRedirect('/', '?utm_source=facebook'), null)
    assert.equal(resolveHomepagePaginationRedirect('/', '?p=2'), null)
    assert.equal(resolveHomepagePaginationRedirect('/', ''), null)
})

test('resolveHomepagePaginationRedirect never fires off the homepage', () => {
    assert.equal(resolveHomepagePaginationRedirect('/rooms', '?p=1'), null)
})

test('buildNextRedirects wires every legacy path as a permanent redirect', () => {
    const redirects = buildNextRedirects()
    for (const { source, destination } of LEGACY_PATH_REDIRECTS) {
        assert.ok(
            redirects.some(r => r.source === source && r.destination === destination && r.permanent === true),
            `missing permanent redirect for ${source}`
        )
    }
})

test('buildNextRedirects redirects only the exact legacy vercel host, preserving path via :path*', () => {
    const redirects = buildNextRedirects()
    const hostRedirect = redirects.find(r => r.source === '/:path*')
    assert.ok(hostRedirect, 'expected a wildcard host redirect')
    assert.equal(hostRedirect?.permanent, true)
    assert.deepEqual(hostRedirect?.has, [{ type: 'host', value: LEGACY_VERCEL_HOST }])
    assert.equal(hostRedirect?.destination, 'https://www.inn32.com/:path*')
})
