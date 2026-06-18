"use client"

import MapView from "@/components/MapViewWrapper"

const MapPreview = ({ position, height = "500px" }: MapPreviewProps) => {
    return <MapView mode="preview" position={position} height={height} />
}

export default MapPreview
