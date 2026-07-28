'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BookingWidget from './BookingWidget'
import Logo from './Logo'
import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS, ALL_NAV_LINKS } from '../data/navigation'
import { Property } from '../types/website'
import { cn } from '../utils/cn'

interface NavigationProps {
    property: Property
}

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Navigation({ property }: NavigationProps) {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMoreOpen, setIsMoreOpen] = useState(false)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [bookingPromoCode, setBookingPromoCode] = useState<string>()
    const [bookingMewsCategoryId, setBookingMewsCategoryId] = useState<string>()

    const mobileToggleRef = useRef<HTMLButtonElement>(null)
    const mobileDialogRef = useRef<HTMLDivElement>(null)
    const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
    const moreToggleRef = useRef<HTMLButtonElement>(null)
    const moreMenuRef = useRef<HTMLDivElement>(null)

    const closeMobileMenu = (restoreFocus = false) => {
        setIsMobileMenuOpen(false)
        if (restoreFocus) window.setTimeout(() => mobileToggleRef.current?.focus(), 0)
    }

    useEffect(() => {
        if (pathname === '/booking') setIsBookingOpen(true)
        setIsMobileMenuOpen(false)
        setIsMoreOpen(false)
    }, [pathname])

    useEffect(() => {
        document.body.classList.toggle('has-mobile-booking-bar', isScrolled)
        return () => document.body.classList.remove('has-mobile-booking-bar')
    }, [isScrolled])

    useEffect(() => {
        const main = document.querySelector('main')
        const footer = document.querySelector('footer')

        if (!isMobileMenuOpen) return

        document.body.style.overflow = 'hidden'
        main?.setAttribute('inert', 'true')
        footer?.setAttribute('inert', 'true')
        window.setTimeout(() => firstMobileLinkRef.current?.focus(), 0)

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                closeMobileMenu(true)
                return
            }
            if (event.key !== 'Tab' || !mobileDialogRef.current) return

            const focusable = Array.from(
                mobileDialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
            ).filter((element) => !element.hasAttribute('disabled'))
            if (focusable.length === 0) return

            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
            main?.removeAttribute('inert')
            footer?.removeAttribute('inert')
        }
    }, [isMobileMenuOpen])

    useEffect(() => {
        if (!isMoreOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMoreOpen(false)
                window.setTimeout(() => moreToggleRef.current?.focus(), 0)
            }
        }
        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node
            if (!moreMenuRef.current?.contains(target) && !moreToggleRef.current?.contains(target)) {
                setIsMoreOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('pointerdown', handlePointerDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('pointerdown', handlePointerDown)
        }
    }, [isMoreOpen])

    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (ticking) return
            window.requestAnimationFrame(() => {
                setIsScrolled(pathname !== '/' || window.scrollY > 50)
                ticking = false
            })
            ticking = true
        }
        handleScroll()

        const handleOpenWidget = (event: Event) => {
            const detail = (event as CustomEvent<{ promoCode?: string; mewsCategoryId?: string }>).detail
            setBookingPromoCode(detail?.promoCode)
            setBookingMewsCategoryId(detail?.mewsCategoryId)
            setIsBookingOpen(true)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('open-booking-widget', handleOpenWidget)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('open-booking-widget', handleOpenWidget)
        }
    }, [pathname])

    const linkClass = (active: boolean) => cn(
        'relative rounded-sm py-2 font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
        active
            ? 'font-semibold text-blue-700 dark:text-blue-300'
            : isScrolled
                ? 'text-navy hover:text-blue-700 dark:text-gray-200 dark:hover:text-blue-300'
                : 'text-white hover:text-white/80 focus-visible:ring-white focus-visible:ring-offset-slate-900',
        active && "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-700"
    )

    return (
        <>
            <nav
                aria-label="Primary navigation"
                className={cn(
                    'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                    isScrolled ? 'bg-white/90 py-4 shadow-md backdrop-blur-md dark:bg-slate-900/90' : 'bg-transparent py-6'
                )}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" aria-label="Inn 32 home" className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                        <Logo className="h-10 w-auto md:h-12" isScrolled={isScrolled} />
                    </Link>

                    <div className="hidden items-center gap-6 lg:flex">
                        {PRIMARY_NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className={linkClass(pathname === link.href)}>
                                {link.name}
                            </Link>
                        ))}
                        <div className="relative">
                            <button
                                ref={moreToggleRef}
                                type="button"
                                aria-expanded={isMoreOpen}
                                aria-controls="desktop-more-menu"
                                onClick={() => setIsMoreOpen((open) => !open)}
                                className={cn(linkClass(SECONDARY_NAV_LINKS.some((link) => pathname === link.href)), 'flex items-center gap-1')}
                            >
                                More
                                <ChevronDown aria-hidden="true" size={16} className={cn('transition-transform', isMoreOpen && 'rotate-180')} />
                            </button>
                            {isMoreOpen && (
                                <div
                                    ref={moreMenuRef}
                                    id="desktop-more-menu"
                                    className="absolute right-0 top-full mt-2 min-w-44 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                                >
                                    {SECONDARY_NAV_LINKS.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMoreOpen(false)}
                                            className="block rounded-lg px-4 py-3 text-sm font-medium text-navy hover:bg-slate-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-gray-100 dark:hover:bg-slate-800 dark:hover:text-blue-300"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsBookingOpen(true)}
                        className={cn(
                            'hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:block',
                            isScrolled ? 'bg-navy text-white hover:bg-blue-700' : 'bg-white text-navy hover:bg-cream'
                        )}
                    >
                        Book Now
                    </button>

                    <button
                        ref={mobileToggleRef}
                        type="button"
                        aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-navigation-dialog"
                        onClick={() => isMobileMenuOpen ? closeMobileMenu() : setIsMobileMenuOpen(true)}
                        className="-mr-2 rounded-sm p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 lg:hidden"
                    >
                        {isMobileMenuOpen
                            ? <X aria-hidden="true" className={isScrolled ? 'text-navy dark:text-white' : 'text-white'} size={28} />
                            : <Menu aria-hidden="true" className={isScrolled ? 'text-navy dark:text-white' : 'text-white'} size={28} />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div
                        ref={mobileDialogRef}
                        id="mobile-navigation-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        className="absolute inset-x-0 top-full flex max-h-[calc(100vh-5rem)] flex-col gap-1 overflow-y-auto border-t bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 lg:hidden"
                    >
                        {ALL_NAV_LINKS.map((link, index) => (
                            <Link
                                key={link.href}
                                ref={index === 0 ? firstMobileLinkRef : undefined}
                                href={link.href}
                                onClick={() => closeMobileMenu()}
                                className={cn(
                                    'rounded-md px-3 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600',
                                    pathname === link.href
                                        ? 'bg-slate-50 font-semibold text-blue-700 dark:bg-slate-800 dark:text-blue-300'
                                        : 'text-gray-800 hover:bg-slate-50 dark:text-gray-200 dark:hover:bg-slate-800'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href={`tel:${property.contact.phone}`}
                            className="mt-3 flex items-center justify-center gap-2 border-t pt-4 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-800 dark:text-gray-300"
                        >
                            <Phone aria-hidden="true" size={16} />
                            {property.contact.phone}
                        </a>
                    </div>
                )}
            </nav>

            <div
                inert={isMobileMenuOpen}
                aria-hidden={isMobileMenuOpen}
                className={cn(
                    'mobile-booking-bar fixed inset-x-0 bottom-0 z-50 flex min-h-16 items-center justify-between gap-3 border-t border-gray-200 bg-white/90 px-4 pt-2.5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-md transition-transform duration-500 dark:border-slate-800 dark:bg-slate-900/90 lg:hidden',
                    isScrolled ? 'translate-y-0' : 'translate-y-full'
                )}
            >
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">Check live rates</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="flex-shrink-0 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95 dark:bg-white dark:text-navy"
                >
                    Book Now
                </button>
            </div>

            <BookingWidget
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                promoCode={bookingPromoCode}
                mewsCategoryId={bookingMewsCategoryId}
            />
        </>
    )
}
