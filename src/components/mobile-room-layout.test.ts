import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

test('mobile booking bar is compact, safe-area aware, and does not obscure page endings', () => {
    const navigation = read('src/components/Navigation.tsx')
    const styles = read('src/index.css')

    assert.match(navigation, /mobile-booking-bar/)
    assert.match(navigation, /min-h-16/)
    assert.match(navigation, />Check live rates</)
    assert.doesNotMatch(navigation, />Book Your Stay</, 'the sticky bar must not spend a second line on an eyebrow')
    assert.match(styles, /\.mobile-booking-bar[\s\S]*safe-area-inset-bottom/)
    assert.match(navigation, /document\.body\.classList\.toggle\(['"]has-mobile-booking-bar['"],\s*isScrolled\)/)
    assert.match(styles, /body\.has-mobile-booking-bar[\s\S]*padding-bottom:\s*calc\(4rem \+ env\(safe-area-inset-bottom\)\)/)
    assert.doesNotMatch(styles, /@media[\s\S]*?\n\s*body\s*\{[\s\S]*?padding-bottom/, 'mobile body padding must not be unconditional')
})

test('room cards and bounded room intros use compact mobile geometry', () => {
    const roomList = read('src/components/RoomList.tsx')
    const roomCard = read('src/components/ui/RoomCard.tsx')
    const standardCard = read('src/components/ui/StandardCard.tsx')
    const carousel = read('src/components/ui/CarouselWrapper.tsx')

    assert.match(roomList, /py-12 md:py-20/, 'the homepage room section must shed excess mobile padding')
    assert.match(roomCard, /compactOnMobile/, 'room cards must opt into compact mobile geometry')
    assert.match(standardCard, /compactOnMobile\s*\?\s*["']h-48 md:h-64["']/, 'room images must be shorter on mobile')
    assert.match(standardCard, /compactOnMobile\s*\?\s*["']p-5 md:p-8["']/, 'room content must use compact mobile padding')
    assert.match(standardCard, /line-clamp-2 md:line-clamp-3/, 'room descriptions must be concise on mobile')
    assert.match(carousel, /className=\{mobileStack\s*\?\s*["']mb-8 md:mb-12["']/, 'the mobile room heading must sit closer to the first card')
})

test('bounded room sections stack complete cards on mobile and retain the desktop carousel', () => {
    const roomList = read('src/components/RoomList.tsx')
    const contentSection = read('src/components/ui/ContentSection.tsx')
    const carousel = read('src/components/ui/CarouselWrapper.tsx')

    assert.match(roomList, /limit\s*\?\s*roomTypes\.slice\(0,\s*limit\)/, 'the homepage limit must actually cap room cards')
    assert.match(roomList, /mobileStack=\{!!limit\}/, 'bounded room sections must request the mobile stack')
    assert.match(contentSection, /mobileStack=\{mobileStack\}/, 'ContentSection must forward the responsive layout contract')
    assert.match(carousel, /breakpoints[\s\S]*max-width:\s*767px[\s\S]*active:\s*!mobileStack/, 'Embla must be disabled when the mobile stack is active')
    assert.match(carousel, /grid gap-6 md:flex/, 'one room-card tree must switch from a mobile grid to a desktop carousel')
    assert.equal((carousel.match(/items\.map/g) || []).length, 1, 'room cards must not be duplicated into separate mobile and desktop DOM trees')
})
