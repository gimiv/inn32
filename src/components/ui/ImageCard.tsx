'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface ImageCardProps {
    href: string
    image: string
    title: string
    subtitle: string
    description: string
}

export default function ImageCard({ href, image, title, subtitle, description }: ImageCardProps) {
    const isExternal = href.startsWith('http')
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Link
            href={href}
            className="group block h-full focus-visible:ring-2 focus-visible:ring-mountain-blue focus-visible:outline-none rounded-brand-lg"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            <div className="bg-white dark:bg-slate-800 rounded-brand-lg overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 dark:bg-slate-800">
                    {/* Skeleton Loader */}
                    {isLoading && (
                        <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 animate-pulse z-10" />
                    )}
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className={`object-cover group-hover:scale-110 transition-all duration-700 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onLoad={() => setIsLoading(false)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-20" />
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                        <span className="text-white/90 font-sans text-xs font-bold uppercase tracking-wider mb-1 block">
                            {subtitle}
                        </span>
                        <h3 className="text-white font-display text-xl font-bold leading-tight drop-shadow-md">
                            {title}
                        </h3>
                    </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-600 dark:text-gray-400 font-sans line-clamp-3 mb-4">
                        {description}
                    </p>
                    <div className="mt-auto">
                        <span className="text-mountain-blue dark:text-blue-400 group-hover:text-amber-500 font-sans font-medium hover:underline flex items-center mt-2 decoration-2 underline-offset-4 decoration-mountain-blue/30 group-hover:decoration-amber-500/50 transition-colors">
                            More Info
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
