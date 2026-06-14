declare interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  followers?: string[];
  following?: string[];
}

declare interface SidebarProps {
  user: User;
}

declare interface CardItem {
  _id: string;
  title: string;
  tripDescription: string;
  coverImage: string;
}

declare type CardsProps = CardItem[];

declare interface TravelCardProps {
  id: string;
  title: string;
  description: string;
  imgURL: string;
}

declare type Tab = "places" | "lists" | "profile";

declare type SearchedPlace = {
  id: number;
  name: string;
  lat: string | number;
  lon: string | number;
};

declare interface MapPreviewProps {
  position?: [number, number];
  height?: string;
}

declare type Category = "hotel" | "cafe_restaurant";

declare interface SearchPlacesProps {
  defaultLocation?: [number, number];
  onPlaceSelect?: (place: SearchedPlace) => void;
  place?: string;
  showMap?: boolean;
  showTabs?: boolean;
  height?: string;
}

declare type NearbyPlace = {
  id: number;
  name: string;
  lat: number;
  lon: number;
};

declare type JourneyPlace = SearchedPlace & {
  images: string[];
  description: string;
  hotels: NearbyPlace[];
  cafesAndRestaurants: NearbyPlace[];
};

declare type JourneyPlaceCardProps = {
  place: JourneyPlace;
  removePlace: (id: number) => void;
  updateDescription: (id: number, value: string) => void;
  updateImages: (id: number, images: string[]) => void;
  addNearbyPlace: (
    journeyPlaceId: number,
    type: "hotels" | "cafesAndRestaurants",
    place: NearbyPlace
  ) => void;
  removeNearbyPlace: (
    journeyPlaceId: number,
    type: "hotels" | "cafesAndRestaurants",
    placeId: number
  ) => void;
  searchNearby: (query: string, type: Category, lat?: number, lon?: number) => Promise<NearbyPlace[]>;
};

declare type NearbySearchSectionProps = {
  icon: React.ReactNode;
  title: string;
  query: string;
  setQuery: (value: string) => void;
  results: NearbyPlace[];
  setResults: (value: NearbyPlace[]) => void;
  selected: NearbyPlace[];
  onSearch: (query: string, type: Category, lat?: number, lon?: number) => Promise<NearbyPlace[]>;
  onAdd: (place: NearbyPlace) => void;
  onRemove: (id: number) => void;
  type: Category;
  lat?: number;
  lon?: number;
};

declare interface ChatMessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
}

declare interface ActivityItem {
  time: string;
  title: string;
  location: string;
}

declare interface ItineraryPlace {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  coords: [number, number];
}

declare interface NearbyPlacesGroup {
  cafes: ItineraryPlace[];
  restaurants: ItineraryPlace[];
  hotels: ItineraryPlace[];
}

declare interface TravelItinerary {
  title: string;
  location: string;
  duration: string;
  budget: string;
  overview: string;
  days: {
    day: string;
    summary: string;
    activities: ActivityItem[];
    travelTips: string;
  }[];
  recommendedPlaces: ItineraryPlace[];
  nearby: NearbyPlacesGroup;
}

declare type TravelPlanResult = TravelItinerary | { error: string };

declare interface DayPlanCardProps {
  day: string
  summary: string
  activities: { time: string; title: string; location: string }[]
  travelTips: string
}

declare interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  loading: boolean
}

declare interface ChatMessageProps {
  role: "user" | "assistant"
  message: string
}

declare interface ItineraryCardProps {
  itinerary: TravelItinerary
  selectedPlaceId?: string
  onSelectPlace: (id: string) => void
}

declare interface NearbyPlacesSectionProps {
  title: string
  items: ItineraryPlace[]
  selectedId?: string
  onSelect: (id: string) => void
}

declare interface PlaceCardProps {
  place: ItineraryPlace
  selected?: boolean
  onSelect: (id: string) => void
}

declare interface JourneyList {
  _id?: string;
  userId?: string | null;
  userEmail?: string | null;
  title: string;
  tripDescription: string;
  places: JourneyPlace[];
  createdAt: Date;
  updatedAt: Date;
}

declare interface Profile {
  _id: string;
  name: string;
  image: string;
  followersCount?: number;
  followingCount?: number;
  followers?: string[];
  following?: string[];
}

declare interface ListSearchResult {
  id: string;
  title: string;
  description: string;
  userEmail?: string | null;
  placeCount: number;
  placesPreview: string[];
  createdAt: string;
}

declare type JourneyListPayload = {
  title: string;
  tripDescription: string;
  coverImage: string;
  places: JourneyPlace[];
};

declare type FollowConnectionsProps = {
  profileId: string;
  currentUserId: string;
  followers: string[];
  following: string[];
  isFollowing: boolean;
}

declare type ModalType = "followers" | "following" | null;