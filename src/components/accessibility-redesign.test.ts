import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('PageLayout does not create a nested main landmark inside the root layout main', () => {
    const source = read('src/components/ui/PageLayout.tsx')
    assert.doesNotMatch(source, /<main\b/)
    assert.doesNotMatch(source, /<\/main>/)
})

test('mobile booking bar is a labeled complementary landmark', () => {
    const source = read('src/components/Navigation.tsx')
    assert.match(source, /<aside[\s\S]*aria-label="Booking controls"[\s\S]*mobile-booking-bar/)
    assert.match(source, /<\/aside>/)
})

test('Footer section headings do not skip directly to h4', () => {
    const source = read('src/components/Footer.tsx')
    assert.doesNotMatch(source, /<\/?h4\b/)
    assert.match(source, /<h2[^>]*>Contact<\/h2>/)
    assert.match(source, /<h2[^>]*>Navigate<\/h2>/)
})

test('rooms and group benefits establish an h2 before card h3 headings', () => {
    const rooms = read('src/app/rooms/page.tsx')
    const groups = read('src/components/GroupReservations.tsx')
    assert.match(rooms, /<h2[^>]*>Available room types<\/h2>[\s\S]*<RoomList/)
    assert.match(groups, /<h2[^>]*>Group stay options<\/h2>[\s\S]*benefits\.map/)
})

test('desktop utility content sits inside the site header landmark', () => {
    const source = read('src/components/Navigation.tsx')
    assert.match(source, /<header className="fixed inset-x-0 top-0 z-50">[\s\S]*<nav/)
    assert.match(source, /<\/header>/)
})

test('small group labels use the AA-safe redesign accent instead of mountain-blue', () => {
    const source = read('src/components/GroupReservations.tsx')
    assert.doesNotMatch(source, /text-mountain-blue/)
    assert.match(source, /text-rust[\s\S]*Group Accommodations/)
})
