'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

interface LightboxGalleryProps {
    isOpen: boolean
    onClose: () => void
    images: string[] | { url: string; alt: string }[]
    altTexts?: string[]
    initialIndex?: number
}

export default function LightboxGallery({ isOpen, onClose, images, altTexts, initialIndex = 0 }: LightboxGalleryProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
    const [selectedIndex, setSelectedIndex] = useState(initialIndex)

    // Sync initial index
    useEffect(() => {
        if (emblaApi && isOpen) {
            emblaApi.scrollTo(initialIndex, true)
        }
    }, [emblaApi, isOpen, initialIndex])

    // Update selected index on scroll
    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') scrollPrev()
            if (e.key === 'ArrowRight') scrollNext()
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, scrollPrev, scrollNext])

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200 [padding-top:max(env(safe-area-inset-top),0.75rem)] [padding-bottom:max(env(safe-area-inset-bottom),0.75rem)]">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-4 md:right-8 z-50 p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full [top:max(env(safe-area-inset-top),1rem)] md:[top:max(env(safe-area-inset-top),2rem)]"
                aria-label="Close gallery"
            >
                <X className="w-7 h-7 md:w-8 md:h-8" />
            </button>

            {/* Navigation Buttons */}
            {(Array.isArray(images) && images.length > 1) && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute left-4 z-50 p-3 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full hidden md:flex items-center justify-center"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-4 z-50 p-3 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full hidden md:flex items-center justify-center"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </>
            )}

            {/* Carousel */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden" ref={emblaRef}>
                <div className="flex w-full h-full touch-pan-y">
                    {images.map((imageData, index) => {
                        const isObject = typeof imageData === 'object' && 'url' in imageData
                        const src = isObject ? imageData.url : imageData
                        const alt = isObject ? imageData.alt : (altTexts?.[index] ?? `Gallery image ${index + 1}`)

                        return (
                            <div key={index} className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center p-4 md:p-6">
                                <div className="relative w-full h-[78dvh] md:h-[85vh]">
                                    <Image
                                        src={src}
                                        alt={alt}
                                        fill
                                        className="object-contain rounded-sm shadow-2xl"
                                        sizes="100vw"
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Counter */}
            <div className="absolute left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-md border border-white/10 [bottom:max(env(safe-area-inset-bottom),1rem)] md:bottom-8">
                {selectedIndex + 1} / {(Array.isArray(images) ? images.length : 0)}
            </div>
        </div>,
        document.body
    )
}
