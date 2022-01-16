import { RaceSettingsTypes } from "./types";
import { updateCarContainer } from "./garage";
import { updateRaceSettings } from "./page";
import { updateWinnersContainer } from "./winners";

export class Pagination {
  raceSettings: RaceSettingsTypes;
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
  updateCount(operation, "activeGaragePage", +raceSettings.activeGaragePage);
  updateCarContainer();
}

function updateWinners(operation: string, raceSettings: RaceSettingsTypes) {
  const count = updateCount(operation, "activeWinnersPage", +raceSettings.activeWinnersPage);
  updateWinnersContainer(count);
}

function updateContainer(operation: string, raceSettings: RaceSettingsTypes) {
  if (raceSettings.activePage === "garage") {
    updateGarage(operation, raceSettings);
  } else if (raceSettings.activePage === "winners") {
    updateWinners(operation, raceSettings);
  }
}

document.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest(".pagination")) {
    const target = e.target as HTMLElement;
    const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings"));
    if (raceSettings.activePage === "garage") {
      if (target.className === "prev-page" && +raceSettings.activeGaragePage > 1) {
        updateContainer("decrease", raceSettings);
      } else if (target.className === "next-page") {
        updateContainer("increase", raceSettings);
      }
    } else {
      if (target.className === "prev-page" && +raceSettings.activeWinnersPage > 1) {
        updateContainer("decrease", raceSettings);
      } else if (target.className === "next-page") {
        updateContainer("increase", raceSettings);
      }
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
