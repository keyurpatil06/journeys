"use client"

import DayPlanCard from "@/components/chat/DayPlanCard"
import NearbyPlacesSection from "@/components/chat/NearbyPlacesSection"
import PlaceCard from "@/components/chat/PlaceCard"

interface ItineraryCardProps {
    itinerary: TravelItinerary
    selectedPlaceId?: string
    onSelectPlace: (id: string) => void
}

const ItineraryCard = ({ itinerary, selectedPlaceId, onSelectPlace }: ItineraryCardProps) => {
    return (
        <section className="space-y-8 rounded-[34px] border border-border bg-white p-6 shadow-xl">
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                        {itinerary.location}
                    </span>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{itinerary.title}</h1>
                        <p className="text-sm leading-7 text-slate-600">{itinerary.overview}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-3xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Duration</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">{itinerary.duration}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Budget</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">{itinerary.budget}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Highlights</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">{itinerary.recommendedPlaces.length} picks</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Quick Brief</p>
                    <div className="mt-4 space-y-3 text-sm leading-7">
                        <p>{itinerary.overview}</p>
                        <p className="text-slate-300">Tap any place to sync the map and explore restaurant or stay options nearby.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-5">
                {itinerary.days.map((day) => (
                    <DayPlanCard
                        key={day.day}
                        day={day.day}
                        summary={day.summary}
                        activities={day.activities}
                        travelTips={day.travelTips}
                    />
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Recommended places</p>
                            <p className="text-sm text-muted-foreground">Top sights, cafés and hotels selected for your trip.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {itinerary.recommendedPlaces.map((place) => (
                            <PlaceCard
                                key={place.id}
                                place={place}
                                selected={place.id === selectedPlaceId}
                                onSelect={onSelectPlace}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <NearbyPlacesSection
                        title="Cafes near your route"
                        items={itinerary.nearby.cafes}
                        selectedId={selectedPlaceId}
                        onSelect={onSelectPlace}
                    />
                    <NearbyPlacesSection
                        title="Top restaurants"
                        items={itinerary.nearby.restaurants}
                        selectedId={selectedPlaceId}
                        onSelect={onSelectPlace}
                    />
                    <NearbyPlacesSection
                        title="Preferred hotels"
                        items={itinerary.nearby.hotels}
                        selectedId={selectedPlaceId}
                        onSelect={onSelectPlace}
                    />
                </div>
            </div>
        </section>
    )
}

export default ItineraryCard
