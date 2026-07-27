import { test } from 'node:test'
import assert from 'node:assert/strict'

import { insiderGuideSections, resolveInsiderGuide } from './guest-content'
import { websiteData } from './website-data'

// Spelled-out or numeric drive-time/distance claims are routing-fragile and unverified.
const FRAGILE_DISTANCE = /(?:\d+(?:\.\d+)?|one|two|three|four|five|ten|fifteen|twenty)[\s-]*(?:minute|min\b|mile|hour|hr\b)/i

test('insider guide offers 4-5 intent-based sections with unique ids and titles', () => {
    assert.ok(insiderGuideSections.length >= 4 && insiderGuideSections.length <= 5,
        `expected 4-5 guide sections, got ${insiderGuideSections.length}`)
    const ids = insiderGuideSections.map(s => s.id)
    const titles = insiderGuideSections.map(s => s.title)
    assert.equal(new Set(ids).size, ids.length, 'guide section ids must be unique')
    assert.equal(new Set(titles).size, titles.length, 'guide section titles must be unique')
})

test('every referenced id resolves to a real websiteData.thingsToDo record, in order', () => {
    const resolved = resolveInsiderGuide(websiteData.thingsToDo)
    assert.equal(resolved.length, insiderGuideSections.length)
    resolved.forEach((section, i) => {
        assert.ok(section.thingIds.length >= 2, `guide "${section.id}" needs at least 2 picks`)
        assert.deepEqual(section.things.map(t => t.id), insiderGuideSections[i].thingIds,
            `guide "${section.id}" must resolve its ids verbatim and in order`)
        for (const thing of section.things) {
            assert.ok(websiteData.thingsToDo.includes(thing),
                `guide "${section.id}" must reference the existing record, not a copy`)
        }
    })
})

test('Cascade Park does not send guests to a different state park', () => {
    const cascadePark = websiteData.thingsToDo.find(t => t.id === 'cascade-park')
    assert.ok(cascadePark)
    assert.doesNotMatch(cascadePark.link || '', /franconia-notch-state-park/i)
})

test('resolveInsiderGuide fails loudly when a referenced id is missing', () => {
    assert.throws(
        () => resolveInsiderGuide(websiteData.thingsToDo, [
            { id: 'broken', title: 'Broken', intro: 'x', thingIds: ['does-not-exist'] },
        ]),
        /does-not-exist/,
    )
})

test('guide intros are intent copy: no fragile distance/time claims, no duplicated venue facts', () => {
    for (const section of insiderGuideSections) {
        const copy = `${section.title} ${section.intro}`
        assert.doesNotMatch(copy, FRAGILE_DISTANCE, `guide "${section.id}" contains a distance/time claim`)
        for (const id of section.thingIds) {
            const record = websiteData.thingsToDo.find(t => t.id === id)
            assert.ok(record, `guide "${section.id}" references unknown id "${id}"`)
            assert.notEqual(section.intro, record!.description,
                `guide "${section.id}" must not copy the venue description into new data`)
        }
    }
})
