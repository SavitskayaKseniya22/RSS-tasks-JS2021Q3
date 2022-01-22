import { Structure } from "./structure";
import { Pagination } from "./pagination";
import { Winners } from "./winners";
import { Garage } from "./garage";
import { RaceSettingsTypes } from "./types";

export class Page {
  structure: Structure;
  body: HTMLBodyElement;
  header: HTMLElement;
  main: HTMLElement;
  pagination: Pagination;
  activePage: string;
  winners: Winners;
  garage: Garage;
  raceSettings: RaceSettingsTypes;

  constructor() {
    this.structure = new Structure();
    this.winners = new Winners();
    this.garage = new Garage();
    this.pagination = new Pagination(this.garage, this.winners);
    this.body = document.querySelector("body");
  }

  printPage() {
    this.raceSettings = window.localStorage.getItem("raceSettings")
      ? (JSON.parse(window.localStorage.getItem("raceSettings")) as RaceSettingsTypes)
      : raceSettings;

    window.localStorage.setItem("raceSettings", JSON.stringify(this.raceSettings));

    this.activePage = this.raceSettings.activePage;
    this.body.innerHTML = this.structure.printStructure();
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");

    this.activePage === "garage"
      ? this.garage.printGarage(this.main, this.header)
      : this.winners.printWinners(this.main, this.header);

    this.main.innerHTML += this.pagination.printPagination();
    (document.querySelector(`input.to-${this.activePage}`) as HTMLInputElement).setAttribute("checked", "checked");
  }
}

const raceSettings: RaceSettingsTypes = {
  activePage: "garage",
  activeGaragePage: 1,
  activeWinnersPage: 1,
  order: "ASC",
  sort: "id",
  winnersLimit: 10,
  garageLimit: 7,
};
