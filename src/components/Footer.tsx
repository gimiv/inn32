'use client'

import Link from 'next/link'
import Logo from './Logo'
import { websiteData } from '../data/website-data'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
    const { property } = websiteData
    const currentYear = new Date().getFullYear()
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="mb-6 md:mb-0">
                        <Logo className="h-16 w-auto mb-4" variant="white" />
                        <p className="max-w-xs text-gray-500 text-sm">
                            {websiteData.property.description}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-2 text-gray-400">
                            <p>{property.address.street}</p>
                            <p>{property.address.city}, {property.address.state} {property.address.zip}</p>
                            <p className="mt-4"><a href={`tel:${property.contact.phone}`} className="hover:text-white transition-colors">{property.contact.phone}</a></p>
                            <p><a href={`mailto:${property.contact.email}`} className="hover:text-white transition-colors">{property.contact.email}</a></p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Navigate</h4>
                        <div className="flex flex-col space-y-2 text-gray-400 mb-8">
                            <Link href="/rooms" className="hover:text-white transition-colors">Rooms</Link>
                            <Link href="/amenities" className="hover:text-white transition-colors">Amenities</Link>
                            <Link href="/things-to-do" className="hover:text-white transition-colors">Things To Do</Link>
                            <Link href="/location" className="hover:text-white transition-colors">Location</Link>
                            <button onClick={() => window.dispatchEvent(new CustomEvent('open-booking-widget'))} className="hover:text-white transition-colors text-left w-fit">Book Now</button>
                        </div>
                        <h4 className="text-lg font-semibold mb-4">Preferences</h4>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-400 text-sm">Theme</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {mounted ? (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {currentYear} {property.name}. All rights reserved.</p>
            </div>
        </footer>
    )
}
