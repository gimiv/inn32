export function stripFrontmatter(source: string): string {
    const normalized = source.replace(/^\uFEFF/, '')
    const match = normalized.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)

    if (!match) return source

    return normalized.slice(match[0].length).replace(/^\r?\n/, '').trimEnd()
}
