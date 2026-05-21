"use client"

import MapView from "@/components/MapViewWrapper"

const InteractiveMap = ({
    places,
    selectedPlaceId,
    onSelectPlace,
}: {
    places: ItineraryPlace[]
    selectedPlaceId?: string
    onSelectPlace: (id: string) => void
}) => {
    return (
        <MapView
            mode="interactive"
            places={places}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={onSelectPlace}
            className="h-155 w-full"
        />
    )
}

export default InteractiveMap
