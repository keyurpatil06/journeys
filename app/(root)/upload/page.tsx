"use client";

import { useState } from "react";
import SearchPlaces from "@/components/SearchPlaces";
import JourneyPlaceCard from "@/components/JourneyPlaceCard";
import { Input } from "@/components/ui/input";
import { searchNearbyPlaces } from "@/lib/actions/search.actions";
import { saveJourneyList } from "@/lib/actions/journey.actions";

const UploadTripPlan = () => {
    const [title, setTitle] = useState("");
    const [tripDescription, setTripDescription] = useState("");
    const [journeyPlaces, setJourneyPlaces] = useState<JourneyPlace[]>([]);
    const [isSaving, setIsSaving] = useState(false);

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
        <section className="p-4 max-w-full mx-auto">
            <div className="grid grid-cols-1 max-w-3/5 gap-6">
                <div className="space-y-6">
                    {/* BASIC INFO */}
                    <div className="bg-white border rounded-2xl p-4 space-y-4">
                        <h1 className="text-2xl font-bold">Create Journey</h1>
                        <Input
                            placeholder="Trip title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Write about your trip..."
                            value={tripDescription}
                            onChange={(e) => setTripDescription(e.target.value)}
                            className="w-full min-h-32 border rounded-xl p-3 resize-none outline-none"
                        />
                    </div>

                    {/* SEARCH PLACES */}
                    <div className="bg-white border rounded-2xl p-4">
                        <h2 className="font-semibold text-lg mb-4">Add Places</h2>
                        <SearchPlaces
                            onPlaceSelect={handlePlaceSelect}
                            showMap={true}
                            showTabs={false}
                        />
                    </div>

                    {/* JOURNEY PLACES */}
                    <div className="space-y-4">
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

                    {/* PUBLISH */}
                    <button
                        onClick={handlePublish}
                        disabled={isSaving}
                        className="w-full bg-black text-white py-3 rounded-2xl disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Publish Journey"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UploadTripPlan;