import { CANONICAL_ORIGIN } from './seo'

/** The single stale Vercel deployment host that used to be shared publicly. Generic preview hosts (branch/user deploys) must never redirect. */
export const LEGACY_VERCEL_HOST = 'inn32.vercel.app'

export const LEGACY_PATH_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
    { source: '/getting-here', destination: '/location' },
    { source: '/thingstodo', destination: '/things-to-do' },
    { source: '/history', destination: '/about' },
    { source: '/area-events', destination: '/events' },
]

/** Redirect the exact legacy Vercel host to the canonical origin, preserving path and query. Null for every other host, including generic Vercel preview hosts. */
export function resolveHostCanonicalRedirect(host: string, pathWithQuery: string): string | null {
    if (host !== LEGACY_VERCEL_HOST) return null
    return `${CANONICAL_ORIGIN}${pathWithQuery}`
}

interface NextRedirectRule {
    source: string
    destination: string
    permanent: boolean
    has?: Array<{ type: 'host'; value: string }>
}

/** next.config.ts `redirects()` payload: legacy path renames plus exact-host canonicalization. */
export function buildNextRedirects(): NextRedirectRule[] {
    return [
        ...LEGACY_PATH_REDIRECTS.map(({ source, destination }) => ({
            source,
            destination,
            permanent: true,
        })),
        {
            source: '/:path*',
            has: [{ type: 'host', value: LEGACY_VERCEL_HOST }],
            destination: `${CANONICAL_ORIGIN}/:path*`,
            permanent: true,
        },
    ]
}

/**
 * Strips a stale `?p=1` pagination param from the homepage while preserving any
 * other query params (e.g. utm_* attribution). Null when there's nothing to do.
 */
export function resolveHomepagePaginationRedirect(pathname: string, search: string): string | null {
    if (pathname !== '/') return null

    const params = new URLSearchParams(search)
    if (params.get('p') !== '1') return null

    params.delete('p')
    const remaining = params.toString()
    return `${CANONICAL_ORIGIN}/${remaining ? `?${remaining}` : ''}`
}
