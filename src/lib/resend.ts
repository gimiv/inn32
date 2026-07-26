export interface ResendEmailParams {
    apiKey: string
    from: string
    to: string
    subject: string
    text: string
    replyTo?: string
}

export type SendEmailResult = { ok: true } | { ok: false; error: string }

/**
 * Thin wrapper around the Resend REST API using the built-in fetch — no SDK
 * dependency. Never throws: callers get a structured result either way, so
 * the API route can decide what to tell the user without guessing at success.
 */
export async function sendResendEmail(params: ResendEmailParams): Promise<SendEmailResult> {
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${params.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: params.from,
                to: [params.to],
                subject: params.subject,
                text: params.text,
                reply_to: params.replyTo,
            }),
        })

        if (!response.ok) {
            const body = await response.text().catch(() => '')
            return { ok: false, error: `Resend API responded with ${response.status}: ${body}` }
        }

        return { ok: true }
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : 'Unknown error calling Resend API' }
    }
}
