import { Garage } from "./garage";
import { Winners } from "./winners";
import { RaceSettingsTypes } from "./types";
import { updateRaceSettings } from "./utils";

export class Pagination {
  garage: Garage;
  winners: Winners;

  constructor(garage: Garage, winners: Winners) {
    this.garage = garage;
    this.winners = winners;
    this.initListener();
  }

  initListener() {
    document.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest(".pagination")) {
        const target = e.target as HTMLElement;
        if (target.className === "prev-page") {
          this.updateContainer("decrease");
        } else if (target.className === "next-page") {
          this.updateContainer("increase");
        }
      }
    });
  }

  printPagination() {
    return `<ul class="buttons-container pagination">
    <li><button class="prev-page">Prev</button></li>
    <li><button class="next-page">Next</button></li> 
  </ul>`;
  }

  updateCount(operation: string, prop: string, pageNumber: number) {
    if (operation === "decrease") {
      return updateRaceSettings(prop, String(pageNumber - 1));
    } else {
      return updateRaceSettings(prop, String(pageNumber + 1));
    }
  }

  updateGarage(operation: string, raceSettings: RaceSettingsTypes) {
    const pageNumber = +raceSettings.activeGaragePage;
    if ((pageNumber > 1 && operation === "decrease") || operation === "increase") {
      this.updateCount(operation, "activeGaragePage", pageNumber);
      this.garage.updateGarage();
    }
  }

  updateWinners(operation: string, raceSettings: RaceSettingsTypes) {
    const pageNumber = +raceSettings.activeWinnersPage;
    if ((pageNumber > 1 && operation === "decrease") || operation === "increase") {
      this.updateCount(operation, "activeWinnersPage", pageNumber);
      this.winners.updateWinners();
    }
  }

  updateContainer(operation: string) {
    const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings")) as RaceSettingsTypes;
    if (raceSettings.activePage === "garage") {
      this.updateGarage(operation, raceSettings);
    } else if (raceSettings.activePage === "winners") {
      this.updateWinners(operation, raceSettings);
    }
  }
}
