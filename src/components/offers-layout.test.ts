import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('offer cards use h3 under the homepage section and h2 under the full offers page h1', () => {
    const source = read('src/components/Offers.tsx')
    const card = read('src/components/ui/StandardCard.tsx')
    assert.match(source, /headingLevel=\{isSlider \? 3 : 2\}/)
    assert.match(source, /<StandardCard[\s\S]*headingLevel=\{headingLevel\}/)
    assert.match(card, /headingLevel\?: 2 \| 3/)
    assert.match(card, /const HeadingTag = `h\$\{headingLevel\}`/)
    assert.match(card, /<HeadingTag[\s\S]*\{title\}[\s\S]*<\/HeadingTag>/)
})

test('a single active homepage offer uses a compact centered grid instead of an empty carousel', () => {
    const source = read('src/components/Offers.tsx')
    assert.match(source, /const isCarousel = isSlider && displayOffers\.length > 1/)
    assert.match(source, /isCarousel=\{isCarousel\}/)
    assert.match(source, /const isSingle = isSlider && displayOffers\.length === 1/)
    assert.match(source, /gridClassName=\{isSingle \? ["']grid max-w-xl mx-auto["']/)
    assert.match(source, /isSingle[\s\S]*py-12 md:py-16/)
})
