import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
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
                <Sun
                    className={cn(
                        "absolute w-4 h-4 text-amber-500 transition-all duration-300 transform",
                        theme === 'dark' ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-4 rotate-90 scale-50"
                    )}
                />
                <Moon
                    className={cn(
                        "absolute w-4 h-4 text-slate-700 transition-all duration-300 transform",
                        theme === 'dark' ? "opacity-0 -translate-y-4 -rotate-90 scale-50" : "opacity-100 translate-y-0 rotate-0"
                    )}
                />
            </div>
            {temp !== null ? <span className="font-sans">{temp}°F</span> : null}
        </button>
    )
}

