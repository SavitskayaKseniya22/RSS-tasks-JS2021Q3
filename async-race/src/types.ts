export interface Winner {
  id?: number;
  wins?: number;
  time?: number;
}

export interface Car {
  name?: string;
  color?: string;
  id?: number;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface RaceSettingsTypes {
  activePage: string;
  activeGaragePage: number;
  activeWinnersPage: number;
  order: string;
  sort: string;
  winnersLimit: number;
  garageLimit: number;
  [key: string]: string | number;
}

export interface CarsPage {
  items: Car[];
  count: string;
  pageNumber: number;
  pageLimit: number;
}

export interface WinnersPage {
  items: Winner[];
  count: string;
  pageNumber: number;
  sort: string;
  order: string;
  pageLimit: number;
}
