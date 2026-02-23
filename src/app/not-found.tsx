import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                Page Not Found
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 mb-8">
                Could not find the requested resource.
            </p>
            <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                Return Home
            </Link>
        </div>
    )
}
