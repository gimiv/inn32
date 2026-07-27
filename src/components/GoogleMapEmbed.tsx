'use client'

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'

export interface GoogleMapEmbedProps {
    apiKey: string
    center: { lat: number; lng: number }
    mapStyle: google.maps.MapTypeStyle[]
}

/**
 * Only ever mounted after the visitor explicitly opts in (see Location.tsx),
 * so this is the sole place the Google Maps JS/resources get loaded.
 */
export default function GoogleMapEmbed({ apiKey, center, mapStyle }: GoogleMapEmbedProps) {
    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter={center}
                defaultZoom={14}
                gestureHandling={'cooperative'}
                disableDefaultUI={true}
                styles={mapStyle}
            >
                <Marker position={center} />
            </Map>
        </APIProvider>
    )
}
