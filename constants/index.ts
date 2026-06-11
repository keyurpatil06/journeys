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

export const DEFAULT_LOCATION: [number, number] = [19.0760, 72.8777];

export const listCardsData = [
  {
    id: "1",
    title: "Bandra Day Out",
    description: "A sunny beach walk, art cafes, and a sunset dinner by the promenade.",
    imgURL: "https://picsum.photos/seed/random/800/600",
  },
  {
    id: "2",
    title: "City Heritage Walk",
    description: "Discover hidden colonial lanes, spice markets, and vintage bookstores.",
    imgURL: "https://picsum.photos/seed/heritage/800/600",
  },
  {
    id: "3",
    title: "Hill Station Escape",
    description: "A cozy mountain list of scenic viewpoints, cafes, and trails.",
    imgURL: "https://picsum.photos/seed/hills/800/600",
  },
  {
    id: "4",
    title: "Foodie Weekend",
    description: "Taste the best street eats, rooftop dinners, and late-night desserts.",
    imgURL: "https://picsum.photos/seed/foodie/800/600",
  },
  {
    id: "5",
    title: "Museum & Culture Trail",
    description: "A curated list of galleries, museums, and cultural hotspots.",
    imgURL: "https://picsum.photos/seed/culture/800/600",
  },
  {
    id: "6",
    title: "Sunrise Trek",
    description: "Early morning hikes, coffee stops, and breathtaking summit views.",
    imgURL: "https://picsum.photos/seed/trek/800/600",
  },
  {
    id: "7",
    title: "Coastal Cafe Crawl",
    description: "Sip your way through seaside cafes, bakeries, and chill hangouts.",
    imgURL: "https://picsum.photos/seed/cafe/800/600",
  },
  {
    id: "8",
    title: "Island Adventure",
    description: "A compact list of water sports, local eats and sunset viewpoints.",
    imgURL: "https://picsum.photos/seed/island/800/600",
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