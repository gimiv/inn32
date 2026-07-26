'use client'

import { useState } from 'react'
import { Users, Calendar, Utensils, Music, Mail, Phone, Check, AlertCircle } from 'lucide-react'
import { Property } from '../types/website'
import { GROUP_INQUIRY_EVENT_TYPES } from '../utils/groupInquiry'

interface GroupReservationsProps {
    property: Property
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function GroupReservations({ property }: GroupReservationsProps) {
    const [formStatus, setFormStatus] = useState<FormStatus>('idle')
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formStatus === 'submitting') return

        const form = e.currentTarget
        const formData = new FormData(form)

        setFormStatus('submitting')
        setFieldErrors({})
        setErrorMessage(null)

        const guestCountRaw = formData.get('guestCount')

        const payload = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            eventType: formData.get('eventType'),
            dates: formData.get('dates'),
            guestCount: guestCountRaw ? Number(guestCountRaw) : undefined,
            message: formData.get('message'),
            honeypot: formData.get('companyWebsite'),
        }

        try {
            const response = await fetch('/api/group-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const result = await response.json().catch(() => null)

            // Only ever show success when the server confirms the provider accepted the message.
            if (response.ok && result?.ok === true) {
                setFormStatus('success')
                form.reset()
            } else {
                setFormStatus('error')
                setFieldErrors(result?.errors ?? {})
                setErrorMessage(
                    result?.message ?? 'We could not send your inquiry. Please try again or contact us directly.'
                )
            }
        } catch {
            setFormStatus('error')
            setErrorMessage('We could not reach the server. Please check your connection or contact us directly.')
        }
    }

    const benefits = [
        {
            icon: Users,
            title: "Full Property Buyout",
            description: "Reserve all 24 rooms for complete privacy and exclusivity for your event."
        },
        {
            icon: Calendar,
            title: "Flexible Spaces",
            description: "Indoor and outdoor areas perfect for receptions, gatherings, and ceremonies."
        },
        {
            icon: Utensils,
            title: "Catering Options",
            description: "Partner with local vendors or bring your own to create the perfect menu."
        },
        {
            icon: Music,
            title: "Entertainment Ready",
            description: "Space for live bands, DJs, or acoustic setups to keep the party going."
        }
    ]

    const inputClasses = "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
    const labelClasses = "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1"
    const errorTextClasses = "text-xs text-red-600 dark:text-red-400 mt-1"

    return (
        <div className="bg-transparent transition-colors duration-300">
            {/* Benefits Section */}
            <section className="pb-12 pt-4 md:pt-8 bg-transparent transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 duration-300 border border-transparent dark:border-slate-600"
                            >
                                <div className="w-12 h-12 bg-primary/10 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-4 text-primary dark:text-blue-400">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-gray-300">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content & Form Split */}
            <section className="pt-8 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Text Content */}
                        <div className="lg:w-1/2">
                            <span className="font-sans text-sm font-semibold text-mountain-blue uppercase tracking-wider mb-2 block">
                                Group Accommodations
                            </span>
                            <h2 className="font-display text-page-title text-navy dark:text-white mb-6">
                                Bring Everyone Together
                            </h2>
                            <div className="prose prose-lg text-slate-600 dark:text-slate-300 mb-8">
                                <p className="mb-4">
                                    Whether you&apos;re planning a dream wedding, a milestone family reunion, or a focused corporate retreat,
                                    Inn 32 offers the perfect blend of comfort, style, and location.
                                </p>
                                <p className="mb-4">
                                    Our 24-room boutique hotel can be exclusively yours, providing a private campus for your guests
                                    to connect and celebrate. Located steps from North Woodstock&apos;s best dining and minutes from
                                    outdoor adventures, your group will have everything they need for a memorable stay.
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact Our Group Coordinator</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                                        <Phone className="w-5 h-5 mr-3 text-primary dark:text-blue-400" />
                                        <a href={`tel:${property.contact.phone}`} className="hover:underline">{property.contact.phone}</a>
                                    </div>
                                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                                        <Mail className="w-5 h-5 mr-3 text-primary dark:text-blue-400" />
                                        <a href={`mailto:${property.contact.email}`} className="hover:underline">{property.contact.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inquiry Form */}
                        <div className="lg:w-1/2">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 sticky top-24">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Start Planning</h3>

                                {formStatus === 'success' ? (
                                    <div className="text-center py-12" role="status" aria-live="polite">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h4>
                                        <p className="text-slate-600 dark:text-slate-300">
                                            Thank you for your inquiry. Our team will get back to you within 24 hours to discuss your event.
                                        </p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="mt-6 text-primary font-medium hover:underline"
                                        >
                                            Send another inquiry
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate>
                                        {/* Honeypot: hidden from sighted users and screen reader users, left in the tab order path for bots that fill every field. */}
                                        <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                                            <label htmlFor="group-company-website">Company Website</label>
                                            <input
                                                id="group-company-website"
                                                name="companyWebsite"
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            {errorMessage && (
                                                <div
                                                    role="alert"
                                                    aria-live="assertive"
                                                    className="flex items-start gap-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded-lg p-3"
                                                >
                                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                    <span>
                                                        {errorMessage} You can also reach us directly at{' '}
                                                        <a href={`tel:${property.contact.phone}`} className="underline">{property.contact.phone}</a>
                                                        {' '}or{' '}
                                                        <a href={`mailto:${property.contact.email}`} className="underline">{property.contact.email}</a>.
                                                    </span>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="group-first-name" className={labelClasses}>First Name</label>
                                                    <input
                                                        id="group-first-name"
                                                        name="firstName"
                                                        type="text"
                                                        required
                                                        maxLength={80}
                                                        aria-invalid={!!fieldErrors.firstName}
                                                        aria-describedby={fieldErrors.firstName ? 'group-first-name-error' : undefined}
                                                        className={inputClasses}
                                                    />
                                                    {fieldErrors.firstName && (
                                                        <p id="group-first-name-error" className={errorTextClasses}>{fieldErrors.firstName}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="group-last-name" className={labelClasses}>Last Name</label>
                                                    <input
                                                        id="group-last-name"
                                                        name="lastName"
                                                        type="text"
                                                        required
                                                        maxLength={80}
                                                        aria-invalid={!!fieldErrors.lastName}
                                                        aria-describedby={fieldErrors.lastName ? 'group-last-name-error' : undefined}
                                                        className={inputClasses}
                                                    />
                                                    {fieldErrors.lastName && (
                                                        <p id="group-last-name-error" className={errorTextClasses}>{fieldErrors.lastName}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="group-email" className={labelClasses}>Email</label>
                                                    <input
                                                        id="group-email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        maxLength={254}
                                                        aria-invalid={!!fieldErrors.email}
                                                        aria-describedby={fieldErrors.email ? 'group-email-error' : undefined}
                                                        className={inputClasses}
                                                    />
                                                    {fieldErrors.email && (
                                                        <p id="group-email-error" className={errorTextClasses}>{fieldErrors.email}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="group-phone" className={labelClasses}>Phone</label>
                                                    <input
                                                        id="group-phone"
                                                        name="phone"
                                                        type="tel"
                                                        maxLength={30}
                                                        aria-invalid={!!fieldErrors.phone}
                                                        aria-describedby={fieldErrors.phone ? 'group-phone-error' : undefined}
                                                        className={inputClasses}
                                                    />
                                                    {fieldErrors.phone && (
                                                        <p id="group-phone-error" className={errorTextClasses}>{fieldErrors.phone}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="group-event-type" className={labelClasses}>Event Type</label>
                                                <select
                                                    id="group-event-type"
                                                    name="eventType"
                                                    required
                                                    defaultValue={GROUP_INQUIRY_EVENT_TYPES[0]}
                                                    aria-invalid={!!fieldErrors.eventType}
                                                    aria-describedby={fieldErrors.eventType ? 'group-event-type-error' : undefined}
                                                    className={inputClasses}
                                                >
                                                    {GROUP_INQUIRY_EVENT_TYPES.map((type) => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                                {fieldErrors.eventType && (
                                                    <p id="group-event-type-error" className={errorTextClasses}>{fieldErrors.eventType}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="group-dates" className={labelClasses}>Est. Dates</label>
                                                    <input
                                                        id="group-dates"
                                                        name="dates"
                                                        type="text"
                                                        maxLength={200}
                                                        placeholder="MM/YYYY or Specific Dates"
                                                        aria-invalid={!!fieldErrors.dates}
                                                        aria-describedby={fieldErrors.dates ? 'group-dates-error' : undefined}
                                                        className={inputClasses}
                                                    />
                                                    {fieldErrors.dates && (
                                                        <p id="group-dates-error" className={errorTextClasses}>{fieldErrors.dates}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="group-guest-count" className={labelClasses}>Est. Guests</label>
                                                    <input
                                                        id="group-guest-count"
                                                        name="guestCount"
                                                        type="number"
                                                        min={1}
                                                        max={500}
                                                        aria-invalid={!!fieldErrors.guestCount}
                                                        aria-describedby={fieldErrors.guestCount ? 'group-guest-count-error' : undefined}
                                                        className={inputClasses}
                                                    />
                                                    {fieldErrors.guestCount && (
                                                        <p id="group-guest-count-error" className={errorTextClasses}>{fieldErrors.guestCount}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="group-message" className={labelClasses}>Additional Details</label>
                                                <textarea
                                                    id="group-message"
                                                    name="message"
                                                    rows={4}
                                                    maxLength={5000}
                                                    aria-invalid={!!fieldErrors.message}
                                                    aria-describedby={fieldErrors.message ? 'group-message-error' : undefined}
                                                    className={inputClasses}
                                                ></textarea>
                                                {fieldErrors.message && (
                                                    <p id="group-message-error" className={errorTextClasses}>{fieldErrors.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={formStatus === 'submitting'}
                                                aria-busy={formStatus === 'submitting'}
                                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                                            </button>
                                            <p className="text-xs text-slate-500 text-center mt-4">
                                                *This form is for inquiry purposes only. No payment is required at this stage.
                                            </p>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
