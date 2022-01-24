import { apiService } from "./api";
import { Winner, Car, RaceSettingsTypes } from "./types";
import { getCarImg } from "./utils";
import { Page } from "./page";

export class Winners {
  order: string;
  currentPage: Page;
  pageNumberTitle: string;
  title: string;
  carsHTML: string;
  rows: string;

  constructor(currentPage: Page) {
    this.currentPage = currentPage;
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
    const raceSettings = this.currentPage.getRaceSettings();
    raceSettings.sort === target.dataset.sort
      ? this.changeOrder(raceSettings)
      : this.currentPage.updateRaceSettings("sort", target.dataset.sort);

    this.updateWinners();
  }

  changeOrder(raceSettings: RaceSettingsTypes) {
    this.order = raceSettings.order === "ASC" ? "DESC" : "ASC";
    this.currentPage.updateRaceSettings("order", this.order);
  }

  async makeWinners() {
    const raceSettings = this.currentPage.getRaceSettings();
    const winners = await apiService.getWinners(
      raceSettings.activeWinnersPage,
      raceSettings.winnersLimit,
      raceSettings.sort,
      raceSettings.order,
    );

    this.pageNumberTitle = `page ${winners.pageNumber}`;
    this.title = `garage(${winners.count})`;
    this.rows = "";

    const promises = winners.items.map(async (winner: Winner) => {
      const car = await apiService.getCar(winner.id);
      this.rows += this.makeTableTr(car, winner);
      return car;
    });

    await Promise.allSettled(promises);
    this.carsHTML = this.makeTable(this.rows);
  }

  async updateWinners() {
    document.querySelector(".container").innerHTML = "";

    const raceSettings = this.currentPage.getRaceSettings();
    const winners = await apiService.getWinners(
      raceSettings.activeWinnersPage,
      raceSettings.winnersLimit,
      raceSettings.sort,
      raceSettings.order,
    );

    this.pageNumberTitle = `page ${winners.pageNumber}`;
    this.title = `garage(${winners.count})`;
    this.rows = "";

    document.querySelector(".page-number").innerHTML = this.pageNumberTitle;
    document.querySelector(".count").innerHTML = this.title;

    const promises = winners.items.map(async (winner: Winner) => {
      const car = await apiService.getCar(winner.id);
      this.rows += this.makeTableTr(car, winner);
      return car;
    });

    await Promise.allSettled(promises);
    this.carsHTML = this.makeTable(this.rows);
    document.querySelector(".container").innerHTML = this.carsHTML;
    (document.querySelector(`#by-${winners.sort}`) as HTMLInputElement).setAttribute("checked", "checked");
  }

  makeTable(content: string) {
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
  ${content}
</table>`;
  }

  makeTableTr(car: Car, winner: Winner) {
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
}
