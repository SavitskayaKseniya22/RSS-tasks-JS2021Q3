import { getWinners, getCar } from "./api";
import { WinnerType } from "./controlPanel";
import { CarType } from "./car";

export class Winners {
  constructor() {}
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
}
