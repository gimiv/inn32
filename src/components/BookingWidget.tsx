'use client'

import { useEffect, useRef, useState } from 'react'
import { resolveMewsOpenCall } from '../utils/mews'

const MEWS_IFRAME_TITLE = 'Inn 32 secure booking engine'
const MEWS_CONFIGURATION_ID = '8834fbb1-b9a1-4dbf-8e18-b2ba003e2e3d'

export function labelMewsIframes(root: ParentNode = document): void {
    root.querySelectorAll<HTMLIFrameElement>('iframe').forEach((iframe) => {
        const identity = `${iframe.id} ${iframe.name} ${iframe.src}`.toLowerCase()
        if (identity.includes('mews')) iframe.setAttribute('title', MEWS_IFRAME_TITLE)
    })
}

declare global {
    interface Window {
        Mews: any
    }
}

interface BookingWidgetProps {
    isOpen: boolean
    onClose: () => void
    promoCode?: string
    mewsCategoryId?: string
}

export default function BookingWidget({ isOpen, onClose, promoCode, mewsCategoryId }: BookingWidgetProps) {
    const initializedRef = useRef(false)
    const [mewsApi, setMewsApi] = useState<any>(null)

    useEffect(() => {
        labelMewsIframes()
        const observer = new MutationObserver(() => labelMewsIframes())
        observer.observe(document.body, { childList: true, subtree: true })
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (initializedRef.current) return

        const initMews = () => {
            if (window.Mews?.Distributor && !initializedRef.current) {
                initializedRef.current = true
                window.Mews.Distributor(
                    { configurationIds: [MEWS_CONFIGURATION_ID] },
                    (api: any) => setMewsApi(api)
                )
            }
        }

        initMews()
        const interval = window.setInterval(() => {
            if (window.Mews?.Distributor) {
                initMews()
                window.clearInterval(interval)
            }
        }, 500)
        const timeout = window.setTimeout(() => window.clearInterval(interval), 10000)

        return () => {
            window.clearInterval(interval)
            window.clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        if (!isOpen) return

        if (mewsApi) {
            openMews(mewsApi)
        } else if (window.Mews?.Distributor) {
            window.Mews.Distributor(
                { configurationIds: [MEWS_CONFIGURATION_ID] },
                (api: any) => {
                    setMewsApi(api)
                    openMews(api)
                }
            )
        }

        function openMews(api: any) {
            labelMewsIframes()
            const call = resolveMewsOpenCall(mewsCategoryId)
            const hasVoucherSetter = typeof api.setVoucherCode === 'function'

            if (promoCode && hasVoucherSetter) api.setVoucherCode(promoCode)

            if (call.method === 'showRates') {
                api.showRates(call.categoryId)
            } else if (promoCode && !hasVoucherSetter) {
                api.open({ voucherCode: promoCode })
            } else {
                api.open()
            }

            labelMewsIframes()
            onClose()
        }
    }, [isOpen, mewsApi, onClose, promoCode, mewsCategoryId])

    return null
}
