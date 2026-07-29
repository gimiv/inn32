import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const COMPETITOR_TERMS = /we are inn|eat here|play here/i

function walk(dir: string, files: string[] = []): string[] {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(full, files)
        } else if (/\.(tsx?|css)$/.test(entry.name) && !entry.name.endsWith('.test.ts')) {
            files.push(full)
        }
    }
    return files
}

test('no competitor brand terms appear anywhere in production source', () => {
    const root = path.join(process.cwd(), 'src')
    for (const file of walk(root)) {
        const contents = fs.readFileSync(file, 'utf8')
        assert.doesNotMatch(contents, COMPETITOR_TERMS, `${file} contains a competitor brand term`)
    }
})
