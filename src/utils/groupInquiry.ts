export interface GroupInquiryInput {
    firstName?: unknown
    lastName?: unknown
    email?: unknown
    phone?: unknown
    eventType?: unknown
    dates?: unknown
    guestCount?: unknown
    message?: unknown
    honeypot?: unknown
}

export interface NormalizedGroupInquiry {
    firstName: string
    lastName: string
    email: string
    phone?: string
    eventType: string
    dates?: string
    guestCount?: number
    message?: string
}

export type GroupInquiryValidationResult =
    | { ok: true; data: NormalizedGroupInquiry }
    | { ok: false; errors: Record<string, string> }

export const GROUP_INQUIRY_EVENT_TYPES = [
    'Wedding Block',
    'Corporate Retreat',
    'Family Reunion',
    'Social Event',
    'Other',
] as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-. ]+$/
const CONTROL_CHARACTER_PATTERN = /[\u0000-\u001F\u007F]/

function asString(value: unknown): string | null {
    return typeof value === 'string' ? value : null
}

/**
 * Validates and normalizes an untrusted group-inquiry submission. Pure — no
 * I/O, no network, safe to reuse from the API route and from tests.
 */
export function validateGroupInquiry(input: GroupInquiryInput): GroupInquiryValidationResult {
    const errors: Record<string, string> = {}

    const honeypot = asString(input.honeypot) ?? ''
    if (honeypot.trim() !== '') {
        errors.honeypot = 'Submission rejected.'
    }

    const rawFirstName = asString(input.firstName) ?? ''
    const firstName = rawFirstName.trim()
    if (!firstName) {
        errors.firstName = 'First name is required.'
    } else if (CONTROL_CHARACTER_PATTERN.test(rawFirstName)) {
        errors.firstName = 'First name cannot contain control characters.'
    } else if (firstName.length > 80) {
        errors.firstName = 'First name is too long.'
    }

    const rawLastName = asString(input.lastName) ?? ''
    const lastName = rawLastName.trim()
    if (!lastName) {
        errors.lastName = 'Last name is required.'
    } else if (CONTROL_CHARACTER_PATTERN.test(rawLastName)) {
        errors.lastName = 'Last name cannot contain control characters.'
    } else if (lastName.length > 80) {
        errors.lastName = 'Last name is too long.'
    }

    const email = (asString(input.email) ?? '').trim()
    if (!email) {
        errors.email = 'Email is required.'
    } else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
        errors.email = 'Enter a valid email address.'
    }

    let phone: string | undefined
    const rawPhone = asString(input.phone)
    if (rawPhone !== null && rawPhone.trim() !== '') {
        phone = rawPhone.trim()
        if (CONTROL_CHARACTER_PATTERN.test(rawPhone) || phone.length > 30 || !PHONE_PATTERN.test(phone)) {
            errors.phone = 'Enter a valid phone number.'
        }
    }

    const eventTypeRaw = (asString(input.eventType) ?? '').trim()
    const isKnownEventType = (GROUP_INQUIRY_EVENT_TYPES as readonly string[]).includes(eventTypeRaw)
    if (!isKnownEventType) {
        errors.eventType = 'Select a valid event type.'
    }

    let dates: string | undefined
    const rawDates = asString(input.dates)
    if (rawDates !== null && rawDates.trim() !== '') {
        dates = rawDates.trim()
        if (CONTROL_CHARACTER_PATTERN.test(rawDates)) {
            errors.dates = 'Estimated dates cannot contain control characters.'
        } else if (dates.length > 200) {
            errors.dates = 'Estimated dates description is too long.'
        }
    }

    let guestCount: number | undefined
    if (input.guestCount !== undefined && input.guestCount !== null && input.guestCount !== '') {
        const parsed = typeof input.guestCount === 'number' ? input.guestCount : Number(input.guestCount)
        if (!Number.isFinite(parsed) || !Number.isInteger(parsed) || parsed < 1 || parsed > 500) {
            errors.guestCount = 'Enter a guest count between 1 and 500.'
        } else {
            guestCount = parsed
        }
    }

    let message: string | undefined
    const rawMessage = asString(input.message)
    if (rawMessage !== null && rawMessage.trim() !== '') {
        message = rawMessage.trim()
        if (message.length > 5000) {
            errors.message = 'Message is too long.'
        }
    }

    if (Object.keys(errors).length > 0) {
        return { ok: false, errors }
    }

    return {
        ok: true,
        data: {
            firstName,
            lastName,
            email,
            phone,
            eventType: eventTypeRaw,
            dates,
            guestCount,
            message,
        },
    }
}
