import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'
import { useTheme } from '../context/ThemeContext'

interface TemperatureProps {
    className?: string;
    variant?: 'white' | 'color'; // 'white' for transparent header, 'color' for scrolled/mobile
}

export default function Temperature({ className, variant = 'white' }: TemperatureProps) {
    const [temp, setTemp] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Fetch weather for North Woodstock, NH
        // Lat: 44.0281, Lng: -71.6817
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=44.0281&longitude=-71.6817&current=temperature_2m&temperature_unit=fahrenheit'
                )
                const data = await response.json()
                if (data.current && data.current.temperature_2m) {
                    setTemp(Math.round(data.current.temperature_2m))
                }
            } catch (error) {
                console.error("Failed to fetch weather:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()

        // Refresh every 30 mins
        const interval = setInterval(fetchWeather, 30 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    if (loading || !mounted) return <div className="w-16 h-6 animate-pulse bg-gray-200/20 rounded" />;

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "group flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:opacity-80 px-3 py-1.5 rounded-full",
                variant === 'white'
                    ? "text-white/90 hover:bg-white/10"
                    : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                className
            )}
            aria-label="Toggle theme and view temperature"
        >
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                    {theme === 'dark' ? (
                        <motion.div
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: 90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun className="w-4 h-4 text-amber-500" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ y: -20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Moon className="w-4 h-4 text-slate-700" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <span className="font-sans">{temp}°F</span>
        </button>
    )
}

