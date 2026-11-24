'use client'

import { useState } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { Property } from '../types/website'
import { SEASONAL_STAY_INQUIRY_TYPE } from '../utils/groupInquiry'

interface SeasonalInquiryFormProps {
    property: Property
    roomOptions: { label: string; soldOutSeasons: string[] }[]
    seasonOptions: string[]
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function SeasonalInquiryForm({ property, roomOptions, seasonOptions }: SeasonalInquiryFormProps) {
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
        const roomType = String(formData.get('roomType') ?? '')
        const seasons = formData.getAll('season').map(String)
        const phone = String(formData.get('phone') ?? '').trim()
        const notes = formData.get('message')

        const clientErrors: Record<string, string> = {}
        if (!phone) clientErrors.phone = 'Phone is required.'
        if (!roomType) clientErrors.roomType = 'Select a room type.'
        if (seasons.length === 0) clientErrors.season = 'Select at least one season.'
        if (Object.keys(clientErrors).length > 0) {
            setFormStatus('error')
            setFieldErrors(clientErrors)
            setErrorMessage('Please fill in the required fields.')
            return
        }

        const message = [
            `Room type: ${roomType}`,
            `Season: ${seasons.join(', ')}`,
            notes ? String(notes) : null,
        ]
            .filter(Boolean)
            .join('\n\n')

        const payload = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            eventType: SEASONAL_STAY_INQUIRY_TYPE,
            dates: seasons.join(', '),
            guestCount: guestCountRaw ? Number(guestCountRaw) : undefined,
            message,
            honeypot: formData.get('companyWebsite'),
        }

        try {
            const response = await fetch('/api/group-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const result = await response.json().catch(() => null)

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

    const inputClasses = "w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
    const labelClasses = "block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1"
    const errorTextClasses = "text-xs text-red-600 dark:text-red-400 mt-1"

    const fieldError = (name: string) =>
        fieldErrors[name] ? (
            <p id={`seasonal-${name}-error`} className={errorTextClasses}>{fieldErrors[name]}</p>
        ) : null

    const describedBy = (name: string) => (fieldErrors[name] ? `seasonal-${name}-error` : undefined)

    return (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Submit a Request</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
                Tell us which room and season you&apos;re interested in. We&apos;ll reply with availability.
            </p>

            {formStatus === 'success' ? (
                <div className="text-center py-12" role="status" aria-live="polite">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Inquiry Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                        Thanks for reaching out. We&apos;ll get back to you within 24 hours with availability and rates.
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
                    <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="seasonal-company-website">Company Website</label>
                        <input id="seasonal-company-website" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
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
                                <label htmlFor="seasonal-firstName" className={labelClasses}>First Name</label>
                                <input id="seasonal-firstName" name="firstName" type="text" required maxLength={80}
                                    aria-invalid={!!fieldErrors.firstName} aria-describedby={describedBy('firstName')} className={inputClasses} />
                                {fieldError('firstName')}
                            </div>
                            <div>
                                <label htmlFor="seasonal-lastName" className={labelClasses}>Last Name</label>
                                <input id="seasonal-lastName" name="lastName" type="text" required maxLength={80}
                                    aria-invalid={!!fieldErrors.lastName} aria-describedby={describedBy('lastName')} className={inputClasses} />
                                {fieldError('lastName')}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="seasonal-email" className={labelClasses}>Email</label>
                                <input id="seasonal-email" name="email" type="email" required maxLength={254}
                                    aria-invalid={!!fieldErrors.email} aria-describedby={describedBy('email')} className={inputClasses} />
                                {fieldError('email')}
                            </div>
                            <div>
                                <label htmlFor="seasonal-phone" className={labelClasses}>Phone</label>
                                <input id="seasonal-phone" name="phone" type="tel" required maxLength={30}
                                    aria-invalid={!!fieldErrors.phone} aria-describedby={describedBy('phone')} className={inputClasses} />
                                {fieldError('phone')}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="seasonal-roomType" className={labelClasses}>Room Type</label>
                                <select id="seasonal-roomType" name="roomType" required defaultValue=""
                                    aria-invalid={!!fieldErrors.roomType} aria-describedby={describedBy('roomType')} className={inputClasses}>
                                    <option value="" disabled>Select a room type</option>
                                    {roomOptions.map((room) => (
                                        <option key={room.label} value={room.label}>
                                            {room.label}
                                            {room.soldOutSeasons.length > 0 ? ` (sold out: ${room.soldOutSeasons.join(', ')})` : ''}
                                        </option>
                                    ))}
                                </select>
                                {fieldError('roomType')}
                            </div>
                            <div>
                                <label htmlFor="seasonal-guestCount" className={labelClasses}>Guests</label>
                                <input id="seasonal-guestCount" name="guestCount" type="number" min={1} max={20}
                                    aria-invalid={!!fieldErrors.guestCount} aria-describedby={describedBy('guestCount')} className={inputClasses} />
                                {fieldError('guestCount')}
                            </div>
                        </div>

                        <fieldset aria-describedby={describedBy('season')}>
                            <legend className={labelClasses}>Season</legend>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                                {seasonOptions.map((season) => (
                                    <label key={season} className="inline-flex items-center gap-2 text-slate-700 dark:text-gray-300">
                                        <input type="checkbox" name="season" value={season}
                                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                                        {season}
                                    </label>
                                ))}
                            </div>
                            {fieldError('season')}
                        </fieldset>

                        <div>
                            <label htmlFor="seasonal-message" className={labelClasses}>Anything else we should know?</label>
                            <textarea id="seasonal-message" name="message" rows={4} maxLength={4500}
                                placeholder="Move-in date, length of stay, pets, anything else..."
                                aria-invalid={!!fieldErrors.message} aria-describedby={describedBy('message')} className={inputClasses} />
                            {fieldError('message')}
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            aria-busy={formStatus === 'submitting'}
                            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {formStatus === 'submitting' ? 'Sending...' : 'Submit Request'}
                        </button>
                        <p className="text-xs text-slate-500 text-center mt-4">
                            No payment is required to inquire.
                        </p>
                    </div>
                </form>
            )}
        </div>
    )
}
