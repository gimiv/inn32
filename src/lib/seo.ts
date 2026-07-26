export const CANONICAL_ORIGIN = 'https://www.inn32.com'

/** Absolute canonical URL for a site-relative path (must start with "/"). */
export function canonicalUrl(path: string = '/'): string {
    return `${CANONICAL_ORIGIN}${path}`
}
