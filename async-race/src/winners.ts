import { apiService } from "./api";
import { WinnerType, CarType, RaceSettingsTypes } from "./types";
import { getCarImg } from "./utils";
import { currentPage } from "./index";

export class Winners {
  order: string;

  constructor(order = "ASC") {
    this.order = order;
    this.initListener();
  }

  initListener() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(".by-id") || target.closest(".by-wins") || target.closest(".by-time")) {
        this.changeSort(target);
      }
    });
  }

  changeSort(target: HTMLElement) {
    const raceSettings = currentPage.getRaceSettings();
    raceSettings.sort === target.dataset.sort
      ? this.changeOrder(raceSettings)
      : currentPage.updateRaceSettings("sort", target.dataset.sort);

    this.updateWinners();
  }

  changeOrder(raceSettings: RaceSettingsTypes) {
    this.order = raceSettings.order === "ASC" ? "DESC" : "ASC";
    currentPage.updateRaceSettings("order", this.order);
  }

  async printWinners(main: HTMLElement, header: HTMLElement) {
    document.querySelector(".to-winners").setAttribute("disabled", "disabled");
    document.querySelector(".container").innerHTML = this.makeTableContainer();
    const raceSettings = currentPage.getRaceSettings();
    apiService
      .getWinners(raceSettings.activeWinnersPage, raceSettings.winnersLimit, raceSettings.sort, raceSettings.order)
      .then((winners) => {
        (document.querySelector(`#by-${winners.sort}`) as HTMLInputElement).setAttribute("checked", "checked");
        main.innerHTML += `<h3 class="page-number">page ${winners.pageNumber}</h3>`;
        header.innerHTML += `<h2 class="winners-count">winners(${winners.count})</h2>`;
        winners.items.forEach((winner: WinnerType) => {
          apiService.getCar(winner.id).then((car: CarType) => {
            document.querySelector(".winners-table").innerHTML += this.makeTableTr(car, winner);
          });
        });
      });
  }

  makeTableContainer() {
    return `<table class="winners-table">
  <tr>
    <th class="by-id" >
      <input type="radio" id="by-id" name="sort" value="by-id" /> <label for="by-id" data-sort="id">Number</label>
    </th>
    <th>Car</th>
    <th>Name</th>
    <th class="by-wins" data-sort="wins">
      <input type="radio" id="by-wins" name="sort" value="by-wins" /> <label for="by-wins" data-sort="wins">Wins</label>
    </th>
    <th class="by-time" data-sort="time">
      <input type="radio" id="by-time" name="sort" value="by-time" /> <label for="by-time" data-sort="time">Best time (s)</label>
    </th>
  </tr>
</table>`;
  }

  makeTableTr(car: CarType, winner: WinnerType) {
    const timeInSec = (winner.time / 1000).toFixed(3);
    return `
  <tr>
    <td>${car.id}</td>
    <td>${getCarImg(car.color, car.id)}</td>
    <td>${car.name}</td>
    <td>${winner.wins}</td>
    <td>${timeInSec}</td>
  </tr>
`;
  }

  async updateWinners() {
    document.querySelector(".container").innerHTML = this.makeTableContainer();
    const raceSettings = currentPage.getRaceSettings();
    apiService
      .getWinners(raceSettings.activeWinnersPage, raceSettings.winnersLimit, raceSettings.sort, raceSettings.order)
      .then((winners) => {
        (document.querySelector(`#by-${winners.sort}`) as HTMLInputElement).setAttribute("checked", "checked");
        document.querySelector(".page-number").innerHTML = `page ${winners.pageNumber}`;
        winners.items.forEach((winner: WinnerType) => {
          apiService.getCar(winner.id).then((car: CarType) => {
            document.querySelector(".winners-table").innerHTML += this.makeTableTr(car, winner);
          });
        });
      });
  }
}
