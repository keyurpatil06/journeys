"use server";

import { db } from "@/lib/auth";

const { GEOAPIFY_API_KEY, GEOAPIFY_BASE_URL } = process.env;

// TODO: Check response of APIs to see what all it returns

export const searchPlaces = async (query: string) => {
    try {
        const res = await fetch(
            `${GEOAPIFY_BASE_URL}/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`,
        );

        if (!res.ok) {
            throw new Error("Failed to search places");
        }

        const data = await res.json();

        return (
            data.features?.map((place: any) => ({
                id: place.properties.place_id,
                name: place.properties.formatted,
                lat: place.properties.lat,
                lon: place.properties.lon,
            })) || []
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
            url = `${GEOAPIFY_BASE_URL}/v2/places?categories=${category}&filter=circle:${lon},${lat},20000&bias=proximity:${lon},${lat}&name=${encodeURIComponent(query)}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;
        } else {
            url = `${GEOAPIFY_BASE_URL}/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&filter=category:${category}&limit=20&apiKey=${GEOAPIFY_API_KEY}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to search nearby places");
        }

        const data = await res.json();

        return (
            data.features?.map((place: any) => ({
                id: place.properties.place_id ?? place.properties.osm_id,
                name: place.properties.name ?? place.properties.formatted,
                lat: place.properties.lat,
                lon: place.properties.lon,
            })) || []
        );
    } catch (error) {
        console.log("Error fetching nearby places: ", error);
        return [];
    }
};

export const resolvePlaceCoordinates = async (name: string, location?: string): Promise<[number, number] | null> => {
    if (!name) {
        return null;
    }

    try {
        const query = location ? `${name}, ${location}` : name;
        const res = await fetch(
            `${GEOAPIFY_BASE_URL}/v1/geocode/search?text=${encodeURIComponent(query)}&limit=1&apiKey=${GEOAPIFY_API_KEY}`
        );

        if (!res.ok) {
            console.log("Failed to resolve place coordinates", { name, location });
            return null;
        }

        const data = await res.json();
        const feature = data.features?.[0];

        if (!feature) {
            return null;
        }

        const lat = feature.properties?.lat;
        const lon = feature.properties?.lon;
        const geometryCoords = feature.geometry?.coordinates;

        if (typeof lat === "number" && typeof lon === "number") {
            return [lat, lon] as [number, number];
        }

        if (Array.isArray(geometryCoords) && geometryCoords.length >= 2) {
            // GeoJSON geometry is [longitude, latitude]
            return [geometryCoords[1], geometryCoords[0]] as [number, number];
        }

        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const searchLists = async (query: string) => {
    if (!query) {
        return [];
    }

    try {
        const docs = await db.collection("lists").find(
            {
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { tripDescription: { $regex: query, $options: "i" } },
                    { "places.name": { $regex: query, $options: "i" } },
                ],
            },
            {
                projection: {
                    title: 1,
                    tripDescription: 1,
                    userEmail: 1,
                    places: 1,
                    createdAt: 1,
                },
            }
        ).limit(20).toArray();

        const result = docs.map((doc: any) => ({
            id: doc._id?.toString() ?? "",
            title: doc.title,
            description: doc.tripDescription,
            userEmail: doc.userEmail ?? null,
            placeCount: Array.isArray(doc.places) ? doc.places.length : 0,
            placesPreview: Array.isArray(doc.places)
                ? doc.places.slice(0, 4).map((place: any) => place.name)
                : [],
            createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
        }));

        return result;
    } catch (error) {
        console.log("Error searching lists: ", error);
        return [];
    }
};

export const searchUsers = async (query: string) => {
    if (!query) {
        return [];
    }

    try {
        const docs = await db.collection("user").find(
            {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } }
                ]
            },
            {
                projection: {
                    _id: 1,
                    name: 1,
                    image: 1
                }
            }
        ).limit(20).toArray();

        const result = docs.map((doc: any) => ({
            _id: doc._id.toString(),
            name: doc.name,
            image: doc.image,
        }));

        return result;
    } catch (error) {
        console.log("Error fetching user profiles");
        return [];
    }
}