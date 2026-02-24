'use client'
import Image from 'next/image'

import { SectionConfig } from '../types/website'
import { useState, useEffect, useRef } from 'react'

interface HeroProps {
    hero: SectionConfig
}

export default function Hero({ hero }: HeroProps) {
    const { heading, subheading, ctaText, secondaryCtaText, secondaryCtaLink, backgroundImage, backgroundVideo, backgroundVideos } = hero.content

    // Use the array if available, otherwise fallback to single video, or empty array
    const videos = backgroundVideos || (backgroundVideo ? [backgroundVideo] : [])

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    // Effect to handle video ending and transition
    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement) return

        const handleEnded = () => {
            if (videos.length > 1) {
                setIsTransitioning(true)
                setTimeout(() => {
                    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
                    setIsTransitioning(false)
                }, 500) // Half-second fade
            } else {
                videoElement.play().catch(e => {
                    if (e.name !== 'AbortError') console.error("Video playback failed:", e)
                })
            }
        }

        videoElement.addEventListener('ended', handleEnded)
        return () => videoElement.removeEventListener('ended', handleEnded)
    }, [videos.length])

    // Effect to play video when index changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
            videoRef.current.play().catch(e => {
                if (e.name !== 'AbortError') console.error("Autoplay prevented", e)
            })
        }
    }, [currentVideoIndex])


    return (
        <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image (Fallback) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage || ""}
                    alt={heading || "Hero Background"}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            </div>

            {/* Video Background with Transition */}
            {videos.length > 0 && (
                <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                    <video
                        ref={videoRef}
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                        autoPlay
                        muted
                        poster={backgroundImage} // Use image as poster
                    >
                        <source src={videos[currentVideoIndex]} type="video/mp4" />
                    </video>
                </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/70 dark:from-slate-900/50 dark:via-slate-900/60 dark:to-slate-900/80 z-10" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-serif drop-shadow-md">
                    {heading}
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light text-white/90 drop-shadow-sm">
                    {subheading}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-widget'))}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-600/30 backdrop-blur-sm"
                    >
                        {ctaText}
                    </button>
                    {secondaryCtaText && (
                        <a
                            href={secondaryCtaLink}
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-full transition-all backdrop-blur-md"
                        >
                            {secondaryCtaText}
                        </a>
                    )}
                </div>
            </div>
        </section>
    )
}
