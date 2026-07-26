import { test } from 'node:test'
import assert from 'node:assert/strict'
import { POST } from './route'

const ORIGIN = 'https://inn32.com'
const URL_STR = `${ORIGIN}/api/group-inquiry`

const VALID_BODY = {
    firstName: 'Jamie',
    lastName: 'Rivera',
    email: 'jamie@example.com',
    eventType: 'Wedding Block',
    guestCount: 20,
    honeypot: '',
}

let ipCounter = 0
function freshIp(): string {
    ipCounter += 1
    return `203.0.113.${ipCounter}`
}

function makeRequest(body: unknown, opts: { origin?: string | null; ip?: string; rawBody?: string } = {}): Request {
    const headers = new Headers({ 'content-type': 'application/json' })
    if (opts.origin !== null) headers.set('origin', opts.origin ?? ORIGIN)
    headers.set('x-forwarded-for', opts.ip ?? freshIp())
    return new Request(URL_STR, {
        method: 'POST',
        headers,
        body: opts.rawBody ?? JSON.stringify(body),
    })
}

function withEnv<T>(env: Record<string, string | undefined>, run: () => Promise<T>): Promise<T> {
    const original: Record<string, string | undefined> = {}
    for (const key of Object.keys(env)) {
        original[key] = process.env[key]
        if (env[key] === undefined) delete process.env[key]
        else process.env[key] = env[key]
    }
    return run().finally(() => {
        for (const key of Object.keys(original)) {
            if (original[key] === undefined) delete process.env[key]
            else process.env[key] = original[key]
        }
    })
}

function withMockedFetch<T>(impl: typeof fetch, run: () => Promise<T>): Promise<T> {
    const original = globalThis.fetch
    globalThis.fetch = impl
    return run().finally(() => {
        globalThis.fetch = original
    })
}

test('valid delivery: returns ok:true only when the provider confirms success', async () => {
    await withEnv({ RESEND_API_KEY: 'key', GROUP_INQUIRY_TO: 'info@inn32.com', GROUP_INQUIRY_FROM: 'Inn 32 <noreply@inn32.com>' }, () =>
        withMockedFetch(
            (async () => new Response(JSON.stringify({ id: 'abc' }), { status: 200 })) as typeof fetch,
            async () => {
                const res = await POST(makeRequest(VALID_BODY))
                const json = await res.json()
                assert.equal(res.status, 200)
                assert.equal(json.ok, true)
            }
        )
    )
})

test('invalid input: returns structured errors and never claims success', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, email: 'not-an-email' }))
    const json = await res.json()
    assert.equal(res.status, 400)
    assert.equal(json.ok, false)
    assert.ok(json.errors && json.errors.email)
})

test('honeypot: rejects the submission without claiming success', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, honeypot: 'im-a-bot' }))
    const json = await res.json()
    assert.equal(res.status, 400)
    assert.equal(json.ok, false)
})

test('missing configuration: returns a non-success response, never a false success', async () => {
    await withEnv({ RESEND_API_KEY: undefined, GROUP_INQUIRY_FROM: undefined }, async () => {
        const res = await POST(makeRequest(VALID_BODY))
        const json = await res.json()
        assert.equal(res.status, 503)
        assert.equal(json.ok, false)
    })
})

test('provider failure: returns a non-success response when Resend errors', async () => {
    await withEnv({ RESEND_API_KEY: 'key', GROUP_INQUIRY_TO: 'info@inn32.com', GROUP_INQUIRY_FROM: 'Inn 32 <noreply@inn32.com>' }, () =>
        withMockedFetch(
            (async () => new Response('bad request', { status: 400 })) as typeof fetch,
            async () => {
                const res = await POST(makeRequest(VALID_BODY))
                const json = await res.json()
                assert.equal(res.status, 502)
                assert.equal(json.ok, false)
            }
        )
    )
})

test('rejects cross-origin submissions', async () => {
    const res = await POST(makeRequest(VALID_BODY, { origin: 'https://evil.example.com' }))
    const json = await res.json()
    assert.equal(res.status, 403)
    assert.equal(json.ok, false)
})

test('rejects malformed JSON bodies', async () => {
    const res = await POST(makeRequest(null, { rawBody: '{not json' }))
    const json = await res.json()
    assert.equal(res.status, 400)
    assert.equal(json.ok, false)
})

test('rejects oversized payloads', async () => {
    const res = await POST(makeRequest({ ...VALID_BODY, message: 'a'.repeat(50_000) }))
    const json = await res.json()
    assert.equal(res.status, 413)
    assert.equal(json.ok, false)
})

test('rate limits repeated submissions from the same client', async () => {
    const ip = freshIp()
    let lastStatus = 200
    for (let i = 0; i < 10; i += 1) {
        const res = await POST(makeRequest({ ...VALID_BODY, email: 'not-an-email' }, { ip }))
        lastStatus = res.status
    }
    assert.equal(lastStatus, 429)
})
