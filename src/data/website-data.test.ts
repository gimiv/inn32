import { test } from 'node:test'
import assert from 'node:assert/strict'
import { websiteData } from './website-data'
import { isValidIsoDate } from '../utils/dates'

test('every offer validUntil, when present, is a strict ISO date', () => {
    for (const offer of websiteData.offers) {
        if (offer.validUntil !== undefined) {
            assert.equal(
                isValidIsoDate(offer.validUntil),
                true,
                `offer "${offer.id}" has non-ISO validUntil: ${offer.validUntil}`
            )
        }
    }
})

test('room images never reference the mis-cased Sunroom.webp path', () => {
    const allImages = websiteData.roomTypes.flatMap(r => r.images)
    assert.ok(!allImages.includes('/gallery/Sunroom.webp'))
    assert.ok(allImages.includes('/gallery/sunroom.webp'))
})

test('things-to-do links never reference known-404 external URLs', () => {
    const knownBadLinks = [
        'https://www.alltrails.com/trail/us/new-hampshire/mount-moosilauke-via-gorge-brook-and-moosilauke-carriage-trail',
        'https://www.kancamagushighway.com/hiking/',
    ]
    const links = websiteData.thingsToDo.map(t => t.link).filter((link): link is string => Boolean(link))
    for (const bad of knownBadLinks) {
        assert.ok(!links.includes(bad), `stale 404 link still present: ${bad}`)
    }
})
