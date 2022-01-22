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
  [char: string]: string;
}

export interface CarsResponse {
  items: CarType[];
  count: string;
  pageNumber: number;
}

export interface WinnersResponse {
  items: WinnerType[];
  count: string;
  pageNumber: number;
  sort: string;
  order: string;
}
