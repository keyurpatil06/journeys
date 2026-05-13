"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

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
    type,
    lat,
    lon,
}: NearbySearchSectionProps) => {
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!query) {
                setResults([]);
                return;
            }

            const data = await onSearch(query, type, lat, lon);
            setResults(data);
        }, 300);

        return () => clearTimeout(delay);
    }, [query, type, lat, lon, onSearch, setResults]);

    const clearSearch = () => {
        setQuery("");
        setResults([]);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                {icon}
                <h4 className="font-medium">{title}</h4>
            </div>

            <div className="relative">
                <Input
                    placeholder={`Search ${title.toLowerCase()}...`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pr-10"
                />

                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            <div className="space-y-2">
                {results.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onAdd(item)}
                        className="cursor-pointer border rounded-xl p-3 hover:bg-gray-50 transition"
                    >
                        <p className="text-sm">{item.name}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                {selected.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full text-sm"
                    >
                        <span>{item.name}</span>
                        <button onClick={() => onRemove(item.id)}>
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NearbySearchSection;