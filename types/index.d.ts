declare interface User {
  id: string;
  name: string;
  email: string;
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
