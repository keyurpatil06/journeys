export const sideBarLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/icons/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/icons/chat.svg",
    route: "/chat",
    label: "Chat",
  },
  {
    imgURL: "/icons/upload.svg",
    route: "/upload",
    label: "Upload",
  },
];

export const SearchTabs = [
  { key: "places", label: "Places" },
  { key: "lists", label: "Lists" },
  { key: "profile", label: "Users" },
];

export const travelCardsData = [
  {
    id: "1",
    title: "Sunset in Bali",
    description: "Experience the magical sunsets and serene beaches of Bali.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "2",
    title: "Paris Getaway",
    description: "Explore the romantic streets, cafes, and the Eiffel Tower.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "3",
    title: "Swiss Alps Adventure",
    description: "Snowy peaks, skiing, and breathtaking mountain views await.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "4",
    title: "Tokyo Nights",
    description: "Dive into the vibrant nightlife and futuristic city vibes.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "5",
    title: "Safari in Kenya",
    description: "Witness wildlife up close in the heart of Africa.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "6",
    title: "New York City",
    description: "The city that never sleeps—food, culture, and skyscrapers.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "7",
    title: "Santorini Escape",
    description: "White houses, blue domes, and stunning sea views.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
  {
    id: "8",
    title: "Dubai Luxury",
    description: "Experience futuristic architecture and desert adventures.",
    imgURL: "https://picsum.photos/seed/6/800/600",
  },
];

export const categoryImages: Record<string, string[]> = {
  Beach: [
    "assets/images/beach-1.jpg",
    "assets/images/beach-2.jpg",
    "assets/images/beach-3.jpg",
    "assets/images/beach-4.jpg"
  ],
  Cafe: [
    "assets/images/cafe-1.jpg",
    "assets/images/cafe-2.jpg",
    "assets/images/cafe-3.jpg",
    "assets/images/cafe-4.jpg"
  ],
  Restaurant: [
    "assets/images/restaurant-1.jpg",
    "assets/images/restaurant-2.jpg",
    "assets/images/restaurant-3.jpg",
    "assets/images/restaurant-4.jpg"
  ],
  Hotel: [
    "assets/images/hotel-1.jpg",
    "assets/images/hotel-2.jpg",
    "assets/images/hotel-3.jpg",
    "assets/images/hotel-4.jpg"
  ],
  Attraction: [
    "assets/images/attraction-1.jpg",
    "assets/images/attraction-2.jpg",
    "assets/images/attraction-3.jpg",
    "assets/images/attraction-4.jpg"
  ],
  Museum: [
    "assets/images/museum-1.jpg",
    "assets/images/museum-2.jpg",
    "assets/images/museum-3.jpg",
    "assets/images/museum-4.jpg"
  ],
  Park: [
    "assets/images/park-1.jpg",
    "assets/images/park-2.jpg",
    "assets/images/park-3.jpg",
    "assets/images/park-4.jpg"
  ],
  Bar: [
    "assets/images/bar-1.jpg",
    "assets/images/bar-2.jpg",
    "assets/images/bar-3.jpg",
    "assets/images/bar-4.jpg"
  ],
  Default: [
    "assets/images/travel-1.jpg",
    "assets/images/travel-2.jpg",
    "assets/images/travel-3.jpg"
  ],
};

export const TRAVEL_SYSTEM_PROMPT = `You are a highly specialized travel planning assistant. You may only answer questions that are directly about travel plans, itineraries, destinations, hotels, restaurants, cafes, activities, budgets, timings, or travel logistics. If the user asks anything outside travel planning, answer exactly with a JSON object containing only {"error":"I can only help with travel planning. Please ask about trip itineraries, destinations, cafes, hotels, budgets, or schedules."}.

Return only valid JSON with this exact structure:
{
  "title": string,
  "location": string,
  "duration": string,
  "budget": string,
  "overview": string,
  "days": [
    {
      "day": string,
      "summary": string,
      "activities": [
        { "time": string, "title": string, "location": string }
      ],
      "travelTips": string
    }
  ],
  "recommendedPlaces": [
    {
      "id": string,
      "name": string,
      "description": string,
      "category": "Beach" | "Cafe" | "Restaurant" | "Hotel" | "Attraction" | "Museum" | "Park" | "Bar",
      "image": string,
      "coords": [number, number]
    }
  ],
  "nearby": {
    "cafes": [],
    "restaurants": [],
    "hotels": []
  }
}

Category normalization rules:
- Beaches and waterfronts - Beach
- Coffee shops - Cafe
- Food establishments - Restaurant
- Accommodation - Hotel
- Monuments, landmarks, temples, churches, forts, viewpoints, markets and sightseeing spots - Attraction
- Art, history, science and cultural museums - Museum
- Gardens, national parks and public parks - Park
- Pubs, clubs, lounges and nightlife venues - Bar

Do not include markdown fences, extra commentary, or any response outside the JSON payload. If the user prompt is missing destination or budget details, make reasonable travel planning assumptions.`;