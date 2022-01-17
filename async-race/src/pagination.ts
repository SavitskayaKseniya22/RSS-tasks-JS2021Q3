import { RaceSettingsTypes } from "./types";
import { updateCarContainer } from "./garage";
import { updateRaceSettings } from "./page";
import { updateWinnersContainer } from "./winners";

export class Pagination {
  constructor() {}

  printPagination() {
    return `<ul class="buttons-container pagination">
    <li><button class="prev-page">Prev</button></li>
    <li><button class="next-page">Next</button></li> 
  </ul>`;
  }
}

function updateCount(operation: string, prop: string, pageNumber: number) {
  if (operation === "decrease") {
    return updateRaceSettings(prop, String(pageNumber - 1));
  } else {
    return updateRaceSettings(prop, String(pageNumber + 1));
  }
}

function updateGarage(operation: string, raceSettings: RaceSettingsTypes) {
  const pageNumber = +raceSettings.activeGaragePage;
  if ((pageNumber > 1 && operation === "decrease") || operation === "increase") {
    updateCount(operation, "activeGaragePage", pageNumber);
    updateCarContainer();
  }
}

function updateWinners(operation: string, raceSettings: RaceSettingsTypes) {
  const pageNumber = +raceSettings.activeWinnersPage;
  if ((pageNumber > 1 && operation === "decrease") || operation === "increase") {
    updateCount(operation, "activeWinnersPage", pageNumber);
    updateWinnersContainer();
  }
}

function updateContainer(operation: string) {
  const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));

  if (raceSettings.activePage === "garage") {
    updateGarage(operation, raceSettings);
  } else if (raceSettings.activePage === "winners") {
    updateWinners(operation, raceSettings);
  }
}

document.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest(".pagination")) {
    const target = e.target as HTMLElement;
    if (target.className === "prev-page") {
      updateContainer("decrease");
    } else if (target.className === "next-page") {
      updateContainer("increase");
    }
  }
});

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
