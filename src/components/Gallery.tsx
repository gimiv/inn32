'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import { GalleryImage } from '../types/website'
import LightboxGallery from './LightboxGallery'
import SectionHeader from './ui/SectionHeader'
import { cn } from '../utils/cn'

interface GalleryProps {
    gallery: GalleryImage[]
}

export default function Gallery({ gallery }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

    // Group images into a masonry-like layout that perfectly fills a 4-column grid (7 items = 3 rows)
    const layoutPatterns = [
        'col-span-2 row-span-2', // Large
        'col-span-1 row-span-1', // Small
        'col-span-1 row-span-1', // Small
        'col-span-1 row-span-2', // Tall
        'col-span-1 row-span-1', // Small
        'col-span-2 row-span-1', // Wide
        'col-span-1 row-span-1', // Small
    ]

    return (
        <section id="gallery" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <SectionHeader
                    label="Visual Tour"
                    title="Photo Gallery"
                    subtitle="Take a visual journey through our property."
                    align="center"
                />

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                    {gallery.map((image, index) => (
                        <GalleryItem
                            key={image.id}
                            image={image}
                            layoutClass={layoutPatterns[index % layoutPatterns.length]}
                            onClick={() => setSelectedImage(image)}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <LightboxGallery
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                images={gallery.map(img => ({ url: img.url, alt: img.alt }))}
                initialIndex={selectedImage ? gallery.findIndex(img => img.id === selectedImage.id) : 0}
            />
        </section>
    )
}

function GalleryItem({ image, layoutClass, onClick }: { image: GalleryImage, layoutClass: string, onClick: () => void }) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <button
            onClick={onClick}
            className={cn("relative overflow-hidden rounded-xl group focus-visible:ring-2 focus-visible:ring-mountain-blue focus-visible:outline-none", layoutClass)}
        >
            {/* Skeleton Loader */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-slate-800 animate-pulse" />
            )}
            <Image
                src={image.url}
                alt={image.alt}
                fill
                className={cn(
                    "object-cover group-hover:scale-110 transition-all duration-500",
                    isLoading ? "opacity-0" : "opacity-100"
                )}
                sizes="(max-width: 768px) 50vw, 25vw"
                onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity capitalize">
                {image.category}
            </div>

            {/* Zoom Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                <ZoomIn className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </div>
        </button>
    )
}
