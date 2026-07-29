'use client'

import Image from 'next/image'

import { SectionConfig } from '../types/website'

interface HeroProps {
    hero: SectionConfig
}

export default function Hero({ hero }: HeroProps) {
    const { eyebrow, heading, subheading, ctaText, secondaryCtaText, secondaryCtaLink, backgroundImage } = hero.content

    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-spruce lg:min-h-[640px]"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 lg:min-h-[640px]">
                {/* Text panel */}
                <div className="relative z-10 order-2 flex flex-col justify-center gap-6 px-6 py-12 sm:px-10 md:py-16 lg:order-1 lg:py-20">
                    {eyebrow && (
                        <span className="font-sans text-sm font-semibold uppercase tracking-wider text-linen/70">
                            {eyebrow}
                        </span>
                    )}
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-linen">
                        {heading}
                    </h1>
                    <p className="max-w-xl font-sans text-lg md:text-xl font-light text-linen/85">
                        {subheading}
                    </p>
                    <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-booking-widget'))}
                            className="rounded-full bg-rust px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-rust/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-spruce"
                        >
                            {ctaText}
                        </button>
                        {secondaryCtaText && (
                            <a
                                href={secondaryCtaLink}
                                className="rounded-full border border-linen/40 px-8 py-4 font-semibold text-linen transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-spruce"
                            >
                                {secondaryCtaText}
                            </a>
                        )}
                    </div>
                </div>

                {/* Property photo panel: Inn 32 sign, building, and mountain context. */}
                <div className="relative order-1 h-64 sm:h-80 lg:order-2 lg:h-auto">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-spruce/65 to-transparent lg:h-32"
                    />
                    <Image
                        src={backgroundImage || ""}
                        alt="Inn 32's blue-roofed building and roadside sign in daylight, with White Mountain foliage behind the property"
                        fill
                        priority
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover object-[70%_38%] md:object-[65%_42%] lg:object-center"
                    />
                </div>
            </div>
        </section>
    )
}
