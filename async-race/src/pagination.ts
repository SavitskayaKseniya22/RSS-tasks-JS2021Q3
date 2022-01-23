import { Garage } from "./garage";
import { Winners } from "./winners";
import { RaceSettingsTypes } from "./types";
import { Page } from "./page";
import { apiService } from "./api";

export class Pagination {
  garage: Garage;
  winners: Winners;
  currentPage: Page;

  constructor(garage: Garage, winners: Winners, currentPage: Page) {
    this.garage = garage;
    this.winners = winners;
    this.currentPage = currentPage;
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
    return operation === "decrease"
      ? this.currentPage.updateRaceSettings(prop, pageNumber - 1)
      : this.currentPage.updateRaceSettings(prop, pageNumber + 1);
  }

  async updateGarage(operation: string, raceSettings: RaceSettingsTypes) {
    const cars = await apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit);
    const pageNumber = raceSettings.activeGaragePage;
    if ((pageNumber > 1 && operation === "decrease") || (operation === "increase" && pageNumber < cars.pageLimit)) {
      this.updateCount(operation, "activeGaragePage", pageNumber);
      this.garage.updateGarage();
    }
  }

  async updateWinners(operation: string, raceSettings: RaceSettingsTypes) {
    const pageNumber = raceSettings.activeWinnersPage;
    const winners = await apiService.getWinners(
      raceSettings.activeWinnersPage,
      raceSettings.winnersLimit,
      raceSettings.sort,
      raceSettings.order,
    );

    if ((pageNumber > 1 && operation === "decrease") || (operation === "increase" && pageNumber < winners.pageLimit)) {
      this.updateCount(operation, "activeWinnersPage", pageNumber);
      this.winners.updateWinners();
    }
  }

  updateContainer(operation: string) {
    const raceSettings = this.currentPage.getRaceSettings();
    const hash = window.location.hash;
    if (hash === "#garage") {
      this.updateGarage(operation, raceSettings);
    } else if (hash === "#winners") {
      this.updateWinners(operation, raceSettings);
    }
  }
}
