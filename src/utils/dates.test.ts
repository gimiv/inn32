import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isValidIsoDate, isOfferActive, filterActiveOffers, isUpcomingIsoEventDate, filterUpcomingEvents } from './dates'
import { websiteData } from '../data/website-data'

const NOW = '2026-07-26'

test('isValidIsoDate accepts strict ISO date strings', () => {
    assert.equal(isValidIsoDate('2026-07-26'), true)
    assert.equal(isValidIsoDate('2026-01-01'), true)
})

test('isValidIsoDate rejects non-ISO / vague strings', () => {
    assert.equal(isValidIsoDate('Ongoing'), false)
    assert.equal(isValidIsoDate('Winter - Spring 2026'), false)
    assert.equal(isValidIsoDate('March 2026'), false)
    assert.equal(isValidIsoDate('May 23, 2026'), false)
    assert.equal(isValidIsoDate(''), false)
    assert.equal(isValidIsoDate(undefined), false)
})

test('isValidIsoDate rejects malformed calendar dates', () => {
    assert.equal(isValidIsoDate('2026-13-01'), false)
    assert.equal(isValidIsoDate('2026-02-30'), false)
})

test('isOfferActive is true when validUntil is absent (no authoritative expiry)', () => {
    assert.equal(isOfferActive({ validUntil: undefined }, NOW), true)
})

test('isOfferActive is true when validUntil is today or in the future', () => {
    assert.equal(isOfferActive({ validUntil: '2026-07-26' }, NOW), true)
    assert.equal(isOfferActive({ validUntil: '2026-08-01' }, NOW), true)
})

test('isOfferActive is false when validUntil is in the past', () => {
    assert.equal(isOfferActive({ validUntil: '2026-04-01' }, NOW), false)
})

test('filterActiveOffers drops expired offers and keeps the rest', () => {
    const offers = [
        { id: 'expired', validUntil: '2026-01-01' },
        { id: 'future', validUntil: '2026-12-01' },
        { id: 'no-expiry' },
    ]
    const result = filterActiveOffers(offers, NOW)
    assert.deepEqual(result.map(o => o.id), ['future', 'no-expiry'])
})

test('isUpcomingIsoEventDate requires a valid ISO date on or after now', () => {
    assert.equal(isUpcomingIsoEventDate('2026-07-26', NOW), true)
    assert.equal(isUpcomingIsoEventDate('2026-08-01', NOW), true)
    assert.equal(isUpcomingIsoEventDate('2026-07-25', NOW), false)
    assert.equal(isUpcomingIsoEventDate('Ongoing', NOW), false)
    assert.equal(isUpcomingIsoEventDate('Winter - Spring 2026', NOW), false)
})

test('filterUpcomingEvents drops past and non-ISO dated events', () => {
    const events = [
        { id: 'ongoing', date: 'Ongoing' },
        { id: 'vague-range', date: 'Winter - Spring 2026' },
        { id: 'past-specific', date: 'May 23, 2026' },
        { id: 'future-iso', date: '2026-09-01' },
    ]
    const result = filterUpcomingEvents(events, NOW)
    assert.deepEqual(result.map(e => e.id), ['future-iso'])
})

test('filterUpcomingEvents returns an empty array, not stale cards, when nothing qualifies', () => {
    const events = [
        { id: 'ongoing', date: 'Ongoing' },
        { id: 'past', date: '2026-01-01' },
    ]
    assert.deepEqual(filterUpcomingEvents(events, NOW), [])
})

test('production event records never rely on vague or human-formatted dates', () => {
    assert.equal(websiteData.events.every(event => isValidIsoDate(event.date)), true)
})
