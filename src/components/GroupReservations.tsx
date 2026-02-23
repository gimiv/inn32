'use client'

import { useState } from 'react'
import { Users, Calendar, Utensils, Music, Mail, Phone, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { websiteData } from '../data/website-data'

export default function GroupReservations() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus('submitting')

        // Simulate API call
        setTimeout(() => {
            setFormStatus('success')
        }, 1500)
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

    return (
        <div className="bg-transparent transition-colors duration-300">
            {/* Benefits Section */}
            <section className="pb-12 pt-4 md:pt-8 bg-transparent transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent dark:border-slate-600"
                            >
                                <div className="w-12 h-12 bg-primary/10 dark:bg-blue-900/40 rounded-full flex items-center justify-center mb-4 text-primary dark:text-blue-400">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
                                <p className="text-slate-600 dark:text-gray-300">{benefit.description}</p>
                            </motion.div>
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
                                    Whether you're planning a dream wedding, a milestone family reunion, or a focused corporate retreat,
                                    Inn 32 offers the perfect blend of comfort, style, and location.
                                </p>
                                <p className="mb-4">
                                    Our 24-room boutique hotel can be exclusively yours, providing a private campus for your guests
                                    to connect and celebrate. Located steps from North Woodstock's best dining and minutes from
                                    outdoor adventures, your group will have everything they need for a memorable stay.
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Contact Our Group Coordinator</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                                        <Phone className="w-5 h-5 mr-3 text-primary dark:text-blue-400" />
                                        <span>{websiteData.property.contact.phone}</span>
                                    </div>
                                    <div className="flex items-center text-slate-600 dark:text-slate-300">
                                        <Mail className="w-5 h-5 mr-3 text-primary dark:text-blue-400" />
                                        <span>{websiteData.property.contact.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inquiry Form */}
                        <div className="lg:w-1/2">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 sticky top-24">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Start Planning</h3>

                                {formStatus === 'success' ? (
                                    <div className="text-center py-12">
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
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">First Name</label>
                                                <input type="text" required className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Last Name</label>
                                                <input type="text" required className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Email</label>
                                                <input type="email" required className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Phone</label>
                                                <input type="tel" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Event Type</label>
                                            <select className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                                                <option>Wedding Block</option>
                                                <option>Corporate Retreat</option>
                                                <option>Family Reunion</option>
                                                <option>Social Event</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Est. Dates</label>
                                                <input type="text" placeholder="MM/YYYY or Specific Dates" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Est. Guests</label>
                                                <input type="number" min="1" className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Additional Details</label>
                                            <textarea rows={4} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                                        </button>
                                        <p className="text-xs text-slate-500 text-center mt-4">
                                            *This form is for inquiry purposes only. No payment is required at this stage.
                                        </p>
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
