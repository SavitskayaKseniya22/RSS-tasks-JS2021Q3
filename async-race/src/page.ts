import { Structure } from "./structure";
import { Winners } from "./winners";
import { Garage } from "./garage";
import { RaceSettingsTypes } from "./types";

export class Page {
  structure: Structure;
  body: HTMLBodyElement;
  winners: Winners;
  garage: Garage;
  raceSettings: RaceSettingsTypes;

  constructor() {
    this.winners = new Winners(this);
    this.garage = new Garage(this);
    this.structure = new Structure(this);
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

  async printPage(activePage: string) {
    window.location.hash = activePage;

    if (activePage === "#garage") {
      await this.garage.makeGarage();
      this.body.innerHTML = this.structure.printStructure(this.garage);
      document.querySelector(`.to-garage`).classList.add("disabled");
    } else {
      await this.winners.makeWinners();
      this.body.innerHTML = this.structure.printStructure(this.winners);
      (document.querySelector(`#by-${this.raceSettings.sort}`) as HTMLInputElement).setAttribute("checked", "checked");
      document.querySelector(`.to-winners`).classList.add("disabled");
    }
  }

  initListener() {
    window.addEventListener("unload", () => {
      this.updateRaceSettings("activePage", window.location.hash);
      this.updateLSSettings();
    });
  }
}
