import fs from 'node:fs'
import path from 'node:path'

/**
 * Actual /gallery/front-view.webp is ~499KB. 1MB leaves headroom for a
 * reasonable re-export while still blocking a return of a multi-MB hero asset
 * (the old hero.mp4 was ~34.9MB).
 */
export const HERO_MEDIA_BYTE_BUDGET = 1_000_000

const LOCAL_ASSET_PATTERN = /["'](\/[A-Za-z0-9 _\-./]+\.(?:webp|png|jpe?g|svg|ico|mp4|gif))["']/gi

/** Extracts quoted local (site-relative) asset paths referenced in a source string. Ignores remote http(s) URLs. */
export function extractLocalAssetRefs(source: string): string[] {
    const found = new Set<string>()
    Array.from(source.matchAll(LOCAL_ASSET_PATTERN)).forEach(match => {
        found.add(match[1])
    })
    return Array.from(found)
}

/**
 * Confirms a site-relative asset path exists under publicDir, matching case exactly
 * at every path segment. Guards against assets that resolve locally on a
 * case-insensitive filesystem (macOS) but 404 in production (Linux).
 */
export function verifyAssetExistsCaseSensitive(publicDir: string, assetPath: string): boolean {
    const segments = assetPath.split('/').filter(Boolean)
    let currentDir = publicDir
    for (const segment of segments) {
        let entries: string[]
        try {
            entries = fs.readdirSync(currentDir)
        } catch {
            return false
        }
        if (!entries.includes(segment)) return false
        currentDir = path.join(currentDir, segment)
    }
    return true
}
