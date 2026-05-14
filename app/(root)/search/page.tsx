"use client";

import { Input } from "@/components/ui/input";
import { SearchTabs } from "@/constants";
import { searchPlaces } from "@/lib/actions/search";
import { Search, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import MapPreview from "@/components/MapPreview";

const DEFAULT_LOCATION: [number, number] = [19.0760, 72.8777];

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("places");
    const [places, setPlaces] = useState<SearchedPlace[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>(DEFAULT_LOCATION);
    const [selectedPlace, setSelectedPlace] = useState<SearchedPlace | null>(null);

    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setSelectedPosition([
                    pos.coords.latitude,
                    pos.coords.longitude,
                ]);
            },
            (err) => {
                console.log("Geolocation denied or failed", err);
            }
        );
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (!query || activeTab !== "places") {
                setPlaces([]);
                return;
            }

            startTransition(async () => {
                const results = await searchPlaces(query);
                setPlaces(results);
            });
        }, 400);

        return () => clearTimeout(delay);
    }, [query, activeTab]);

    const handleSelectPlace = (place: SearchedPlace) => {
        setSelectedPlace(place);

        setSelectedPosition([
            Number(place.lat),
            Number(place.lon),
        ]);

        setPlaces([]);
    };

    return (
        <section className="p-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* LEFT SIDE */}
                <div>
                    {/* Search Input */}
                    <div className="relative w-full mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        {query && (
                            <button
                                onClick={() => setQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        <Input
                            type="text"
                            placeholder="Search places, lists, profiles..."
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                            className="pl-9 pr-9 py-4 w-full bg-white border-2 border-slate-400"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {SearchTabs.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() =>
                                    setActiveTab(key as Tab)
                                }
                                className={`px-4 py-2 rounded-xl text-sm transition ${activeTab === key
                                    ? "bg-orange-300"
                                    : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {isPending && (
                        <p className="text-sm text-gray-500">
                            Loading...
                        </p>
                    )}

                    {/* Suggestions */}
                    {activeTab === "places" && (
                        <div className="space-y-2 max-h-100 overflow-y-auto">
                            {places.map((place) => (
                                <div
                                    key={place.id}
                                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 bg-white transition"
                                    onClick={() =>
                                        handleSelectPlace(place)
                                    }
                                >
                                    <p className="font-medium">
                                        {place.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Selected Place */}
                    {selectedPlace && (
                        <div className="mt-4 p-4 bg-white rounded-xl border">
                            <h2 className="font-semibold text-lg">
                                Selected Place
                            </h2>

                            <p className="mt-2">
                                {selectedPlace.name}
                            </p>

                            <button className="mt-4 bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-xl">
                                Add To List
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE - MAP */}
                <MapPreview position={selectedPosition} />
            </div>
        </section>
    );
};

export default SearchPage;