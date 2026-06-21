export const sideBarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/icons/chat.svg",
    route: "/chat",
    label: "Chat",
  },
  {
    imgURL: "/assets/icons/upload.svg",
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
    "/assets/images/beach-1.jpg",
    "/assets/images/beach-2.jpg",
    "/assets/images/beach-3.jpg",
    "/assets/images/beach-4.jpg"
  ],
  Cafe: [
    "/assets/images/cafe-1.jpg",
    "/assets/images/cafe-2.jpg",
    "/assets/images/cafe-3.jpg",
    "/assets/images/cafe-4.jpg"
  ],
  Restaurant: [
    "/assets/images/restaurant-1.jpg",
    "/assets/images/restaurant-2.jpg",
    "/assets/images/restaurant-3.jpg",
    "/assets/images/restaurant-4.jpg"
  ],
  Hotel: [
    "/assets/images/hotel-1.jpg",
    "/assets/images/hotel-2.jpg",
    "/assets/images/hotel-3.jpg",
    "/assets/images/hotel-4.jpg"
  ],
  Attraction: [
    "/assets/images/attraction-1.jpg",
    "/assets/images/attraction-2.jpg",
    "/assets/images/attraction-3.jpg",
    "/assets/images/attraction-4.jpg"
  ],
  Museum: [
    "/assets/images/museum-1.jpg",
    "/assets/images/museum-2.jpg",
    "/assets/images/museum-3.jpg",
    "/assets/images/museum-4.jpg"
  ],
  Park: [
    "/assets/images/park-1.jpg",
    "/assets/images/park-2.jpg",
    "/assets/images/park-3.jpg",
    "/assets/images/park-4.jpg"
  ],
  Bar: [
    "/assets/images/bar-1.jpg",
    "/assets/images/bar-2.jpg",
    "/assets/images/bar-3.jpg",
    "/assets/images/bar-4.jpg"
  ],
  Default: [
    "/assets/images/travel-1.jpg",
    "/assets/images/travel-2.jpg",
    "/assets/images/travel-3.jpg"
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
      "coords": [number, number]
    }
  ],
  "nearby": {
    "cafes": [
      {
        "id": string,
        "name": string,
        "description": string,
        "category": string
      }
    ],
    "restaurants": [
      {
        "id": string,
        "name": string,
        "description": string,
        "category": string
      }
    ],
    "hotels": [
      {
        "id": string,
        "name": string,
        "description": string,
        "category": string
      }
    ]
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

export const SAMPLE_AI_RESPONSE = {
  "title": "A Day of Heritage and Flavors in Pune",
  "location": "Pune, Maharashtra, India",
  "duration": "1 Day",
  "budget": "Moderate (INR 2000-4000)",
  "overview": "Discover the historical grandeur, spiritual serenity, and vibrant culinary scene of Pune in a single, well-paced day. This itinerary focuses on iconic landmarks and local experiences, offering a glimpse into the city's rich past and lively present.",
  "days": [
    {
      "day": "Day 1: History, Spirituality & Local Bites",
      "summary": "Start your day with an iconic Pune breakfast, delve into historical forts and palaces, seek blessings at a famous temple, explore a unique museum, and conclude with a delightful dinner.",
      "activities": [
        {
          "time": "8:30 AM",
          "title": "Breakfast at Vohuman Cafe",
          "location": "Near Ruby Hall Clinic, Dhole Patil Road"
        },
        {
          "time": "9:30 AM",
          "title": "Explore Shaniwar Wada",
          "location": "Shaniwar Peth"
        },
        {
          "time": "11:30 AM",
          "title": "Visit Aga Khan Palace",
          "location": "Nagar Road, Kalyani Nagar"
        },
        {
          "time": "1:30 PM",
          "title": "Lunch at Vaishali",
          "location": "Fergusson College Road"
        },
        {
          "time": "3:00 PM",
          "title": "Seek Blessings at Dagadusheth Halwai Ganapati Temple",
          "location": "Ganpati Bhavan, Budhwar Peth"
        },
        {
          "time": "4:30 PM",
          "title": "Discover Raja Dinkar Kelkar Museum",
          "location": "Bajirao Road, Shukrawar Peth"
        },
        {
          "time": "7:00 PM",
          "title": "Dinner at Malaka Spice",
          "location": "Koregaon Park"
        }
      ],
      "travelTips": "Wear comfortable walking shoes as you'll be exploring historical sites. Stay hydrated throughout the day, especially if visiting during warmer months. Auto-rickshaws and ride-sharing apps are convenient for getting around Pune."
    }
  ],
  "recommendedPlaces": [
    {
      "id": "PUN001",
      "name": "Shaniwar Wada",
      "description": "A magnificent historical fort palace in Pune, built in 1732, it was the seat of the Peshwa rulers of the Maratha Empire. Known for its grand architecture and tragic history.",
      "category": "Attraction",
      "coords": [
        18.5195,
        73.8567
      ]
    },
    {
      "id": "PUN002",
      "name": "Aga Khan Palace",
      "description": "A historic monument of national importance, known for its architectural excellence and its close association with the Indian freedom movement, where Mahatma Gandhi was imprisoned.",
      "category": "Attraction",
      "coords": [
        18.5539,
        73.9038
      ]
    },
    {
      "id": "PUN003",
      "name": "Dagadusheth Halwai Ganapati Temple",
      "description": "One of the most famous Hindu temples in Maharashtra dedicated to Lord Ganesha. It's renowned for its grand idol and elaborate annual Ganesh festival celebrations.",
      "category": "Attraction",
      "coords": [
        18.523,
        73.8569
      ]
    },
    {
      "id": "PUN004",
      "name": "Raja Dinkar Kelkar Museum",
      "description": "A unique museum housing a collection of over 20,000 artifacts from Dr. Dinkar Kelkar's personal collection, showcasing ancient Indian artifacts, including musical instruments, pottery, and sculptures.",
      "category": "Museum",
      "coords": [
        18.5186,
        73.8517
      ]
    },
    {
      "id": "PUN005",
      "name": "Vohuman Cafe",
      "description": "An iconic Parsi cafe famous for its bun maska, Irani chai, and cheese omelets. A beloved local spot for breakfast.",
      "category": "Cafe",
      "coords": [
        18.5303,
        73.8741
      ]
    },
    {
      "id": "PUN006",
      "name": "Vaishali",
      "description": "A legendary South Indian restaurant on Fergusson College Road, famous for its dosas, uttappams, and filter coffee. A perpetually busy and cherished eatery.",
      "category": "Restaurant",
      "coords": [
        18.5152,
        73.8398
      ]
    },
    {
      "id": "PUN007",
      "name": "Malaka Spice",
      "description": "A popular restaurant in Koregaon Park known for its delicious Southeast Asian cuisine and vibrant ambiance. Great for a pleasant dinner experience.",
      "category": "Restaurant",
      "coords": [
        18.5529,
        73.8837
      ]
    }
  ],
  "nearby": {
    "cafes": [
      {
        "id": "PUNC001",
        "name": "Cafe Goodluck",
        "description": "Another iconic cafe in Pune, famous for its Bun Maska and Chicken Special.",
        "category": "Cafe"
      },
      {
        "id": "PUNC002",
        "name": "German Bakery",
        "description": "A renowned bakery and cafe, popular for its desserts, cakes, and relaxed atmosphere.",
        "category": "Cafe"
      }
    ],
    "restaurants": [
      {
        "id": "PUNR001",
        "name": "Shabree",
        "description": "Known for its authentic Maharashtrian Thali, offering a taste of local cuisine.",
        "category": "Restaurant"
      },
      {
        "id": "PUNR002",
        "name": "Durvankur Thali",
        "description": "Another excellent spot for traditional Maharashtrian vegetarian Thali.",
        "category": "Restaurant"
      }
    ],
    "hotels": [
      {
        "id": "PUNH001",
        "name": "JW Marriott Pune",
        "description": "A luxury 5-star hotel offering elegant rooms, fine dining, and excellent amenities.",
        "category": "Hotel"
      },
      {
        "id": "PUNH002",
        "name": "The O Hotel",
        "description": "A boutique luxury hotel known for its stylish design, comfortable rooms, and vibrant nightlife options.",
        "category": "Hotel"
      },
      {
        "id": "PUNH003",
        "name": "Hotel Shivam",
        "description": "A budget-friendly hotel offering comfortable accommodation and good service, close to major attractions.",
        "category": "Hotel"
      }
    ]
  }
}