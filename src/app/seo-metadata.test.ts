import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function read(relativePath: string): string {
    return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

const CONTENT_ROUTES: Array<{ file: string; routePath: string }> = [
    { file: 'src/app/page.tsx', routePath: '/' },
    { file: 'src/app/about/page.tsx', routePath: '/about' },
    { file: 'src/app/amenities/page.tsx', routePath: '/amenities' },
    { file: 'src/app/blog/page.tsx', routePath: '/blog' },
    { file: 'src/app/events/page.tsx', routePath: '/events' },
    { file: 'src/app/faq/page.tsx', routePath: '/faq' },
    { file: 'src/app/groups/page.tsx', routePath: '/groups' },
    { file: 'src/app/location/page.tsx', routePath: '/location' },
    { file: 'src/app/offers/page.tsx', routePath: '/offers' },
    { file: 'src/app/rooms/page.tsx', routePath: '/rooms' },
    { file: 'src/app/things-to-do/page.tsx', routePath: '/things-to-do' },
    { file: 'src/app/privacy/page.tsx', routePath: '/privacy' },
    { file: 'src/app/terms/page.tsx', routePath: '/terms' },
]

for (const { file, routePath } of CONTENT_ROUTES) {
    test(`${file} declares a page-specific canonical for ${routePath}`, () => {
        const src = read(file)
        const escaped = routePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        assert.match(
            src,
            new RegExp(`alternates:\\s*{\\s*canonical:\\s*canonicalUrl\\(['"]${escaped}['"]\\)`),
            `${file} is missing alternates.canonical for ${routePath}`
        )
    })

    test(`${file} declares Open Graph url/title/description/image`, () => {
        const src = read(file)
        assert.match(src, /openGraph:\s*{/, `${file} is missing an openGraph block`)
        assert.match(src, /url:\s*canonicalUrl\(/, `${file} openGraph is missing a canonical url`)
        assert.match(src, /images:\s*\[/, `${file} openGraph is missing images`)
    })

    test(`${file} declares Twitter card data`, () => {
        const src = read(file)
        assert.match(src, /twitter:\s*{/, `${file} is missing a twitter block`)
        assert.match(src, /card:\s*['"]summary_large_image['"]/, `${file} twitter card is missing`)
    })
}

test('booking page is canonical, noindex, follow (excluded from search but crawlable for link equity)', () => {
    const src = read('src/app/booking/page.tsx')
    assert.match(src, /alternates:\s*{\s*canonical:\s*canonicalUrl\(['"]\/booking['"]\)/)
    assert.match(src, /robots:\s*{\s*index:\s*false,\s*follow:\s*true/)
})
