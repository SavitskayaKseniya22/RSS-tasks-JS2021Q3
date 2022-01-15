import { Winners } from "./winners";

import { updateCarContainer } from "./garage";

export class Pagination {
  winners: Winners;
  constructor(winners: Winners) {
    this.winners = winners;
    document.addEventListener("click", (e) => {
      if (window.localStorage.getItem("activePage") === "garage") {
        if (
          (e.target as HTMLElement).className === "prev-page" &&
          +window.localStorage.getItem("activeGaragePage") > 1
        ) {
          this.updateGarage("decrease");
        } else if ((e.target as HTMLElement).className === "next-page") {
          this.updateGarage("increase");
        }
      } else {
        if (
          (e.target as HTMLElement).className === "prev-page" &&
          +window.localStorage.getItem("activeWinnersPage") > 1
        ) {
          this.updateWinners("decrease");
        } else if ((e.target as HTMLElement).className === "next-page") {
          this.updateWinners("increase");
        }
      }
    });
  }
  printPagination() {
    return `<ul class="buttons-container">
    <li><button class="prev-page">Prev</button></li>
    <li><button class="next-page">Next</button></li> 
  </ul>`;
  }

  updateGarage(operation: string) {
    this.updateCount(operation, "activeGaragePage");
    updateCarContainer();
  }

  updateCount(operation: string, prop: string) {
    const savedCount = window.localStorage.getItem(prop);
    let count: number;
    operation === "decrease" ? (count = +savedCount - 1) : (count = +savedCount + 1);
    window.localStorage.setItem(prop, String(count));
    return count;
  }

  updateWinners(operation: string) {
    const count = this.updateCount(operation, "activeWinnersPage");
    document.querySelector(".page-number").innerHTML = `page ${count}`;
    document.querySelector(".container").innerHTML = this.winners.printTable();
    this.winners.makeTableTr();
  }
}

/*
getCars().then((cars) => {
  const idArray: number[] = [];
  cars.items.forEach((car: CarType) => {
    idArray.push(car.id);
  });
  if (idArray.includes(car.id)) {
    new Car(car);
  }
  document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
});*/
