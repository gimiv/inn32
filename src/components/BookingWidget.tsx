'use client'

import { useState, useEffect, useRef } from 'react'

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
    const initializedRef = useRef(false)
    const [mewsApi, setMewsApi] = useState<any>(null)

    // Pre-initialize Mews when script loads
    useEffect(() => {
        if (initializedRef.current) return

        const initMews = () => {
            if (window.Mews && window.Mews.Distributor && !initializedRef.current) {
                initializedRef.current = true
                window.Mews.Distributor(
                    {
                        configurationIds: ["8834fbb1-b9a1-4dbf-8e18-b2ba003e2e3d"],
                    },
                    (api: any) => {
                        console.log('Mews API initialized on background:', api)
                        setMewsApi(api)
                    }
                )
            }
        }

        // Try immediately
        initMews()

        // Fallback polling in case the Next.js <Script> loads slightly later
        const interval = setInterval(() => {
            if (window.Mews && window.Mews.Distributor) {
                initMews()
                clearInterval(interval)
            }
        }, 500)

        // Stop polling after 10 seconds to avoid infinite background loops
        const timeout = setTimeout(() => clearInterval(interval), 10000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    // Handle opening the widget
    useEffect(() => {
        if (isOpen) {
            if (mewsApi) {
                openMews(mewsApi)
            } else if (window.Mews && window.Mews.Distributor) {
                // Failsafe in case the user clicked immediately before background init succeeded
                window.Mews.Distributor(
                    { configurationIds: ["8834fbb1-b9a1-4dbf-8e18-b2ba003e2e3d"] },
                    (api: any) => {
                        setMewsApi(api)
                        openMews(api)
                    }
                )
            } else {
                console.warn('Mews script has not finished loading.')
                // Keep trying to open once it loads ? 
                // In actual UX, you'd show a "Loading..." spinner, but it loads very fast.
                onClose()
            }
        }

        function openMews(api: any) {
            const openOptions: any = {}
            if (roomId) {
                openOptions.resourceCategoryId = roomId
            }

            if (promoCode) {
                if (typeof api.setVoucherCode === 'function') {
                    api.setVoucherCode(promoCode)
                    api.open(openOptions)
                } else {
                    api.open({ ...openOptions, voucherCode: promoCode })
                }
            } else {
                api.open(openOptions)
            }

            onClose() // Reset our internal open state so it can be re-triggered later
        }
    }, [isOpen, mewsApi, onClose, promoCode, roomId])

    return null
}
