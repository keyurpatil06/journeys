'use client'

import dynamic from "next/dynamic"

const MapPreview = dynamic(() => import('@/components/MapPreview'), {
    ssr: false,
})

const MapPreviewWrapper = () => {
    return <MapPreview />
}

export default MapPreviewWrapper