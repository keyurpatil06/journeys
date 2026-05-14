"use client";

import { useEffect, useState, useTransition } from "react";

import MapPreview from "@/components/MapPreview";
import { Input } from "@/components/ui/input";

import { searchNearbyPlaces, searchPlaces } from "@/lib/actions/search";

import {
    Search,
    X,
    Trash2,
    Plus,
    Coffee,
    Hotel,
    Utensils,
} from "lucide-react";

const DEFAULT_LOCATION: [number, number] = [19.0760, 72.8777];

type NearbyPlace = {
    id: number;
    name: string;
    lat: number;
    lon: number;
};

type JourneyPlace = SearchedPlace & {
    images: string[];
    description: string;

    hotels: NearbyPlace[];
    cafes: NearbyPlace[];
    restaurants: NearbyPlace[];
};

const UploadTripPlan = () => {
    // =====================================================
    // BASIC INFO
    // =====================================================

    const [title, setTitle] = useState("");
    const [tripDescription, setTripDescription] =
        useState("");

    // =====================================================
    // SEARCH
    // =====================================================

    const [query, setQuery] = useState("");
    const [places, setPlaces] = useState<
        SearchedPlace[]
    >([]);

    const [selectedPlace, setSelectedPlace] =
        useState<SearchedPlace | null>(null);

    // =====================================================
    // MAP
    // =====================================================

    const [selectedPosition, setSelectedPosition] =
        useState<[number, number]>(DEFAULT_LOCATION);

    // =====================================================
    // JOURNEY PLACES
    // =====================================================

    const [journeyPlaces, setJourneyPlaces] =
        useState<JourneyPlace[]>([]);

    // =====================================================
    // LOADING
    // =====================================================

    const [isPending, startTransition] =
        useTransition();

    // =====================================================
    // USER LOCATION
    // =====================================================

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setSelectedPosition([
                    pos.coords.latitude,
                    pos.coords.longitude,
                ]);
            },
            (err) => {
                console.log(err);
            }
        );
    }, []);

    // =====================================================
    // SEARCH PLACES
    // =====================================================

    useEffect(() => {
        const delay = setTimeout(() => {
            if (!query) {
                setPlaces([]);
                return;
            }

            startTransition(async () => {
                const results = await searchPlaces(
                    query
                );

                setPlaces(results);
            });
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);

    // =====================================================
    // SELECT PLACE
    // =====================================================

    const handleSelectPlace = (
        place: SearchedPlace
    ) => {
        setSelectedPlace(place);

        setSelectedPosition([
            Number(place.lat),
            Number(place.lon),
        ]);

        setPlaces([]);
    };

    // =====================================================
    // ADD TO JOURNEY
    // =====================================================

    const handleAddPlace = () => {
        if (!selectedPlace) return;

        const alreadyExists = journeyPlaces.find(
            (p) => p.id === selectedPlace.id
        );

        if (alreadyExists) return;

        setJourneyPlaces((prev) => [
            ...prev,
            {
                ...selectedPlace,
                images: [],
                description: "",

                hotels: [],
                cafes: [],
                restaurants: [],
            },
        ]);

        setSelectedPlace(null);
        setQuery("");
    };

    // =====================================================
    // REMOVE PLACE
    // =====================================================

    const removePlace = (id: number) => {
        setJourneyPlaces((prev) =>
            prev.filter((place) => place.id !== id)
        );
    };

    // =====================================================
    // UPDATE DESCRIPTION
    // =====================================================

    const updateDescription = (
        id: number,
        value: string
    ) => {
        setJourneyPlaces((prev) =>
            prev.map((place) =>
                place.id === id
                    ? {
                        ...place,
                        description: value,
                    }
                    : place
            )
        );
    };

    // =====================================================
    // MOCK SEARCH NEARBY
    // =====================================================

    const handleSearch = async (
        query: string,
        type: "hotel" | "cafe" | "restaurant"
    ) => {
        if (!query) return [];

        // ✅ REAL API CALL
        return await searchNearbyPlaces(
            Number(place.lat),
            Number(place.lon),
            type
        );
    };

    // =====================================================
    // ADD NEARBY PLACE
    // =====================================================

    const addNearbyPlace = (
        journeyPlaceId: number,
        type: "hotels" | "cafes" | "restaurants",
        place: NearbyPlace
    ) => {
        setJourneyPlaces((prev) =>
            prev.map((journeyPlace) => {
                if (
                    journeyPlace.id !==
                    journeyPlaceId
                ) {
                    return journeyPlace;
                }

                const alreadyExists =
                    journeyPlace[type].find(
                        (p) => p.id === place.id
                    );

                if (alreadyExists) {
                    return journeyPlace;
                }

                return {
                    ...journeyPlace,
                    [type]: [
                        ...journeyPlace[type],
                        place,
                    ],
                };
            })
        );
    };

    // =====================================================
    // REMOVE NEARBY PLACE
    // =====================================================

    const removeNearbyPlace = (
        journeyPlaceId: number,
        type: "hotels" | "cafes" | "restaurants",
        placeId: number
    ) => {
        setJourneyPlaces((prev) =>
            prev.map((journeyPlace) => {
                if (
                    journeyPlace.id !==
                    journeyPlaceId
                ) {
                    return journeyPlace;
                }

                return {
                    ...journeyPlace,
                    [type]: journeyPlace[
                        type
                    ].filter(
                        (place) =>
                            place.id !== placeId
                    ),
                };
            })
        );
    };

    // =====================================================
    // MOCK SUBMIT
    // =====================================================

    const handlePublish = async () => {
        const payload = {
            title,
            tripDescription,
            places: journeyPlaces,
        };

        console.log(payload);

        alert("Journey saved locally");
    };

    return (
        <section className="p-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ================================================= */}
                {/* LEFT */}
                {/* ================================================= */}

                <div className="space-y-6">
                    {/* BASIC INFO */}

                    <div className="bg-white border rounded-2xl p-4 space-y-4">
                        <h1 className="text-2xl font-bold">
                            Create Journey
                        </h1>

                        <Input
                            placeholder="Trip title"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                        />

                        <textarea
                            placeholder="Write about your trip..."
                            value={tripDescription}
                            onChange={(e) =>
                                setTripDescription(
                                    e.target.value
                                )
                            }
                            className="w-full min-h-32 border rounded-xl p-3 resize-none outline-none"
                        />
                    </div>

                    {/* SEARCH */}

                    <div className="bg-white border rounded-2xl p-4">
                        <h2 className="font-semibold text-lg mb-4">
                            Add Places
                        </h2>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                            {query && (
                                <button
                                    onClick={() => {
                                        setQuery("");
                                        setPlaces(
                                            []
                                        );
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </button>
                            )}

                            <Input
                                placeholder="Search places..."
                                value={query}
                                onChange={(e) =>
                                    setQuery(
                                        e.target
                                            .value
                                    )
                                }
                                className="pl-9 pr-9"
                            />
                        </div>

                        {/* RESULTS */}

                        <div className="space-y-2 mt-4 max-h-64 overflow-y-auto">
                            {places.map((place) => (
                                <div
                                    key={place.id}
                                    onClick={() =>
                                        handleSelectPlace(
                                            place
                                        )
                                    }
                                    className="border rounded-xl p-3 cursor-pointer hover:bg-gray-50"
                                >
                                    {place.name}
                                </div>
                            ))}
                        </div>

                        {/* SELECTED PLACE */}

                        {selectedPlace && (
                            <div className="mt-4 border rounded-xl p-4">
                                <p className="font-semibold">
                                    {
                                        selectedPlace.name
                                    }
                                </p>

                                <button
                                    onClick={
                                        handleAddPlace
                                    }
                                    className="mt-4 flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-xl"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add To Journey
                                </button>
                            </div>
                        )}
                    </div>

                    {/* JOURNEY PLACES */}

                    <div className="space-y-4">
                        {journeyPlaces.map(
                            (place) => (
                                <JourneyPlaceCard
                                    key={place.id}
                                    place={place}
                                    removePlace={
                                        removePlace
                                    }
                                    updateDescription={
                                        updateDescription
                                    }
                                    addNearbyPlace={
                                        addNearbyPlace
                                    }
                                    removeNearbyPlace={
                                        removeNearbyPlace
                                    }
                                    searchNearbyPlaces={searchNearbyPlaces}
                                />
                            )
                        )}
                    </div>

                    {/* PUBLISH */}

                    <button
                        onClick={handlePublish}
                        className="w-full bg-black text-white py-3 rounded-2xl"
                    >
                        Publish Journey
                    </button>
                </div>

                {/* ================================================= */}
                {/* RIGHT MAP */}
                {/* ================================================= */}

                <div className="sticky top-4 h-fit">
                    <MapPreview
                        position={selectedPosition}
                    />
                </div>
            </div>
        </section>
    );
};

export default UploadTripPlan;

/* ===================================================== */
/* COMPONENT */
/* ===================================================== */

type JourneyPlaceCardProps = {
    place: JourneyPlace;

    removePlace: (id: number) => void;

    updateDescription: (
        id: number,
        value: string
    ) => void;

    addNearbyPlace: (
        journeyPlaceId: number,
        type:
            | "hotels"
            | "cafes"
            | "restaurants",
        place: NearbyPlace
    ) => void;

    removeNearbyPlace: (
        journeyPlaceId: number,
        type:
            | "hotels"
            | "cafes"
            | "restaurants",
        placeId: number
    ) => void;

    searchNearbyPlaces: (
        lat: number,
        lon: number,
        type: "hotel" | "cafe" | "restaurant"
    ) => Promise<NearbyPlace[]>;
};

const JourneyPlaceCard = ({
    place,
    removePlace,
    updateDescription,
    addNearbyPlace,
    removeNearbyPlace,
    searchNearbyPlaces,
}: JourneyPlaceCardProps) => {
    const [hotelQuery, setHotelQuery] =
        useState("");

    const [cafeQuery, setCafeQuery] =
        useState("");

    const [restaurantQuery, setRestaurantQuery] =
        useState("");

    const [hotelResults, setHotelResults] =
        useState<NearbyPlace[]>([]);

    const [cafeResults, setCafeResults] =
        useState<NearbyPlace[]>([]);

    const [
        restaurantResults,
        setRestaurantResults,
    ] = useState<NearbyPlace[]>([]);

    // =====================================================
    // SEARCH HELPERS
    // =====================================================

    const handleSearch = async (
        query: string,
        type: "hotel" | "cafe" | "restaurant"
    ) => {
        if (!query) return [];

        return await searchNearbyPlaces(
            Number(place.lat),
            Number(place.lon),
            type
        );
    };

    return (
        <div className="bg-white border rounded-2xl p-4 space-y-4">
            {/* HEADER */}

            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="font-semibold text-lg">
                        {place.name}
                    </h3>
                </div>

                <button
                    onClick={() =>
                        removePlace(place.id)
                    }
                    className="text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            {/* IMAGE PLACEHOLDER */}

            <div className="border-2 border-dashed rounded-xl p-6 text-center text-sm text-gray-500">
                Image Upload Placeholder
            </div>

            {/* DESCRIPTION */}

            <textarea
                placeholder="Write your experience..."
                value={place.description}
                onChange={(e) =>
                    updateDescription(
                        place.id,
                        e.target.value
                    )
                }
                className="w-full min-h-28 border rounded-xl p-3 resize-none outline-none"
            />

            {/* HOTELS */}

            <NearbySearchSection
                icon={<Hotel className="h-4 w-4" />}
                title="Hotels"
                query={hotelQuery}
                setQuery={setHotelQuery}
                results={hotelResults}
                setResults={setHotelResults}
                selected={place.hotels}
                onSearch={(query) =>
                    handleSearch(query, "hotel")
                }
                onAdd={(item) =>
                    addNearbyPlace(
                        place.id,
                        "hotels",
                        item
                    )
                }
                onRemove={(id) =>
                    removeNearbyPlace(
                        place.id,
                        "hotels",
                        id
                    )
                }
            />

            {/* CAFES */}

            <NearbySearchSection
                icon={<Coffee className="h-4 w-4" />}
                title="Cafes"
                query={cafeQuery}
                setQuery={setCafeQuery}
                results={cafeResults}
                setResults={setCafeResults}
                selected={place.cafes}
                onSearch={(query) =>
                    handleSearch(query, "cafe")
                }
                onAdd={(item) =>
                    addNearbyPlace(
                        place.id,
                        "cafes",
                        item
                    )
                }
                onRemove={(id) =>
                    removeNearbyPlace(
                        place.id,
                        "cafes",
                        id
                    )
                }
            />

            {/* RESTAURANTS */}

            <NearbySearchSection
                icon={
                    <Utensils className="h-4 w-4" />
                }
                title="Restaurants"
                query={restaurantQuery}
                setQuery={setRestaurantQuery}
                results={restaurantResults}
                setResults={
                    setRestaurantResults
                }
                selected={place.restaurants}
                onSearch={(query) =>
                    handleSearch(
                        query,
                        "restaurant"
                    )
                }
                onAdd={(item) =>
                    addNearbyPlace(
                        place.id,
                        "restaurants",
                        item
                    )
                }
                onRemove={(id) =>
                    removeNearbyPlace(
                        place.id,
                        "restaurants",
                        id
                    )
                }
            />
        </div>
    );
};

/* ===================================================== */
/* NEARBY SEARCH SECTION */
/* ===================================================== */

type NearbySearchSectionProps = {
    icon: React.ReactNode;

    title: string;

    query: string;

    setQuery: (value: string) => void;

    results: NearbyPlace[];

    setResults: (
        value: NearbyPlace[]
    ) => void;

    selected: NearbyPlace[];

    onSearch: (
        query: string
    ) => Promise<NearbyPlace[]>;

    onAdd: (place: NearbyPlace) => void;

    onRemove: (id: number) => void;
};

const NearbySearchSection = ({
    icon,
    title,
    query,
    setQuery,
    results,
    setResults,
    selected,
    onSearch,
    onAdd,
    onRemove,
}: NearbySearchSectionProps) => {
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!query) {
                setResults([]);
                return;
            }

            const data = await onSearch(query);

            setResults(data);
        }, 300);

        return () => clearTimeout(delay);
    }, [query]);

    return (
        <div className="space-y-3">
            {/* TITLE */}

            <div className="flex items-center gap-2">
                {icon}

                <h4 className="font-medium">
                    {title}
                </h4>
            </div>

            {/* INPUT */}

            <Input
                placeholder={`Search ${title.toLowerCase()}...`}
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
            />

            {/* RESULTS */}

            <div className="space-y-2">
                {results.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border rounded-xl p-2"
                    >
                        <p className="text-sm">
                            {item.name}
                        </p>

                        <button
                            onClick={() =>
                                onAdd(item)
                            }
                            className="text-orange-500"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* SELECTED */}

            <div className="flex flex-wrap gap-2">
                {selected.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full text-sm"
                    >
                        <span>{item.name}</span>

                        <button
                            onClick={() =>
                                onRemove(item.id)
                            }
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};