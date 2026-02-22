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
    roomId?: string
}

export default function BookingWidget({ isOpen, onClose, promoCode, roomId }: BookingWidgetProps) {
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

            const openOptions: any = {}
            if (roomId) {
                openOptions.resourceCategoryId = roomId // Standard Mews property mapping for room categories
            }

            if (promoCode) {
                // Try to set voucher code if API supports it
                if (typeof mewsApi.setVoucherCode === 'function') {
                    mewsApi.setVoucherCode(promoCode)
                    mewsApi.open(openOptions)
                } else {
                    // Fallback: try passing in open options if setVoucherCode isn't available
                    mewsApi.open({ ...openOptions, voucherCode: promoCode })
                    console.warn('Mews API does not support setVoucherCode, opening with fallback options.')
                }
            } else {
                mewsApi.open(openOptions)
            }
            // Close our state immediately to prevent conflicts
            onClose()
        }
    }, [isOpen, mewsApi, onClose, promoCode, roomId])

    return null
}
