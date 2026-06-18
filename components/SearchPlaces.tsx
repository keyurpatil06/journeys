"use client";

import { Input } from "@/components/ui/input";
import { DEFAULT_LOCATION, SearchTabs } from "@/constants";
import { searchPlaces, searchLists, searchUsers } from "@/lib/actions/search.actions";
import { MapPin, Search, User, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import MapPreview from "@/components/MapPreview";
import ListSearchResultCard from "@/components/ListSearchResultCard";
import Link from "next/link";
import Image from "next/image";

const SearchPlaces = ({
    defaultLocation = DEFAULT_LOCATION,
    onPlaceSelect,
    place,
    showMap = true,
    showTabs = true,
    height = "auto",
}: SearchPlacesProps) => {
    const [query, setQuery] = useState(place ?? "");
    const [activeTab, setActiveTab] = useState<Tab>("places");
    const [places, setPlaces] = useState<SearchedPlace[]>([]);
    const [listResults, setListResults] = useState<ListSearchResult[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>(defaultLocation);
    const [selectedPlace, setSelectedPlace] = useState<SearchedPlace | null>(null);

    const [isPending, startTransition] = useTransition();

    const tabLabel = activeTab === "places" ? "places" : activeTab === "lists" ? "saved lists" : "travelers";
    const emptyStateMessage = !query ? `Start typing to search ${tabLabel}.` : `No ${tabLabel} found yet. Try another term.`;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setSelectedPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.log("Geolocation denied or failed", err);
            }
        );
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (!query) {
                setPlaces([]);
                setListResults([]);
                return;
            }

            startTransition(async () => {
                if (activeTab === "places") {
                    const results = await searchPlaces(query);
                    setPlaces(results);
                    setListResults([]);
                    setProfiles([])
                } else if (activeTab === "lists") {
                    const results = await searchLists(query);
                    setListResults(results);
                    setPlaces([]);
                    setProfiles([])
                } else if (activeTab === "profile") {
                    const results = await searchUsers(query);
                    setProfiles(results)
                    setPlaces([]);
                    setListResults([]);
                } else {
                    setPlaces([]);
                    setListResults([]);
                }
            });
        }, 400);

        return () => clearTimeout(delay);
    }, [query, activeTab]);

    const handleSelectPlace = (place: SearchedPlace) => {
        setSelectedPlace(place);

        setSelectedPosition([Number(place.lat), Number(place.lon)]);

        setPlaces([]);

        if (onPlaceSelect) {
            onPlaceSelect(place);
        }
    };

    const resetStates = () => {
        setQuery('')
        setListResults([]);
        setPlaces([]);
        setProfiles([])
    }

    return (
        <section className="p-4 max-w-6xl mx-auto">
            <div className={`grid ${showMap ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4`}>
                {/* LEFT SIDE */}
                <div>
                    {/* Search Input */}
                    <div className="relative w-full mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        {query && (
                            <button
                                onClick={() => resetStates()}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        <Input
                            type="text"
                            placeholder={
                                activeTab === "places"
                                    ? "Search places..."
                                    : activeTab === "lists"
                                        ? "Search saved lists..."
                                        : "Search travelers..."
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="px-9 py-4 w-full bg-white border-2 border-slate-400 rounded-lg"
                        />
                    </div>

                    {/* Tabs */}
                    {showTabs && (
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {SearchTabs.map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key as Tab)}
                                    className={`px-4 py-2 rounded-xl text-sm transition ${activeTab === key ? "bg-orange-300 font-semibold" : "bg-gray-200 text-gray-600 font-normal"}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Suggestions */}
                    {activeTab === "places" && (
                        <div className="mt-4 rounded-3xl border border-[#e3d3c0] bg-[#fcf7ef] p-2 shadow-sm">
                            <div className="max-h-100 overflow-y-auto no-scrollbar space-y-3">
                                {places.length > 0 ? (
                                    places.map((place) => (
                                        <button
                                            key={place.id}
                                            type="button"
                                            onClick={() => handleSelectPlace(place)}
                                            className="w-full rounded-2xl border border-[#e7ddca] bg-white p-4 text-left hover:border-[#d7b98d] hover:bg-[#fffaf1] hover:shadow-sm"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f7efe1] text-[#6b5845]">
                                                    <MapPin className="h-4 w-4" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-[#3f3227]">
                                                        {place.name}
                                                    </p>
                                                    <p className="mt-1 text-sm text-[#8a7660]">
                                                        Tap to preview on the map
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="rounded-2xl border border-dashed border-[#d5c4a7] bg-[#fffaf3] p-8 text-center text-[#816d59]">
                                        {isPending ? "Searching places..." : emptyStateMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "lists" && (
                        <div className="mt-4 rounded-3xl border border-[#e3d3c0] bg-[#fcf7ef] p-2 shadow-sm">
                            <div className="space-y-4">
                                {listResults.length > 0 ? (
                                    listResults.map((result) => (
                                        <ListSearchResultCard
                                            key={result.id}
                                            result={result}
                                            onClick={() => {
                                                setQuery(result.title);
                                                setActiveTab("lists");
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-[#d5c4a7] bg-[#fffaf3] p-8 text-center text-[#816d59]">
                                        {isPending ? "Searching saved journeys..." : emptyStateMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "profile" && (
                        <div className="mt-4 rounded-3xl border border-[#e3d3c0] bg-[#fcf7ef] p-2 shadow-sm">
                            <div className="space-y-3 max-h-100 overflow-y-auto pr-1">
                                {profiles.length > 0 ? (
                                    profiles.map((profile) => (
                                        <Link
                                            key={profile._id}
                                            href={`/profile/${profile._id}`}
                                            className="flex items-center gap-4 rounded-2xl border border-[#e7ddca] bg-white p-4 shadow-sm hover:border-[#d7b98d] hover:bg-[#fffaf1]"
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#f7efe1]">
                                                {profile.image ? (
                                                    <Image
                                                        src={profile.image}
                                                        alt={profile.name}
                                                        width={48}
                                                        height={48}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="h-5 w-5 text-[#6b5845]" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#3f3227]">{profile.name}</p>
                                                <p className="mt-1 text-sm text-[#8a7660]">View profile</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-[#d5c4a7] bg-[#fffaf3] p-8 text-center text-[#816d59]">
                                        {isPending ? "Searching travelers..." : emptyStateMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Selected Place */}
                    {activeTab === "places" && selectedPlace && showTabs && (
                        <div className="mt-4 p-4 bg-white rounded-xl border">
                            <h2 className="font-semibold text-lg">Selected Place</h2>

                            <p className="mt-2">{selectedPlace.name}</p>

                            <Link
                                href={{
                                    pathname: "/upload",
                                    query: {
                                        place: selectedPlace.name,
                                        lat: selectedPlace.lat,
                                        lon: selectedPlace.lon,
                                    },
                                }}
                                className="mt-4 inline-block rounded-xl bg-orange-400 px-4 py-2 text-white transition hover:bg-orange-500"
                            >
                                Add To List
                            </Link>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE - MAP */}
                {showMap && <MapPreview position={selectedPosition} />}
            </div>
        </section>
    );
};

export default SearchPlaces;
