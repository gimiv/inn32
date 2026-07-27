import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateGroupInquiry } from './groupInquiry'

const VALID_INPUT = {
    firstName: 'Jamie',
    lastName: 'Rivera',
    email: 'jamie@example.com',
    phone: '(603) 555-0100',
    eventType: 'Wedding Block',
    dates: 'June 2027',
    guestCount: 20,
    message: 'Looking to book the whole property.',
    honeypot: '',
}

test('accepts a fully valid submission and normalizes it', () => {
    const result = validateGroupInquiry(VALID_INPUT)
    assert.equal(result.ok, true)
    if (result.ok) {
        assert.deepEqual(result.data, {
            firstName: 'Jamie',
            lastName: 'Rivera',
            email: 'jamie@example.com',
            phone: '(603) 555-0100',
            eventType: 'Wedding Block',
            dates: 'June 2027',
            guestCount: 20,
            message: 'Looking to book the whole property.',
        })
    }
})

test('accepts minimal valid submission with only required fields', () => {
    const result = validateGroupInquiry({
        firstName: 'Jamie',
        lastName: 'Rivera',
        email: 'jamie@example.com',
        eventType: 'Other',
    })
    assert.equal(result.ok, true)
})

test('trims whitespace from string fields', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, firstName: '  Jamie  ' })
    assert.equal(result.ok, true)
    if (result.ok) assert.equal(result.data.firstName, 'Jamie')
})

test('rejects missing required fields', () => {
    const result = validateGroupInquiry({ honeypot: '' })
    assert.equal(result.ok, false)
    if (!result.ok) {
        assert.equal(result.errors.firstName, 'First name is required.')
        assert.equal(result.errors.lastName, 'Last name is required.')
        assert.equal(result.errors.email, 'Email is required.')
        assert.equal(result.errors.eventType, 'Select a valid event type.')
    }
})

test('rejects a malformed email', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, email: 'not-an-email' })
    assert.equal(result.ok, false)
    if (!result.ok) assert.match(result.errors.email, /valid email/i)
})

test('rejects an event type outside the known set', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, eventType: 'Rave <script>' })
    assert.equal(result.ok, false)
    if (!result.ok) assert.ok(result.errors.eventType)
})

test('rejects an oversized message', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, message: 'a'.repeat(5001) })
    assert.equal(result.ok, false)
    if (!result.ok) assert.ok(result.errors.message)
})

test('rejects an oversized name', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, firstName: 'a'.repeat(81) })
    assert.equal(result.ok, false)
    if (!result.ok) assert.ok(result.errors.firstName)
})

test('rejects a guest count outside the sane range', () => {
    const tooLow = validateGroupInquiry({ ...VALID_INPUT, guestCount: 0 })
    assert.equal(tooLow.ok, false)

    const tooHigh = validateGroupInquiry({ ...VALID_INPUT, guestCount: 5000 })
    assert.equal(tooHigh.ok, false)

    const nonInteger = validateGroupInquiry({ ...VALID_INPUT, guestCount: 3.5 })
    assert.equal(nonInteger.ok, false)
})

test('rejects a phone number containing letters', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, phone: 'call-me-maybe' })
    assert.equal(result.ok, false)
    if (!result.ok) assert.ok(result.errors.phone)
})

test('rejects control characters in single-line staff-facing fields', () => {
    for (const input of [
        { ...VALID_INPUT, firstName: 'Jamie\r\nBcc: attacker@example.com' },
        { ...VALID_INPUT, lastName: 'Rivera\nForged line' },
        { ...VALID_INPUT, phone: '(603) 555-0100\r\n' },
        { ...VALID_INPUT, dates: 'June 2027\tForged' },
    ]) {
        assert.equal(validateGroupInquiry(input).ok, false)
    }
})

test('rejects submissions with a filled honeypot field, distinct from other errors', () => {
    const result = validateGroupInquiry({ ...VALID_INPUT, honeypot: 'im-a-bot' })
    assert.equal(result.ok, false)
    if (!result.ok) assert.ok(result.errors.honeypot)
})

test('rejects non-string type-confused input without throwing', () => {
    const result = validateGroupInquiry({ firstName: { toString: () => 'Jamie' }, lastName: 123, email: null, eventType: [] } as any)
    assert.equal(result.ok, false)
})
