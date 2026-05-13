"use client";

import { useState } from "react";
import { Trash2, Hotel, Coffee, X } from "lucide-react";
import NearbySearchSection from "./NearbySearchSection";

const JourneyPlaceCard = ({
    place,
    removePlace,
    updateDescription,
    updateImages,
    addNearbyPlace,
    removeNearbyPlace,
    searchNearby,
}: JourneyPlaceCardProps) => {
    const [hotelQuery, setHotelQuery] = useState("");
    const [cafeRestaurantQuery, setCafeRestaurantQuery] = useState("");
    const [hotelResults, setHotelResults] = useState<NearbyPlace[]>([]);
    const [cafeRestaurantResults, setCafeRestaurantResults] = useState<NearbyPlace[]>([]);

    const handleImageSelect = (files: FileList | null) => {
        if (!files) return;

        const selectedFiles = Array.from(files);
        const totalCount = place.images.length + selectedFiles.length;
        if (totalCount > 5) {
            alert("Maximum 5 images allowed.");
            return;
        }

        const newPreviews: string[] = [];

        for (const file of selectedFiles) {
            if (file.size > 2 * 1024 * 1024) {
                alert(`${file.name} is larger than 2MB and was skipped.`);
                continue;
            }
            newPreviews.push(URL.createObjectURL(file));
        }

        if (newPreviews.length > 0) {
            updateImages(place.id, [...place.images, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const updated = place.images.filter((_, i) => i !== index);
        updateImages(place.id, updated);
    };

    return (
        <div className="bg-white border rounded-2xl p-4 space-y-4">
            <div className="flex justify-between items-start gap-4">
                <h3 className="font-semibold text-lg">{place.name}</h3>
                <button
                    onClick={() => removePlace(place.id)}
                    className="text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col gap-3 border-2 border-dashed rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Upload images</p>
                            <p className="text-sm text-gray-500">Up to 5 images, max 2MB each.</p>
                        </div>
                        <label className="cursor-pointer rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200 transition">
                            Select files
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => handleImageSelect(e.target.files)}
                            />
                        </label>
                    </div>

                    {place.images.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                            {place.images.map((src, index) => (
                                <div key={index} className="relative overflow-hidden rounded-xl border">
                                    <img src={src} alt={`Upload ${index + 1}`} className="h-24 w-full object-cover" />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-gray-700 shadow-sm hover:bg-white"
                                        type="button"
                                        aria-label="Remove image"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">No images uploaded yet.</div>
                    )}
                </div>
            </div>

            <textarea
                placeholder="Write your experience..."
                value={place.description}
                onChange={(e) => updateDescription(place.id, e.target.value)}
                className="w-full min-h-28 border rounded-xl p-3 resize-none outline-none"
            />

            <NearbySearchSection
                icon={<Hotel className="h-4 w-4" />}
                title="Hotels"
                query={hotelQuery}
                setQuery={setHotelQuery}
                results={hotelResults}
                setResults={setHotelResults}
                selected={place.hotels}
                onSearch={searchNearby}
                onAdd={(item) => addNearbyPlace(place.id, "hotels", item)}
                onRemove={(id) => removeNearbyPlace(place.id, "hotels", id)}
                type="hotel"
                lat={Number(place.lat)}
                lon={Number(place.lon)}
            />

            <NearbySearchSection
                icon={<Coffee className="h-4 w-4" />}
                title="Cafes & Restaurants"
                query={cafeRestaurantQuery}
                setQuery={setCafeRestaurantQuery}
                results={cafeRestaurantResults}
                setResults={setCafeRestaurantResults}
                selected={place.cafesAndRestaurants}
                onSearch={searchNearby}
                onAdd={(item) => addNearbyPlace(place.id, "cafesAndRestaurants", item)}
                onRemove={(id) => removeNearbyPlace(place.id, "cafesAndRestaurants", id)}
                type="cafe_restaurant"
                lat={Number(place.lat)}
                lon={Number(place.lon)}
            />
        </div>
    );
};

export default JourneyPlaceCard;
