'use client'

import Image from 'next/image'

import useEmblaCarousel from 'embla-carousel-react'
import { Instagram } from 'lucide-react'
import { websiteData } from '../data/website-data'

export default function SocialReel() {
    const { socialPosts } = websiteData

    // Auto-scroll configuration
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        loop: true,
        dragFree: true,
        containScroll: 'trimSnaps'
    })

    return (
        <section id="social-reel" className="py-20 bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
                    <Instagram className="w-6 h-6 text-white" />
                </div>
                <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                    Our Community
                </span>
                <h2 className="font-display text-page-title text-white mb-4">
                    Follow the Adventure
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Check out the latest moments from our guests and the beauty of the White Mountains.
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors ml-2 font-medium">
                        @inn32nh
                    </a>
                </p>
            </div>

            {/* Carousel */}
            <div className="w-full" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {socialPosts.map((post) => (
                        <a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-[0_0_70%] sm:flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0 pl-4 relative group cursor-pointer block"
                        >
                            <div className="aspect-square relative overflow-hidden rounded-xl bg-slate-800">
                                <Image
                                    src={post.image}
                                    alt={post.caption}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    sizes="(max-width: 640px) 70vw, (max-width: 768px) 40vw, 25vw"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Instagram className="w-8 h-8 text-white" />
                                </div>

                                {/* Platform Icon (Always visible small) */}
                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-1.5 rounded-full">
                                    <Instagram className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </a>
                    ))}
                    {/* Duplicate for infinite loop visual effect if needed, but 'loop: true' handles it logic-wise. 
                        However, for a seamless 'ticker' feel, CSS animation is often smoother, but Embla is fine here for interaction.
                    */}
                </div>
            </div>
        </section>
    )
}
