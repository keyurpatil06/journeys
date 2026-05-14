'use client'

import { useEffect, useState } from "react"
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const DEFAULT_LOCATION: [number, number] = [19.0760, 72.8777]

// Move map when coords change
const ChangeMapView = ({ coords, }: { coords: [number, number] }) => {
    const map = useMap()

    useEffect(() => {
        map.flyTo(coords, 14)
    }, [coords, map])

    return null
}

const MapPreview = ({ position, height = "300px", }: MapPreviewProps) => {

    const [currentPosition, setCurrentPosition] = useState<[number, number]>(position || DEFAULT_LOCATION)

    useEffect(() => {
        // If parent passes position then use it
        if (position) {
            setCurrentPosition(position)
            return
        }

        // Else use user location
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCurrentPosition([
                    pos.coords.latitude,
                    pos.coords.longitude,
                ])
            },
            (err) => {
                console.log(
                    "Geolocation denied or failed",
                    err
                )
            }
        )
    }, [position])

    return (
        <MapContainer
            center={currentPosition}
            zoom={14}
            className="w-full rounded-xl z-0"
            style={{ height }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ChangeMapView coords={currentPosition} />

            <Marker position={currentPosition} />
        </MapContainer>
    )
}

export default MapPreview