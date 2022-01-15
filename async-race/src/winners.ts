import { getWinners, getCar } from "./api";
import { WinnerType, CarType } from "./types";

export class Winners {
  activeWinnersPage: string;

  constructor(activeWinnersPage = "1") {
    this.activeWinnersPage = activeWinnersPage;
    window.localStorage.getItem("activeWinnersPage")
      ? (this.activeWinnersPage = window.localStorage.getItem("activeWinnersPage"))
      : window.localStorage.setItem("activeWinnersPage", this.activeWinnersPage);
  }
  printTable() {
    return `<table class="winners-table">
    <tr>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
      <th>Wins</th>
      <th>Best time</th>
    </tr>
  </table>`;
  }
  makeTableTr() {
    getWinners().then((winners) => {
      winners.items.forEach((winner: WinnerType) => {
        getCar(winner.id).then((car: CarType) => {
          document.querySelector(".winners-table").innerHTML += this.printTableTr(car, winner);
        });
      });
    });
  }
  printTableTr(car: CarType, winner: WinnerType) {
    return `
    <tr>
      <td>${car.id}</td>
      <td>${car.color}</td>
      <td>${car.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>
 `;
  }
  printWinners(main: HTMLElement, header: HTMLElement) {
    main.innerHTML += `<h3 class="page-number">page ${this.activeWinnersPage}</h3>`;
    document.querySelector(".container").innerHTML += this.printTable();
    this.makeTableTr();
    getWinners().then((cars) => {
      header.innerHTML += `<h2 class="winners-count">winners(${cars.count})</h2>`;
    });
  }
}
