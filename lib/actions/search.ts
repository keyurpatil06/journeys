"use server";

const { MAPS_URL } = process.env;

export const searchPlaces = async (query: string) => {
  if (!query) {
    return [];
  }

  // TODO: Edit limit
  // const url = `${MAPS_URL}&q=${encodeURIComponent(query)}&limit=5`;
  const url = `${MAPS_URL}&q=${encodeURIComponent(query)}`;
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

export const searchNearbyPlaces = async (
  lat: number,
  lon: number,
  type: "restaurant" | "cafe" | "hotel",
) => {
  const tag =
    type === "hotel" ? '["tourism"="hotel"]' : `["amenity"="${type}"]`;

  const query = `
    [out:json][timeout:25];

    (
      node${tag}(around:3000,${lat},${lon});
      way${tag}(around:3000,${lat},${lon});
      relation${tag}(around:3000,${lat},${lon});
    );

    out center;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",

    body: "data=" + encodeURIComponent(query),

    cache: "no-store",
  });

  const data = await res.json();

  return data.elements
    .filter((place: any) => place.tags?.name)
    .map((place: any) => ({
      id: place.id,
      name: place.tags.name,

      lat: place.lat ?? place.center?.lat,

      lon: place.lon ?? place.center?.lon,
    }));
};
