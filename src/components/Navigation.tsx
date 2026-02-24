'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
import { cn } from '../utils/cn'
import { websiteData } from '../data/website-data'
import Logo from './Logo'
import BookingWidget from './BookingWidget'
import { useTheme } from '../context/ThemeContext'
import Temperature from './Temperature'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navigation() {
    const router = useRouter()
    const pathname = usePathname()
    const { theme, toggleTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [bookingPromoCode, setBookingPromoCode] = useState<string | undefined>(undefined)
    const [bookingRoomId, setBookingRoomId] = useState<string | undefined>(undefined)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const navLinks = [
        { name: 'Rooms', href: '/rooms' },
        { name: 'Offers', href: '/offers' },
        { name: 'Amenities', href: '/amenities' },
        { name: 'Things To Do', href: '/things-to-do' },
        { name: 'Events', href: '/events' },
        { name: 'Groups', href: '/groups' },
        { name: 'Blog', href: '/blog' },
        { name: 'Location', href: '/location' },
    ]

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault()
            const id = href.substring(2) // Get the hash part
            if (pathname === '/') {
                const element = document.getElementById(id)
                if (element) {
                    const navHeight = 80 // Approx header height
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.scrollY - navHeight

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            } else {
                router.push(`/?scrollTo=${id}`)
            }
        }
        setIsMobileMenuOpen(false)
    }

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    // map visual changes here
                    if (pathname !== '/') {
                        setIsScrolled(true)
                    } else {
                        setIsScrolled(window.scrollY > 50)
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Initial check
        if (pathname !== '/') {
            setIsScrolled(true)
        } else {
            setIsScrolled(window.scrollY > 50)
        }

        const handleOpenWidget = (e: any) => {
            setIsBookingOpen(true)
            if (e.detail) {
                setBookingPromoCode(e.detail.promoCode)
                setBookingRoomId(e.detail.roomId)
            } else {
                setBookingPromoCode(undefined)
                setBookingRoomId(undefined)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('open-booking-widget', handleOpenWidget)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('open-booking-widget', handleOpenWidget)
        }
    }, [pathname])

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between w-full relative">
                        {/* Logo */}
                        <div className="flex items-center flex-shrink-0">
                            <Link href="/">
                                <Logo
                                    className="h-10 md:h-12 w-auto"
                                    isScrolled={isScrolled}
                                />
                            </Link>
                        </div>

                        {/* Mobile Centered Temperature/Theme Toggle */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
                            <Temperature variant={isScrolled ? 'color' : 'white'} />
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => link.href.startsWith('/#') ? handleNavClick(e, link.href) : undefined}
                                        className={cn(
                                            "font-sans transition-all relative py-2",
                                            // Base color logic
                                            isActive
                                                ? "text-mountain-blue font-semibold"
                                                : isScrolled
                                                    ? "text-navy dark:text-gray-200 hover:text-mountain-blue font-medium"
                                                    : "text-white hover:text-white/80 font-medium",
                                            // Active underline logic
                                            isActive && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-mountain-blue after:rounded-full"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            })}
                        </div>

                        {/* Desktop Action Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Temperature variant={isScrolled ? 'color' : 'white'} />
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all hover:scale-105 active:scale-95",
                                    isScrolled
                                        ? "bg-navy text-white hover:bg-mountain-blue"
                                        : "bg-white text-navy hover:bg-cream"
                                )}
                            >
                                Book Now
                            </button>
                        </div>

                        {/* Mobile Menu Button (Now properly grouped on the right) */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 -mr-2"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className={isScrolled ? 'text-navy dark:text-white' : 'text-white'} size={28} />
                                ) : (
                                    <Menu className={isScrolled ? 'text-navy dark:text-white' : 'text-white'} size={28} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg p-4 lg:hidden flex flex-col space-y-4 animate-in slide-in-from-top-2 border-t dark:border-slate-800">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "font-medium py-3 px-3 rounded-md transition-colors",
                                        isActive
                                            ? "bg-slate-50 dark:bg-slate-800 text-mountain-blue font-semibold"
                                            : "text-gray-800 dark:text-gray-200 active:bg-slate-100 dark:active:bg-slate-800"
                                    )}
                                    onClick={(e) => {
                                        if (link.href.startsWith('/#')) {
                                            handleNavClick(e, link.href)
                                        } else {
                                            setIsMobileMenuOpen(false)
                                        }
                                    }}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}

                        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 pt-4 border-t dark:border-slate-800">
                            <Phone size={16} />
                            <span>{websiteData.property.contact.phone}</span>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Sticky Booking Bar */}
            <div
                className={cn(
                    "lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 p-4 pb-safe flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform duration-500",
                    isScrolled ? "translate-y-0" : "translate-y-full"
                )}
            >
                <div className="min-w-0 pr-3">
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider truncate">Book Your Stay</p>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">Best rates guaranteed</p>
                </div>
                <button
                    onClick={() => setIsBookingOpen(true)}
                    className="flex-shrink-0 bg-primary text-white px-5 sm:px-6 py-2.5 rounded-full font-medium shadow-md active:scale-95 transition-transform text-sm sm:text-base"
                >
                    Book Now
                </button>
            </div>

            {/* Weather Widget (Mobile/Tablet View adjustment might be needed, but placing here for now) */}

            <BookingWidget
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                promoCode={bookingPromoCode}
                roomId={bookingRoomId}
            />
        </>
    )
}
