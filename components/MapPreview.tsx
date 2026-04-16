'use client'

import { useEffect, useState } from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const DEFAULT_LOCATION: [number, number] = [19.0760, 72.8777] // Mumbai

const MapPreview = () => {
    const [position, setPosition] = useState<[number, number]>(DEFAULT_LOCATION)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude])
            },
            (err) => {
                console.log("Geolocation denied or failed", err)
            }
        )
    }, [])

    return (
        <MapContainer center={position} zoom={14} className="w-full h-75 rounded-xl">
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} />
        </MapContainer>
    )
}

export default MapPreview