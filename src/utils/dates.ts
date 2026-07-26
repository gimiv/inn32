const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/

/**
 * Strict ISO 8601 date check. Rejects vague/human date strings (e.g. "Ongoing",
 * "Winter - Spring 2026", "May 23, 2026") on purpose — those cannot be treated
 * as machine-verifiable dates without inventing a specific day.
 */
export function isValidIsoDate(value: string | undefined | null): boolean {
    if (!value || !ISO_DATE_PATTERN.test(value)) return false

    const datePart = value.slice(0, 10)
    const [year, month, day] = datePart.split('-').map(Number)
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return false

    // Reject dates like 2026-02-30 that Date() silently rolls forward.
    return (
        parsed.getUTCFullYear() === year &&
        parsed.getUTCMonth() + 1 === month &&
        parsed.getUTCDate() === day
    )
}

function toUtcMidnight(isoDate: string): number {
    return new Date(`${isoDate.slice(0, 10)}T00:00:00Z`).getTime()
}

export interface OfferExpiry {
    validUntil?: string
}

/**
 * True when the offer has no authoritative expiry, or its validUntil is today or later.
 */
export function isOfferActive(offer: OfferExpiry, nowIso: string): boolean {
    if (!offer.validUntil) return true
    if (!isValidIsoDate(offer.validUntil)) return true
    return toUtcMidnight(offer.validUntil) >= toUtcMidnight(nowIso)
}

export function filterActiveOffers<T extends OfferExpiry>(offers: T[], nowIso: string): T[] {
    return offers.filter(offer => isOfferActive(offer, nowIso))
}

export interface EventDate {
    date: string
}

/**
 * True only for a strictly valid ISO date that is today or in the future.
 * Non-ISO strings ("Ongoing", "Winter - Spring 2026") and past dates are never upcoming.
 */
export function isUpcomingIsoEventDate(date: string, nowIso: string): boolean {
    if (!isValidIsoDate(date)) return false
    return toUtcMidnight(date) >= toUtcMidnight(nowIso)
}

export function filterUpcomingEvents<T extends EventDate>(events: T[], nowIso: string): T[] {
    return events.filter(event => isUpcomingIsoEventDate(event.date, nowIso))
}

/** Current date as an ISO string (YYYY-MM-DD), in UTC. Not unit-tested — thin wrapper around the clock. */
export function nowIso(): string {
    return new Date().toISOString().slice(0, 10)
}
