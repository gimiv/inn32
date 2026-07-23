'use client'

export default function BookingRouteLauncher() {
    const openBookingEngine = () => {
        window.dispatchEvent(new CustomEvent('open-booking-widget'))
    }

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-cream px-4 pb-20 pt-32 dark:bg-slate-900">
            <div className="mx-auto max-w-xl text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-mountain-blue">
                    Inn 32
                </p>
                <h1 className="mt-3 font-serif text-4xl font-semibold text-navy dark:text-white sm:text-5xl">
                    Book your stay
                </h1>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    Opening the secure booking engine. If it does not appear automatically, use the button below.
                </p>
                <button
                    type="button"
                    onClick={openBookingEngine}
                    className="mt-8 rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-mountain-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mountain-blue focus-visible:ring-offset-2 dark:bg-white dark:text-navy dark:hover:bg-cream"
                >
                    Open booking engine
                </button>
            </div>
        </section>
    )
}
