import { useState, useEffect } from 'react'

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
