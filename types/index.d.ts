declare interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
}

declare interface SidebarProps {
  user: User;
}

declare interface CardItem {
  id: string;
  title: string;
  description: string;
  imgURL: string;
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
  lat: string;
  lon: string;
};

declare interface MapPreviewProps {
  position?: [number, number];
  height?: string;
}

declare type Category = "hotel" | "cafe_restaurant";

declare interface SearchPlacesProps {
  defaultLocation?: [number, number];
  onPlaceSelect?: (place: SearchedPlace) => void;
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