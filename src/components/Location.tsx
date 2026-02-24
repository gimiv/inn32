'use client'

import { Property } from '../types/website'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import SectionHeader from './ui/SectionHeader'
import ErrorBoundary from './ui/ErrorBoundary'
import { cn } from '../utils/cn'

const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#cbd5e1" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#334155" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#334155" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#475569" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#cbd5e1" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
    { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#1e3a8a" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#1e40af" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#172554" }] }
]

const lightMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#f8fafc" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#1e293b" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e2e8f0" }] },
    { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e2e8f0" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#cbd5e1" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#94a3b8" }] },
    { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#1e293b" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f1f5f9" }] },
    { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#bfdbfe" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3b82f6" }] },
    { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#eff6ff" }] }
]

interface LocationProps {
    property: Property;
    standalone?: boolean;
}

export default function Location({ property, standalone }: LocationProps) {
    const { theme } = useTheme();
    const mapStyle = theme === 'dark' ? darkMapStyle : lightMapStyle;
    return (
        <section id="location" className={cn("transition-colors duration-300", standalone ? "pb-20 pt-4 md:pt-8 bg-transparent" : "py-20 bg-gray-50 dark:bg-slate-800/50")}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                {!standalone && (
                    <SectionHeader
                        label="Getting Here"
                        title="Location & Contact"
                        subtitle="Conveniently located in the heart of the White Mountains."
                        align="center"
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Map */}
                    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700/50">
                        <ErrorBoundary fallback={
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-800 p-6 text-center">
                                <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium text-navy dark:text-white mb-2">Map Unavailable</h3>
                                <p className="text-gray-500 max-w-sm">
                                    We couldn't load the interactive map right now. You can still use the address details provided to find us.
                                </p>
                            </div>
                        }>
                            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                                <Map
                                    defaultCenter={property.address.coordinates}
                                    defaultZoom={14}
                                    gestureHandling={'greedy'}
                                    disableDefaultUI={true}
                                    styles={mapStyle}
                                >
                                    <Marker position={property.address.coordinates} />
                                </Map>
                            </APIProvider>
                        </ErrorBoundary>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Address Card */}
                        <div className="bg-white dark:bg-slate-800/50 dark:border dark:border-slate-700/50 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 font-serif">
                                        Address
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {property.address.street}<br />
                                        {property.address.city}, {property.address.state} {property.address.zip}<br />
                                        {property.address.country}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Cards Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Phone */}
                            <a
                                href={`tel:${property.contact.phone}`}
                                className="bg-white dark:bg-slate-800/50 dark:border dark:border-slate-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group focus-visible:ring-2 focus-visible:ring-mountain-blue focus-visible:outline-none"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 font-serif">
                                            Phone
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {property.contact.phone}
                                        </p>
                                    </div>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${property.contact.email}`}
                                className="bg-white dark:bg-slate-800/50 dark:border dark:border-slate-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group focus-visible:ring-2 focus-visible:ring-mountain-blue focus-visible:outline-none"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 font-serif">
                                            Email
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 break-all">
                                            {property.contact.email}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Hours */}
                        <div className="bg-white dark:bg-slate-800/50 dark:border dark:border-slate-700/50 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-serif">
                                        Check-in / Check-out
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Check-in</span>
                                            <p className="font-medium text-gray-900 dark:text-gray-200">{property.checkInTime}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 dark:text-gray-400">Check-out</span>
                                            <p className="font-medium text-gray-900 dark:text-gray-200">{property.checkOutTime}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

