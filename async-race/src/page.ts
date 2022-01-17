import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { Pagination } from "./pagination";
import { Winners } from "./winners";
import { Garage } from "./garage";
import { RaceSettingsTypes } from "./types";

export class Page {
  structure: Structure;
  controlPanel: ControlPanel;
  body: HTMLBodyElement;
  header: HTMLElement;
  main: HTMLElement;
  pagination: Pagination;
  activePage: string;
  winners: Winners;
  garage: Garage;
  raceSettings: RaceSettingsTypes;

  constructor() {
    this.body = document.querySelector("body");
    this.structure = new Structure();
    this.controlPanel = new ControlPanel();
    this.winners = new Winners();
    this.garage = new Garage();
    this.pagination = new Pagination();
  }

  updatePage() {
    window.localStorage.getItem("raceSettings")
      ? (this.raceSettings = JSON.parse(window.localStorage.getItem("raceSettings")))
      : window.localStorage.setItem("raceSettings", JSON.stringify(raceSettings));

    this.activePage = this.raceSettings.activePage;
    this.body.innerHTML = this.structure.printStructure();
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");

    if (this.activePage === "garage") {
      this.garage.printGarage(this.main, this.header);
      this.header.innerHTML += this.controlPanel.printControlPanel();
    } else {
      this.winners.printWinners(this.main, this.header);
    }
    this.main.innerHTML += this.pagination.printPagination();
    (document.querySelector(`input.to-${this.activePage}`) as HTMLInputElement).setAttribute("checked", "checked");
  }
}

const raceSettings: RaceSettingsTypes = {
  activePage: "garage",
  activeGaragePage: "1",
  activeWinnersPage: "1",
  order: "ASC",
  sort: "id",
};

export function updateRaceSettings(prop: string, value: string) {
  const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));
  raceSettings[prop] = value;
  window.localStorage.setItem("raceSettings", JSON.stringify(raceSettings));
  return value;
}
