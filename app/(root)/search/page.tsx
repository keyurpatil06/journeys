"use client";

import { Input } from "@/components/ui/input";
import { SearchTabs } from "@/constants";
import { searchPlaces } from "@/lib/actions/search";
import { Search, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("places");
    const [places, setPlaces] = useState<SearchedPlace[]>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (!query || activeTab !== "places") {
                setPlaces([])
                return
            };

            startTransition(async () => {
                const results = await searchPlaces(query);
                setPlaces(results);
            });
        }, 400);

        return () => clearTimeout(delay);
    }, [query, activeTab]);

    return (
        <section className="p-4 max-w-2xl mx-auto">
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
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 pr-9 py-4 w-full bg-white border-2 border-slate-400"
                />
            </div>

            <div className="flex gap-2 mb-4">
                {SearchTabs.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as Tab)}
                        className={`px-4 py-2 rounded-xl text-sm ${activeTab === key
                            ? "bg-orange-300"
                            : "bg-gray-200 text-gray-600"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {isPending && <p className="text-sm text-gray-500">Loading...</p>}

            {activeTab === "places" && (
                <div className="space-y-2">
                    {places.map((place) => (
                        // TODO: Make this a link
                        <div
                            key={place.id}
                            className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={() => {
                                window.location.href = `/map?lat=${place.lat}&lng=${place.lon}`;
                            }}
                        >
                            <p className="font-medium">{place.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SearchPage;