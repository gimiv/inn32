import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sendResendEmail } from './resend'

const BASE_PARAMS = {
    apiKey: 'test-key',
    from: 'Inn 32 <noreply@inn32.com>',
    to: 'info@inn32.com',
    subject: 'New group inquiry',
    text: 'Body',
    replyTo: 'guest@example.com',
}

function withMockedFetch<T>(impl: typeof fetch, run: () => Promise<T>): Promise<T> {
    const original = globalThis.fetch
    globalThis.fetch = impl
    return run().finally(() => {
        globalThis.fetch = original
    })
}

test('returns ok:true only when Resend responds with a success status', async () => {
    const result = await withMockedFetch(
        (async (url: any, init: any) => {
            assert.equal(url, 'https://api.resend.com/emails')
            assert.equal(init.headers.Authorization, 'Bearer test-key')
            const body = JSON.parse(init.body)
            assert.deepEqual(body.to, ['info@inn32.com'])
            assert.equal(body.reply_to, 'guest@example.com')
            return new Response(JSON.stringify({ id: 'abc123' }), { status: 200 })
        }) as typeof fetch,
        () => sendResendEmail(BASE_PARAMS)
    )
    assert.deepEqual(result, { ok: true })
})

test('returns ok:false, never throws, when Resend responds with an error status', async () => {
    const result = await withMockedFetch(
        (async () => new Response('invalid api key', { status: 401 })) as typeof fetch,
        () => sendResendEmail(BASE_PARAMS)
    )
    assert.equal(result.ok, false)
    if (!result.ok) assert.match(result.error, /401/)
})

test('returns ok:false, never throws, when the network request itself fails', async () => {
    const result = await withMockedFetch(
        (async () => { throw new Error('network down') }) as typeof fetch,
        () => sendResendEmail(BASE_PARAMS)
    )
    assert.equal(result.ok, false)
    if (!result.ok) assert.match(result.error, /network down/)
})
