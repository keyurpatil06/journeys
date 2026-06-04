'use client'

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
type MapViewProps = import("@/components/MapView").MapViewProps

const LazyMapView = dynamic<MapViewProps>(() => import("@/components/MapView").then((mod) => mod.default), {
    ssr: false,
})

type WrapperProps = Partial<MapViewProps>

const MapViewWrapper = (props: WrapperProps) => {
    if ((props as any).mode === "interactive") {
        const interactiveProps = props as any
        const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(interactiveProps.selectedPlaceId)

        const safeOnSelect = (id: string) => {
            setSelectedPlaceId(id)
            if (typeof interactiveProps.onSelectPlace === "function") {
                interactiveProps.onSelectPlace(id)
            }
        }

        const forwardedProps = useMemo(
            () => ({
                ...interactiveProps,
                selectedPlaceId,
                onSelectPlace: safeOnSelect,
            }),
            [interactiveProps, selectedPlaceId]
        )

        return <LazyMapView {...(forwardedProps as MapViewProps)} />
    }

    return <LazyMapView {...(props as any)} />
}

export default MapViewWrapper
