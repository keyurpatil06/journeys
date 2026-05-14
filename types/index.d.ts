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
