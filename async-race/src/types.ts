export interface WinnerType {
  id: number;
  wins: number;
  time: number;
}

export interface CarType {
  name: string;
  color: string;
  id: number;
}

export interface EngineType {
  velocity: number;
  distance: number;
}
export interface RaceSettingsTypes {
  activePage: "garage";
  activeGaragePage: "1";
  activeWinnersPage: "1";
  order: "ASC";
  sort: "id";
}
