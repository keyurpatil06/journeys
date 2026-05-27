'use client'

import { useEffect, useState } from "react"
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import '@/lib/leaflet'

const DEFAULT_LOCATION: [number, number] = [19.0760, 72.8777]

const ChangeMapView = ({ coords, zoom, duration = 0.95 }: { coords: [number, number]; zoom?: number; duration?: number }) => {
    const map = useMap()

    useEffect(() => {
        map.flyTo(coords, zoom ?? map.getZoom(), { duration })
    }, [coords, zoom, map, duration])

    return null
}

// const ChangeMapView = ({ coords }: { coords: [number, number] }) => {
//     const map = useMap()

//     useEffect(() => {
//         map.panTo(coords, { animate: true })
//     }, [coords, map])

//     return null
// }

type BaseMapViewProps = {
    height?: string
    className?: string
}

type PreviewMapViewProps = BaseMapViewProps & {
    mode: "preview"
    position?: [number, number]
}

type InteractiveMapViewProps = BaseMapViewProps & {
    mode: "interactive"
    places: ItineraryPlace[]
    selectedPlaceId?: string
    onSelectPlace: (id: string) => void
}

export type MapViewProps = PreviewMapViewProps | InteractiveMapViewProps

const MapView = (props: MapViewProps) => {
    const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(props.mode === "preview" ? props.position ?? null : null)

    const isPreview = props.mode === "preview"
    const previewProps = isPreview ? props : null
    const selectedPlace = !isPreview ? props.places.find((place) => place.id === props.selectedPlaceId) : undefined
    const center: [number, number] = isPreview ? currentPosition ?? DEFAULT_LOCATION : selectedPlace?.coords ?? props.places[0]?.coords ?? DEFAULT_LOCATION
    const zoom = isPreview ? 12 : selectedPlace ? 16 : 8
    // const zoom = isPreview ? 15 : 13

    useEffect(() => {
        if (!isPreview) {
            return
        }

        if (props.position) {
            setCurrentPosition(props.position)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setCurrentPosition([pos.coords.latitude, pos.coords.longitude])
            },
            (err) => {
                console.log("Geolocation denied or failed", err)
            }
        )
    }, [previewProps])

    return (
        <div
            className={`overflow-hidden rounded-[32px] border border-border bg-slate-950 shadow-xl ${props.className ?? ""}`}
            style={props.height ? { height: props.height } : undefined}
        >
            <MapContainer center={center} zoom={zoom} className="h-full w-full" scrollWheelZoom={false}>
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ChangeMapView coords={center} zoom={zoom} />

                {isPreview ? (
                    <Marker position={center} />
                ) : (
                    <>
                        {props.places.map((place) => (
                            <Marker
                                key={place.id}
                                position={place.coords}
                                eventHandlers={{
                                    click: () => props.onSelectPlace(place.id),
                                }}
                            >
                                <Popup>{place.name}</Popup>
                            </Marker>
                        ))}

                        {selectedPlace ? (
                            <CircleMarker
                                center={selectedPlace.coords}
                                pathOptions={{ color: "#7c3aed", fillColor: "#ffffff", fillOpacity: 0.7 }}
                                radius={14}
                            />
                        ) : null}
                    </>
                )}
            </MapContainer>
        </div>
    )
}

export default MapView
