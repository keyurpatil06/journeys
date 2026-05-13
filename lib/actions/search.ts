"use server";

const {
    GEOAPIFY_API_KEY,
    GEOAPIFY_BASE_URL
} = process.env;

// TODO: Check response of APIs to see what all it returns

export const searchPlaces = async (query: string) => {
    try {
        const res = await fetch(`${GEOAPIFY_BASE_URL}/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`);

        if (!res.ok) {
            throw new Error("Failed to search places");
        }

        const data = await res.json();

        return (
            data.features?.map(
                (place: any) => ({
                    id: place.properties.place_id,
                    name: place.properties.formatted,
                    lat: place.properties.lat,
                    lon: place.properties.lon,
                })
            ) || []
        );
    } catch (error) {
        console.log("Error fetching places: ", error);
        return [];
    }
};

export const searchNearbyPlaces = async (
    query: string,
    type: Category,
    lat?: number,
    lon?: number,
) => {
    try {
        const categoryMap: Record<string, string> = {
            hotel: "accommodation.hotel",
            cafe_restaurant: "catering.cafe,catering.restaurant",
        };

        const category = categoryMap[type];
        let url: string;

        // TODO: Go through urls once - edit
        if (lat !== undefined && lon !== undefined) {
            url = `${GEOAPIFY_BASE_URL}/v2/places?categories=${category}&filter=circle:${lon},${lat},20000&bias=proximity:${lon},${lat}&name=${encodeURIComponent(query)}limit=20&apiKey=${GEOAPIFY_API_KEY}`;
        } else {
            url = `${GEOAPIFY_BASE_URL}/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&filter=category:${category}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to search nearby places");
        }

        const data = await res.json();

        return (
            data.features?.map(
                (place: any) => ({
                    id: place.properties.place_id ?? place.properties.osm_id,
                    name: place.properties.name ?? place.properties.formatted,
                    lat: place.properties.lat,
                    lon: place.properties.lon,
                })
            ) || []
        );
    } catch (error) {
        console.log("Error fetching nearby places: ", error);
        return [];
    }
};