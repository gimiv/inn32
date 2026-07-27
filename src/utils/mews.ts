const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * Mews category ids are UUIDs. Local room slugs (e.g. "standard-single") are
 * never valid Mews ids and must not be forwarded to the booking engine.
 */
export function isValidMewsCategoryId(value: string | undefined | null): value is string {
    return typeof value === 'string' && UUID_PATTERN.test(value)
}

export type MewsOpenCall =
    | { method: 'showRates'; categoryId: string }
    | { method: 'open' }

/**
 * Per Mews docs, api.open() takes no resource id; room-specific booking uses
 * api.showRates(categoryId) with a real Mews category UUID. Anything that
 * isn't a validated UUID (including local slugs) falls back to the generic
 * open() flow rather than being passed through to Mews.
 */
export function resolveMewsOpenCall(mewsCategoryId?: string): MewsOpenCall {
    if (isValidMewsCategoryId(mewsCategoryId)) {
        return { method: 'showRates', categoryId: mewsCategoryId }
    }
    return { method: 'open' }
}
