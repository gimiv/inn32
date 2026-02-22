import { Property } from '../types/website'

interface LocationProps {
    property: Property
}

export default function Location({ property }: LocationProps) {
    return (
        <section id="location" className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2 block">
                        Find Us
                    </span>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif"
                    >
                        Location & Contact
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map Placeholder */}
                    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-200">
                        {/* Static map placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 font-medium">
                                    Interactive Map
                                </p>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        `${property.address.street}, ${property.address.city}, ${property.address.state}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium"
                                >
                                    Open in Google Maps &rarr;
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Address Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1 font-serif">
                                        Address
                                    </h3>
                                    <p className="text-gray-600">
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
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1 font-serif">
                                            Phone
                                        </h3>
                                        <p className="text-gray-600">
                                            {property.contact.phone}
                                        </p>
                                    </div>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href={`mailto:${property.contact.email}`}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1 font-serif">
                                            Email
                                        </h3>
                                        <p className="text-gray-600 break-all">
                                            {property.contact.email}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Hours */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2 font-serif">
                                        Check-in / Check-out
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Check-in</span>
                                            <p className="font-medium text-gray-900">{property.checkInTime}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Check-out</span>
                                            <p className="font-medium text-gray-900">{property.checkOutTime}</p>
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
