"use client";

import { useState } from "react";
import SearchPlaces from "@/components/SearchPlaces";
import JourneyPlaceCard from "@/components/JourneyPlaceCard";
import { Input } from "@/components/ui/input";
import { searchNearbyPlaces } from "@/lib/actions/search.actions";
import { saveJourneyList } from "@/lib/actions/journey.actions";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOCATION } from "@/constants";

const UploadTripPlan = () => {
    const [title, setTitle] = useState("");
    const [tripDescription, setTripDescription] = useState("");
    const [journeyPlaces, setJourneyPlaces] = useState<JourneyPlace[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const searchParams = useSearchParams();
    const place = searchParams.get("place") ?? '';
    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));

    const searchedLocation: [number, number] = (lat !== 0 && lon !== 0) ? [lat, lon] : DEFAULT_LOCATION;

    const handlePlaceSelect = (place: SearchedPlace) => {
        const alreadyExists = journeyPlaces.find((p) => p.id === place.id);
        if (alreadyExists) return;

        setJourneyPlaces((prev) => [
            ...prev,
            {
                ...place,
                images: [],
                description: "",
                hotels: [],
                cafesAndRestaurants: [],
            },
        ]);
    };

    const removePlace = (id: number) => {
        setJourneyPlaces((prev) => prev.filter((place) => place.id !== id));
    };

    const updateDescription = (id: number, value: string) => {
        setJourneyPlaces((prev) =>
            prev.map((place) =>
                place.id === id ? { ...place, description: value } : place
            )
        );
    };

    const updateImages = (id: number, images: string[]) => {
        setJourneyPlaces((prev) =>
            prev.map((place) =>
                place.id === id ? { ...place, images } : place
            )
        );
    };

    const addNearbyPlace = (
        journeyPlaceId: number,
        type: "hotels" | "cafesAndRestaurants",
        place: NearbyPlace
    ) => {
        setJourneyPlaces((prev) =>
            prev.map((journeyPlace) => {
                if (journeyPlace.id !== journeyPlaceId) return journeyPlace;

                const alreadyExists = journeyPlace[type].find(
                    (p) => p.id === place.id
                );
                if (alreadyExists) return journeyPlace;

                return {
                    ...journeyPlace,
                    [type]: [...journeyPlace[type], place],
                };
            })
        );
    };

    const removeNearbyPlace = (
        journeyPlaceId: number,
        type: "hotels" | "cafesAndRestaurants",
        placeId: number
    ) => {
        setJourneyPlaces((prev) =>
            prev.map((journeyPlace) => {
                if (journeyPlace.id !== journeyPlaceId) return journeyPlace;
                return {
                    ...journeyPlace,
                    [type]: journeyPlace[type].filter((place) => place.id !== placeId),
                };
            })
        );
    };

    const handlePublish = async () => {
        if (!title.trim() || !tripDescription.trim()) {
            alert("Please add a journey title and description.");
            return;
        }

        if (journeyPlaces.length === 0) {
            alert("Add at least one place before publishing.");
            return;
        }

        setIsSaving(true);

        try {
            const result = await saveJourneyList({
                title,
                tripDescription,
                coverImage: journeyPlaces[0]?.images?.[0] ?? "https://picsum.photos/seed/hills/800/600",
                places: journeyPlaces,
            });

            console.log("Saved journey list:", result);
            alert("Journey saved!");
            setTitle("");
            setTripDescription("");
            setJourneyPlaces([]);
        } catch (error) {
            console.log(error);
            alert("Unable to save journey. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const searchNearby = async (query: string, type: Category, lat?: number, lon?: number) => {
        if (!query) return [];
        return await searchNearbyPlaces(query, type, lat, lon);
    };

    return (
        <section className="min-h-screen bg-[#f5efe6] px-4 py-8">
            <div className="mx-auto max-w-5xl space-y-8">

                {/* HEADER */}
                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#9a8267]">
                        Travel Journal
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-[#4a3a2a]">
                        Create a New Journey
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-[#7c6853]">
                        Capture memorable destinations, add your experiences,
                        recommend nearby stays and restaurants, and publish your
                        journey for fellow travelers.
                    </p>
                </div>

                {/* BASIC INFO */}
                <div className="rounded-4xl border border-[#e3d3c0] bg-[#fffaf1] p-6 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-[#4a3a2a]">
                            Journey Details
                        </h2>

                        <p className="mt-1 text-sm text-[#8a7660]">
                            Give your trip a memorable title and description.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Input
                            placeholder="A Perfect Weekend in Goa"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-6 rounded-xl transition border-[#d6c3a4] bg-amber-50 focus-visible:border-[#c8a979] focus-visible:ring-0"
                        />

                        <textarea
                            placeholder="Tell travelers about your journey, highlights, recommendations, and experiences..."
                            value={tripDescription}
                            onChange={(e) => setTripDescription(e.target.value)}
                            className="min-h-40 w-full resize-none rounded-2xl border border-[#d6c3a4] bg-amber-50 p-4 outline-none transition focus:border-[#c8a979]"
                        />
                    </div>
                </div>

                {/* ADD PLACES */}
                <div className="rounded-4xl border border-[#e3d3c0] bg-[#fffaf1] p-6 shadow-sm h-fit">
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-[#4a3a2a]">
                            Add Places
                        </h2>

                        <p className="mt-1 text-sm text-[#8a7660]">
                            Search destinations and add them to your journey.
                        </p>
                    </div>

                    <SearchPlaces
                        defaultLocation={searchedLocation}
                        onPlaceSelect={handlePlaceSelect}
                        place={place}
                        showMap={true}
                        showTabs={false}
                    />
                </div>

                {/* JOURNEY PLACES */}
                {journeyPlaces.length > 0 && (
                    <div className="space-y-5">
                        <div className="pl-4">
                            <h2 className="text-xl font-semibold text-[#4a3a2a]">
                                Journey Stops
                            </h2>

                            <p className="mt-1 text-sm text-[#8a7660]">
                                Add images, notes, hotels, and restaurant recommendations.
                            </p>
                        </div>

                        {journeyPlaces.map((place) => (
                            <JourneyPlaceCard
                                key={place.id}
                                place={place}
                                removePlace={removePlace}
                                updateDescription={updateDescription}
                                updateImages={updateImages}
                                addNearbyPlace={addNearbyPlace}
                                removeNearbyPlace={removeNearbyPlace}
                                searchNearby={searchNearby}
                            />
                        ))}
                    </div>
                )}

                {/* EMPTY STATE */}
                {journeyPlaces.length === 0 && (
                    <div className="rounded-4xl border border-dashed border-[#d6c3a4] bg-[#fffaf1] p-10 text-center">
                        <h3 className="text-lg font-semibold text-[#5d4a3f]">
                            No places added yet
                        </h3>

                        <p className="mt-2 text-sm text-[#8a7660]">
                            Search for a destination above to start building your journey.
                        </p>
                    </div>
                )}

                {/* PUBLISH */}
                <div>
                    <div className="rounded-4xl border border-[#d6c3a4] bg-[#fffaf1]/95 p-4 shadow-xl backdrop-blur">
                        <button
                            onClick={handlePublish}
                            disabled={isSaving}
                            className="w-full rounded-2xl bg-[#4a3a2a] py-4 text-base font-semibold cursor-pointer text-[#fffaf1] transition-all hover:bg-[#503d32] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? "Saving..." : "Publish Journey"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UploadTripPlan;