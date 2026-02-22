import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { Calendar } from './Calendar'
import { websiteData } from '../data/website-data'

declare global {
    interface Window {
        Mews: any
    }
}

interface BookingWidgetProps {
    isOpen: boolean
    onClose: () => void
    promoCode?: string
}

export default function BookingWidget({ isOpen, onClose, promoCode }: BookingWidgetProps) {
    const { property } = websiteData

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [rooms, setRooms] = useState(1)
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    // const [promoCode, setPromoCode] = useState('') // Removed local state to avoid conflict
    const [promoApplied, setPromoApplied] = useState(false)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const [mewsApi, setMewsApi] = useState<any>(null)

    // Initialize Mews
    useEffect(() => {
        if (window.Mews && window.Mews.Distributor) {
            window.Mews.Distributor(
                {
                    configurationIds: ["8834fbb1-b9a1-4dbf-8e18-b2ba003e2e3d"],
                },
                (api: any) => {
                    console.log('Mews API Object:', api)
                    setMewsApi(api)
                }
            )
        }
    }, [])

    const handleInputClick = () => {
        setIsCalendarOpen(true)
    }

    // Prevent body scroll only when open
    useEffect(() => {
        if (isOpen) {
            // If Mews API is ready, open it immediately
            if (window.Mews && window.Mews.Distributor) {
                // We don't need to do anything here, the handleBookNow in Navigation should likely trigger Mews directly
                // But if we want to keep the "smooth motion" of our sidebar as a "loading" state...
            }
        }
    }, [isOpen])

    // If we are just a wrapper, we should probably just be a "Loading..." state while Mews opens
    useEffect(() => {
        if (isOpen && mewsApi) {
            if (promoCode) {
                // Try to set voucher code if API supports it
                if (typeof mewsApi.setVoucherCode === 'function') {
                    mewsApi.setVoucherCode(promoCode)
                    mewsApi.open()
                } else {
                    // Fallback: try passing in open options if setVoucherCode isn't available
                    // Note: The standard open() might not take args, but some versions do. 
                    // If setVoucherCode fails, we just open.
                    mewsApi.open()
                    console.warn('Mews API does not support setVoucherCode, opening without it.')
                }
            } else {
                mewsApi.open()
            }
            // Close our state immediately to prevent conflicts
            onClose()
        }
    }, [isOpen, mewsApi, onClose, promoCode])

    return null
}

function XIcon(props: any) {
    return (
        <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}
