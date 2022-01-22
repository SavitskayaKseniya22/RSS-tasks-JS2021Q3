import { Garage } from "./garage";
import { Winners } from "./winners";
import { RaceSettingsTypes } from "./types";
import { currentPage } from "./index";
import { apiService } from "./api";

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
    return operation === "decrease"
      ? currentPage.updateRaceSettings(prop, pageNumber - 1)
      : currentPage.updateRaceSettings(prop, pageNumber + 1);
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
    const winners = await apiService.getWinners(
      raceSettings.activeWinnersPage,
      raceSettings.winnersLimit,
      raceSettings.sort,
      raceSettings.order,
    );

    const pageNumber = raceSettings.activeWinnersPage;
    if ((pageNumber > 1 && operation === "decrease") || (operation === "increase" && pageNumber < winners.pageLimit)) {
      this.updateCount(operation, "activeWinnersPage", pageNumber);
      this.winners.updateWinners();
    }
  }

  updateContainer(operation: string) {
    const raceSettings = currentPage.getRaceSettings();
    if (raceSettings.activePage === "garage") {
      this.updateGarage(operation, raceSettings);
    } else if (raceSettings.activePage === "winners") {
      this.updateWinners(operation, raceSettings);
    }
  }
}
