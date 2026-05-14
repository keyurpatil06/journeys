'use client'

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const MapPreview = dynamic(() => import('@/components/MapPreview'), {
    ssr: false,
})

const MapPreviewWrapper = () => {
    const router = useRouter();

    return (
        <div
            onFocus={() => { router.push('/search') }}
            className="cursor-pointer"
        >
            <MapPreview />
        </div>
    )
}

export default MapPreviewWrapper