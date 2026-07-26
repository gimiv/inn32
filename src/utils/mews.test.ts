import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isValidMewsCategoryId, resolveMewsOpenCall } from './mews'

test('isValidMewsCategoryId accepts a well-formed UUID', () => {
    assert.equal(isValidMewsCategoryId('8834fbb1-b9a1-4dbf-8e18-b2ba003e2e3d'), true)
    assert.equal(isValidMewsCategoryId('8834FBB1-B9A1-4DBF-8E18-B2BA003E2E3D'), true)
})

test('isValidMewsCategoryId rejects local room slugs and other non-UUID strings', () => {
    assert.equal(isValidMewsCategoryId('standard-single'), false)
    assert.equal(isValidMewsCategoryId('2-bed-apt'), false)
    assert.equal(isValidMewsCategoryId('not-a-uuid'), false)
    assert.equal(isValidMewsCategoryId(''), false)
    assert.equal(isValidMewsCategoryId(undefined), false)
})

test('resolveMewsOpenCall falls back to generic open() with no category id', () => {
    assert.deepEqual(resolveMewsOpenCall(undefined), { method: 'open' })
})

test('resolveMewsOpenCall never forwards a local room slug to Mews', () => {
    for (const localSlug of ['standard-single', 'standard-queen', 'riverside-queen', '2-bed-apt', '4-bed-apt']) {
        assert.deepEqual(resolveMewsOpenCall(localSlug), { method: 'open' })
    }
})

test('resolveMewsOpenCall falls back to open() for a malformed id', () => {
    assert.deepEqual(resolveMewsOpenCall('12345'), { method: 'open' })
})

test('resolveMewsOpenCall uses showRates only for a validated Mews UUID', () => {
    const categoryId = '8834fbb1-b9a1-4dbf-8e18-b2ba003e2e3d'
    assert.deepEqual(resolveMewsOpenCall(categoryId), { method: 'showRates', categoryId })
})
