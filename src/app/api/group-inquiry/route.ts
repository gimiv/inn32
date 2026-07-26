import { validateGroupInquiry, type GroupInquiryInput, type NormalizedGroupInquiry } from '../../../utils/groupInquiry'
import { sendResendEmail } from '../../../lib/resend'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 20_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

/**
 * Best-effort only. This Map lives in a single serverless function
 * instance's memory. On Vercel, cold starts and concurrent instances each
 * get their own copy, so this does NOT provide durable rate limiting across
 * the deployment — it only throttles repeated requests hitting the same
 * warm instance. A shared store (e.g. Upstash/Redis) would be needed for a
 * durable limit; out of scope for this pass.
 */
const rateLimitState = new Map<string, { count: number; windowStart: number }>()

function isRateLimited(clientId: string): boolean {
    const now = Date.now()
    const entry = rateLimitState.get(clientId)
    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitState.set(clientId, { count: 1, windowStart: now })
        return false
    }
    entry.count += 1
    return entry.count > RATE_LIMIT_MAX_REQUESTS
}

function getClientId(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) return forwarded.split(',')[0].trim()
    return 'unknown'
}

function refererOrigin(request: Request): string | null {
    const referer = request.headers.get('referer')
    if (!referer) return null
    try {
        return new URL(referer).origin
    } catch {
        return null
    }
}

function isSameOrigin(request: Request): boolean {
    const origin = request.headers.get('origin') ?? refererOrigin(request)
    if (!origin) return false
    try {
        return new URL(origin).origin === new URL(request.url).origin
    } catch {
        return false
    }
}

function json(body: unknown, status: number): Response {
    return Response.json(body, { status })
}

function buildEmailText(data: NormalizedGroupInquiry): string {
    return [
        `Name: ${data.firstName} ${data.lastName}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Event type: ${data.eventType}`,
        data.dates ? `Estimated dates: ${data.dates}` : null,
        data.guestCount ? `Estimated guests: ${data.guestCount}` : null,
        data.message ? `Message:\n${data.message}` : null,
    ]
        .filter((line): line is string => line !== null)
        .join('\n')
}

export async function POST(request: Request): Promise<Response> {
    if (!isSameOrigin(request)) {
        return json({ ok: false, message: 'Request rejected.' }, 403)
    }

    if (isRateLimited(getClientId(request))) {
        return json({ ok: false, message: 'Too many requests. Please try again later.' }, 429)
    }

    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_BYTES) {
        return json({ ok: false, message: 'Request too large.' }, 413)
    }

    let parsed: unknown
    try {
        parsed = rawBody ? JSON.parse(rawBody) : {}
    } catch {
        return json({ ok: false, message: 'Invalid request body.' }, 400)
    }

    const result = validateGroupInquiry((parsed ?? {}) as GroupInquiryInput)
    if (!result.ok) {
        return json({ ok: false, errors: result.errors }, 400)
    }

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.GROUP_INQUIRY_FROM
    const to = process.env.GROUP_INQUIRY_TO || 'info@inn32.com'

    if (!apiKey || !from) {
        console.error('Group inquiry: missing RESEND_API_KEY or GROUP_INQUIRY_FROM environment configuration.')
        return json(
            { ok: false, message: 'Group inquiries are temporarily unavailable online. Please call or email us directly.' },
            503
        )
    }

    const { data } = result
    const subject = `New group inquiry: ${data.eventType} — ${data.firstName} ${data.lastName}`

    const sendResult = await sendResendEmail({
        apiKey,
        from,
        to,
        subject,
        text: buildEmailText(data),
        replyTo: data.email,
    })

    if (!sendResult.ok) {
        console.error('Group inquiry: Resend delivery failed:', sendResult.error)
        return json(
            { ok: false, message: 'We could not send your inquiry right now. Please call or email us directly.' },
            502
        )
    }

    return json({ ok: true }, 200)
}
