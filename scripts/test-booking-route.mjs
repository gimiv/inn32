import assert from 'node:assert/strict'

const baseUrl = process.env.TEST_BASE_URL || 'http://127.0.0.1:3001'
const response = await fetch(new URL('/booking', baseUrl), { redirect: 'manual' })
const body = await response.text()

assert.equal(response.status, 200, `/booking should return 200, received ${response.status}`)
assert.match(body, /Opening the secure booking engine/i)
assert.match(body, /Book your stay/i)

console.log(`Booking route verified at ${new URL('/booking', baseUrl)}`)
