'use client'

import Cards from "@/components/Cards"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import { travelCardsData } from "@/constants"
import dynamic from "next/dynamic"

const MapPreview = dynamic(() => import('@/components/MapPreview'), {
    ssr: false,
})

const page = () => {
    const loggedIn = 'Keyur';

    return (
        <div className="w-full min-h-screen flex flex-col p-4 bg-slate-200">
            <Header user={loggedIn} />
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