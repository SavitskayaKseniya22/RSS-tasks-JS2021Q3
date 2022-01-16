import { getWinners, getCar } from "./api";
import { WinnerType, CarType } from "./types";
import { getCarImg } from "./utils";

export class Winners {
  activeWinnersPage: string;
  sort: string;
  order: string;

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
      this.printTable();
    } else {
      this.sort = target.dataset.sort;
      window.localStorage.setItem("winnersSort", this.sort);
      this.printTable();
    }
  }

  changeOrder() {
    this.order === "ASC" ? (this.order = "DESC") : (this.order = "ASC");
    window.localStorage.setItem("winnersOrder", this.order);
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

  printTable() {
    document.querySelector(".container").innerHTML = this.makeTableContainer();
    (document.querySelector(`#by-${window.localStorage.getItem("winnersSort")}`) as HTMLInputElement).setAttribute(
      "checked",
      "checked",
    );
    getWinners().then((winners) => {
      winners.items.forEach((winner: WinnerType) => {
        getCar(winner.id).then((car: CarType) => {
          document.querySelector(".winners-table").innerHTML += this.makeTableTr(car, winner);
        });
      });
    });
  }

  printWinners(main: HTMLElement, header: HTMLElement) {
    window.localStorage.getItem("activeWinnersPage")
      ? (this.activeWinnersPage = window.localStorage.getItem("activeWinnersPage"))
      : window.localStorage.setItem("activeWinnersPage", this.activeWinnersPage);

    window.localStorage.getItem("winnersSort")
      ? (this.sort = window.localStorage.getItem("winnersSort"))
      : window.localStorage.setItem("winnersSort", this.sort);

    window.localStorage.getItem("winnersOrder")
      ? (this.order = window.localStorage.getItem("winnersOrder"))
      : window.localStorage.setItem("winnersOrder", this.order);

    main.innerHTML += `<h3 class="page-number">page ${this.activeWinnersPage}</h3>`;
    this.printTable();
    getWinners().then((cars) => {
      header.innerHTML += `<h2 class="winners-count">winners(${cars.count})</h2>`;
    });
  }
}
