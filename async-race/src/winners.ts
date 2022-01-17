import { getWinners, getCar } from "./api";
import { WinnerType, CarType, RaceSettingsTypes } from "./types";
import { getCarImg } from "./utils";
import { updateRaceSettings } from "./page";

export class Winners {
  activeWinnersPage: string;
  sort: string;
  order: string;
  raceSettings: RaceSettingsTypes;

  constructor(activeWinnersPage = "1", sort = "wins", order = "ASC") {
    this.activeWinnersPage = activeWinnersPage;
    this.sort = sort;
    this.order = order;

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.closest(".by-id") || target.closest(".by-wins") || target.closest(".by-time")) {
        this.changeSort(target);
      }
    });
  }

  changeSort(target: HTMLElement) {
    if (this.sort === target.dataset.sort) {
      this.changeOrder();
      updateWinnersContainer();
    } else {
      this.sort = target.dataset.sort;
      updateRaceSettings("winnersSort", this.sort);
      updateWinnersContainer();
    }
  }

  changeOrder() {
    this.order === "ASC" ? (this.order = "DESC") : (this.order = "ASC");
    updateRaceSettings("winnersOrder", this.order);
  }

  printWinners(main: HTMLElement, header: HTMLElement) {
    document.querySelector(".container").innerHTML = makeTableContainer();
    const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));
    (document.querySelector(`#by-${raceSettings.winnersSort}`) as HTMLInputElement).setAttribute("checked", "checked");
    getWinners().then((winners) => {
      main.innerHTML += `<h3 class="page-number">page ${winners.pageNumber}</h3>`;
      header.innerHTML += `<h2 class="winners-count">winners(${winners.count})</h2>`;
      winners.items.forEach((winner: WinnerType) => {
        getCar(winner.id).then((car: CarType) => {
          document.querySelector(".winners-table").innerHTML += makeTableTr(car, winner);
        });
      });
    });
  }
}

function makeTableContainer() {
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

function makeTableTr(car: CarType, winner: WinnerType) {
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

export function updateWinnersContainer() {
  document.querySelector(".container").innerHTML = makeTableContainer();
  const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));
  (document.querySelector(`#by-${raceSettings.winnersSort}`) as HTMLInputElement).setAttribute("checked", "checked");
  getWinners().then((winners) => {
    document.querySelector(".page-number").innerHTML = `page ${winners.pageNumber}`;
    winners.items.forEach((winner: WinnerType) => {
      getCar(winner.id).then((car: CarType) => {
        document.querySelector(".winners-table").innerHTML += makeTableTr(car, winner);
      });
    });
  });
}
