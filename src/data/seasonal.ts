/**
 * Seasonal (monthly) rental program shown on /seasonal.
 *
 * Update this file each season: rates, which seasons are open for inquiries,
 * and which room types are sold out. Everything on the page and in the
 * inquiry form is driven from here.
 */

export type SeasonId = 'summerFall' | 'winter'

export interface SeasonalSeason {
    id: SeasonId
    name: string
    months: string
}

/** A monthly rate in USD, 'sold-out', or null to show "Inquire". */
export type SeasonalRate = number | 'sold-out' | null

export interface SeasonalRoomOption {
    /** Must match a roomTypes[].id in website-data.ts so photos and beds stay in sync. */
    roomTypeId: string
    /** Short name used in the rate table and inquiry form. */
    label: string
    rates: Record<SeasonId, SeasonalRate>
}

export interface SeasonalBookingWindow {
    /** Value submitted with the inquiry, e.g. "Winter 2026/27". */
    label: string
    season: SeasonId
}

export const SEASONS: SeasonalSeason[] = [
    { id: 'summerFall', name: 'Summer/Fall', months: 'Jun – Nov' },
    { id: 'winter', name: 'Winter', months: 'Dec – Apr' },
]

/** Seasons guests can pick in the inquiry form. Drop a season once it has passed. */
export const BOOKING_WINDOWS: SeasonalBookingWindow[] = [
    { label: 'Winter 2026/27', season: 'winter' },
    { label: 'Summer/Fall 2027', season: 'summerFall' },
]

export const SEASONAL_ROOM_OPTIONS: SeasonalRoomOption[] = [
    { roomTypeId: 'standard-single', label: 'Single Room', rates: { summerFall: 2000, winter: 'sold-out' } },
    { roomTypeId: 'standard-queen', label: 'Queen Room', rates: { summerFall: 2500, winter: 1250 } },
    { roomTypeId: 'standard-family', label: 'Queen + Full', rates: { summerFall: 3000, winter: 1500 } },
    { roomTypeId: 'double-queen', label: 'Two Queens', rates: { summerFall: 3500, winter: 1750 } },
    { roomTypeId: '2-bed-apt', label: 'Two Bedroom', rates: { summerFall: 4000, winter: 'sold-out' } },
    { roomTypeId: '4-bed-apt', label: 'Four Bedroom', rates: { summerFall: 5000, winter: 'sold-out' } },
]

export const SEASONAL_PAGE_PATH = '/seasonal'

export function formatSeasonalRate(rate: SeasonalRate): string {
    if (rate === 'sold-out') return 'Sold Out'
    if (rate === null) return 'Inquire'
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rate)
}

/** Lowest bookable monthly rate for a season, or null if none is priced. */
export function lowestRate(season: SeasonId): number | null {
    const rates = SEASONAL_ROOM_OPTIONS.map((o) => o.rates[season]).filter((r): r is number => typeof r === 'number')
    return rates.length ? Math.min(...rates) : null
}
