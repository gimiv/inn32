import { useState, useEffect } from 'react'
import { CloudSun } from 'lucide-react'
import { cn } from '../utils/cn'

interface TemperatureProps {
    className?: string;
    variant?: 'white' | 'color'; // 'white' for transparent header, 'color' for scrolled/mobile
}

export default function Temperature({ className, variant = 'white' }: TemperatureProps) {
    const [temp, setTemp] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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

    if (loading) return null; // Or a subtle skeleton, but null is cleaner for "subtle"

    return (
        <div className={cn("flex items-center gap-2 text-sm font-medium transition-colors",
            variant === 'white' ? "text-white/90" : "text-slate-600",
            className
        )}>
            <CloudSun className="w-4 h-4" />
            <span>{temp}°F</span>
        </div>
    )
}
