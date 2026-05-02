"use server";

const { MAPS_URL } = process.env;

export const searchPlaces = async (query: string) => {
  if (!query) {
    return [];
  }

  // TODO: Edit limit
  const url = `${MAPS_URL}&q=${encodeURIComponent(query)}&limit=5`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Journeys/1.0 (oane320@gmail.com)",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch places");
  }

  const data = await res.json();

  return data.map((place: any) => ({
    id: place.place_id,
    name: place.display_name,
    lat: place.lat,
    lon: place.lon,
  }));
};
