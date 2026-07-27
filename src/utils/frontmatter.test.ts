import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stripFrontmatter } from './frontmatter'

test('stripFrontmatter removes a leading YAML frontmatter block', () => {
    const input = [
        '---',
        'title: "Visiting the Ice Castles in Lincoln"',
        'slug: lincoln-ice-castles',
        'date: 2024-12-01',
        'keywords: "Ice Castles Lincoln, winter activities NH, White Mountains"',
        '---',
        '',
        'Every winter, a magical construction project rises in Lincoln.',
    ].join('\n')

    assert.equal(
        stripFrontmatter(input),
        'Every winter, a magical construction project rises in Lincoln.'
    )
})

test('stripFrontmatter returns content unchanged when there is no frontmatter', () => {
    const input = 'Just a plain paragraph with no metadata block.'
    assert.equal(stripFrontmatter(input), input)
})

test('stripFrontmatter only treats the first --- block as frontmatter', () => {
    const input = [
        '---',
        'title: Test',
        '---',
        '',
        'Body text.',
        '',
        '---',
        '',
        'A horizontal rule further down should stay in the body.',
    ].join('\n')

    assert.equal(
        stripFrontmatter(input),
        ['Body text.', '', '---', '', 'A horizontal rule further down should stay in the body.'].join('\n')
    )
})

test('stripFrontmatter does not treat a mid-document --- as frontmatter start', () => {
    const input = 'Some intro text.\n\n---\n\nMore text after a rule.'
    assert.equal(stripFrontmatter(input), input)
})
