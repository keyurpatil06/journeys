'use client'

import dynamic from "next/dynamic"
type MapViewProps = import("@/components/MapView").MapViewProps

const LazyMapView = dynamic<MapViewProps>(() => import("@/components/MapView").then((mod) => mod.default), {
    ssr: false,
})

const MapViewWrapper = (props: MapViewProps) => {
    return <LazyMapView {...props} />
}

export default MapViewWrapper
