export interface WinnerType {
  id?: number;
  wins?: number;
  time?: number;
}

export interface CarType {
  name?: string;
  color?: string;
  id?: number;
}

export interface EngineType {
  velocity: number;
  distance: number;
}

export interface RaceSettingsTypes {
  [key: string]: string | number;
  activePage: string;
  activeGaragePage: number;
  activeWinnersPage: number;
  order: string;
  sort: string;
  winnersLimit: number;
  garageLimit: number;
}

export interface CarsResponse {
  items: CarType[];
  count: string;
  pageNumber: number;
  pageLimit: number;
}

export interface WinnersResponse {
  items: WinnerType[];
  count: string;
  pageNumber: number;
  sort: string;
  order: string;
  pageLimit: number;
}
