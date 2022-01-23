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
  winners: Winners;
  garage: Garage;
  raceSettings: RaceSettingsTypes;

  constructor() {
    this.structure = new Structure(this);
    this.winners = new Winners(this);
    this.garage = new Garage(this);
    this.pagination = new Pagination(this.garage, this.winners, this);
    this.body = document.querySelector("body");
    this.raceSettings = {
      activePage: "#garage",
      activeGaragePage: 1,
      activeWinnersPage: 1,
      order: "ASC",
      sort: "id",
      winnersLimit: 10,
      garageLimit: 7,
    };

    window.localStorage.getItem("raceSettings")
      ? (this.raceSettings = JSON.parse(window.localStorage.getItem("raceSettings")) as RaceSettingsTypes)
      : this.updateLSSettings();
    this.initListener();
  }

  updateRaceSettings(prop: string, value: string | number) {
    this.raceSettings[prop] = value;
  }

  updateLSSettings() {
    window.localStorage.setItem("raceSettings", JSON.stringify(this.raceSettings));
  }

  getRaceSettings() {
    return this.raceSettings;
  }

  printPage(activePage: string) {
    window.location.hash = activePage;
    this.body.innerHTML = this.structure.printStructure();
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");

    if (activePage === "#garage") {
      this.garage.printGarage(this.main, this.header);
    } else {
      this.winners.printWinners(this.main, this.header);
    }
    this.main.innerHTML += this.pagination.printPagination();
    document.querySelector(`.to-${activePage.split("").slice(1).join("")}`).classList.add("disabled");
  }

  initListener() {
    window.addEventListener("unload", () => {
      this.updateRaceSettings("activePage", window.location.hash);
      this.updateLSSettings();
    });
  }
}
