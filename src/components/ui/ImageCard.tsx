import Link from 'next/link'

interface ImageCardProps {
    href: string
    image: string
    title: string
    subtitle: string
    description: string
}

export default function ImageCard({ href, image, title, subtitle, description }: ImageCardProps) {
    const isExternal = href.startsWith('http')

    return (
        <Link
            href={href}
            className="group block h-full"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            <div className="bg-white dark:bg-slate-800 rounded-brand-lg overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 h-full flex flex-col hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white/90 font-sans text-xs font-bold uppercase tracking-wider mb-1 block">
                            {subtitle}
                        </span>
                        <h3 className="text-white font-display text-xl font-bold leading-tight">
                            {title}
                        </h3>
                    </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                    <p className="text-gray-600 dark:text-gray-400 font-sans line-clamp-3 mb-4">
                        {description}
                    </p>
                    <div className="mt-auto">
                        <span className="text-navy dark:text-white font-sans font-medium text-sm group-hover:text-mountain-blue transition-colors flex items-center">
                            Explore
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
