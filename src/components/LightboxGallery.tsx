'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { createPortal } from 'react-dom'

interface LightboxGalleryProps {
    isOpen: boolean
    onClose: () => void
    images: string[]
    initialIndex?: number
}

export default function LightboxGallery({ isOpen, onClose, images, initialIndex = 0 }: LightboxGalleryProps) {
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
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
                aria-label="Close gallery"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
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
                    {images.map((src, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 relative flex items-center justify-center p-4">
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/50 text-white text-sm font-medium rounded-full backdrop-blur-md border border-white/10">
                {selectedIndex + 1} / {images.length}
            </div>
        </div>,
        document.body
    )
}
