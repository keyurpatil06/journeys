'use client'

import Cards from "@/components/Cards"
import SearchBar from "@/components/SearchBar"
import { travelCardsData } from "@/constants"
import dynamic from "next/dynamic"

const MapPreview = dynamic(() => import('@/components/MapPreview'), {
    ssr: false,
})

const page = () => {

    return (
        <div className="w-full min-h-screen flex flex-col p-4">
            <SearchBar />

            <div className="map-preview">
                <MapPreview />
            </div>

            <div className="places-cards">
                <Cards cards={travelCardsData} />
            </div>
        </div>
    )
}

export default page