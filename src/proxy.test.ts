import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NextRequest } from 'next/server'
import { getRedirectUrl } from 'next/experimental/testing/server'
import { proxy, config } from './proxy'

test('proxy strips ?p=1 from the homepage while keeping other query params', () => {
    const request = new NextRequest('https://www.inn32.com/?p=1&utm_source=facebook')
    const response = proxy(request)
    assert.equal(getRedirectUrl(response), 'https://www.inn32.com/?utm_source=facebook')
})

test('proxy leaves the homepage alone when there is no ?p=1', () => {
    const request = new NextRequest('https://www.inn32.com/?utm_source=facebook')
    const response = proxy(request)
    assert.equal(getRedirectUrl(response), null)
})

test('proxy leaves non-homepage routes alone', () => {
    const request = new NextRequest('https://www.inn32.com/rooms?p=1')
    const response = proxy(request)
    assert.equal(getRedirectUrl(response), null)
})

test('proxy matcher is scoped to the homepage only', () => {
    assert.deepEqual(config, { matcher: '/' })
})
