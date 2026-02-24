'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryImage } from '../types/website'
import LightboxGallery from './LightboxGallery'

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
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                        Visual Tour
                    </span>
                    <h2 className="font-display text-page-title text-navy dark:text-white mb-4">
                        Photo Gallery
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Take a visual journey through our property.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                    {gallery.map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => setSelectedImage(image)}
                            className={`relative overflow-hidden rounded-xl group ${layoutPatterns[index % layoutPatterns.length]
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />

                            {/* Category Badge */}
                            <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity capitalize">
                                {image.category}
                            </div>

                            {/* Zoom Icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                                <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <LightboxGallery
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                images={gallery.map(img => img.url)}
                initialIndex={selectedImage ? gallery.findIndex(img => img.id === selectedImage.id) : 0}
            />
        </section>
    )
}
