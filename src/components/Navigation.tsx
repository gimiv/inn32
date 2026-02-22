import { useState, useEffect } from 'react'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
import { cn } from '../utils/cn'
import { websiteData } from '../data/website-data'
import Logo from './Logo'
import BookingWidget from './BookingWidget'
import { useTheme } from '../context/ThemeContext'

import { useNavigate, useLocation } from 'react-router-dom'

export default function Navigation() {
    const navigate = useNavigate()
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [bookingPromoCode, setBookingPromoCode] = useState<string | undefined>(undefined)
    const [bookingRoomId, setBookingRoomId] = useState<string | undefined>(undefined)

    const navLinks = [
        { name: 'Rooms', href: '/rooms' },
        { name: 'Amenities', href: '/amenities' },
        { name: 'Things To Do', href: '/things-to-do' },
        { name: 'Events', href: '/events' },
        { name: 'Groups', href: '/groups' },
        { name: 'Blog', href: '/blog' },
        { name: 'Location', href: '/#location' },
    ]

    const handleNavClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault()
            const id = href.substring(2) // Get the hash part
            if (location.pathname === '/') {
                const element = document.getElementById(id)
                if (element) {
                    const navHeight = 80 // Approx header height
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            } else {
                navigate('/', { state: { scrollTo: id } })
            }
        }
        setIsMobileMenuOpen(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            // If we're not on home page, always treat as scrolled (solid background)
            if (location.pathname !== '/') {
                setIsScrolled(true)
            } else {
                setIsScrolled(window.scrollY > 50)
            }
        }

        // Initial check
        handleScroll()

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

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('open-booking-widget', handleOpenWidget)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('open-booking-widget', handleOpenWidget)
        }
    }, [location.pathname])

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a href="/" onClick={(e) => handleNavClick(e, '#root')} className="flex-shrink-0">
                                <Logo
                                    className="h-12 w-auto"
                                    isScrolled={isScrolled}
                                />
                            </a>
                            <div className="hidden md:block ml-4">
                                <button
                                    onClick={toggleTheme}
                                    className={cn(
                                        "p-2 rounded-full transition-colors",
                                        isScrolled
                                            ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                                            : "text-white hover:bg-white/10"
                                    )}
                                    aria-label="Toggle theme"
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">

                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => link.href.startsWith('/#') ? handleNavClick(e, link.href) : undefined}
                                    className={cn(
                                        "text-sm font-medium hover:opacity-80 transition-colors",
                                        isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
                                    )}
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* Theme Toggle moved to left */}

                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95",
                                    isScrolled
                                        ? "bg-primary text-white hover:bg-primary/90"
                                        : "bg-white text-primary hover:bg-gray-100"
                                )}
                            >
                                Book Now
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-4 md:hidden">
                            <button
                                onClick={toggleTheme}
                                className={cn("p-2",
                                    isScrolled ? "text-gray-800 dark:text-white" : "text-white"
                                )}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className={isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'} size={28} />
                                ) : (
                                    <Menu className={isScrolled ? 'text-gray-800 dark:text-white' : 'text-white'} size={28} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg p-4 md:hidden flex flex-col space-y-4 animate-in slide-in-from-top-2 border-t dark:border-slate-800">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-800 dark:text-gray-200 font-medium py-3 px-2 active:bg-slate-100 dark:active:bg-slate-800 rounded-md transition-colors"
                                onClick={(e) => {
                                    if (link.href.startsWith('/#')) {
                                        handleNavClick(e, link.href)
                                    } else {
                                        setIsMobileMenuOpen(false)
                                    }
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="py-2 border-t border-gray-100 dark:border-slate-800 flex justify-center">
                            {/* Temperature removed */}
                        </div>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false)
                                setIsBookingOpen(true)
                            }}
                            className="bg-primary text-white text-center py-3 rounded-md font-medium"
                        >
                            Book Now
                        </button>
                        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 pt-4 border-t dark:border-slate-800">
                            <Phone size={16} />
                            <span>{websiteData.property.contact.phone}</span>
                        </div>
                    </div>
                )}
            </nav>

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
