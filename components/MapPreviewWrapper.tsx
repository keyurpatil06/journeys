'use client'

import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

const MapPreview = dynamic(() => import('@/components/MapPreview'), {
    ssr: false,
})

const MapPreviewWrapper = ({ height }: { height?: string }) => {
    const router = useRouter();

    return (
        <div
            onFocus={() => { router.push('/search') }}
            className="cursor-pointer"
        >
            <MapPreview height={height} />
        </div>
    )
}

export default MapPreviewWrapper