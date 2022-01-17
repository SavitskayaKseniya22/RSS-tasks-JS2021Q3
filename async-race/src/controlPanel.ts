import { getRandomName, getRandomColor, updateRaceSettings } from "./utils";
import {
  createCar,
  deleteCar,
  getAllCars,
  updateCar,
  getCars,
  createWinner,
  getWinner,
  updateWinner,
  getCar,
  deleteWinner,
} from "./api";
import { drive, stopCar } from "./car";
import { CarType, WinnerType } from "./types";
import { updateCarContainer } from "./garage";

export class ControlPanel {
  constructor() {}

  printControlPanel() {
    return `<div class="control-panel">
    <div class="create">
      <input class="create-name" type="text" placeholder="Enter car name"  />
      <input class="create-color" type="color" />
      <button class="create-confirm">Create</button>
    </div>
    <div class="update">
      <input class="update-name" type="text" placeholder="Change car name" />
      <input class="update-color" type="color" />
      <button class="update-confirm">Update</button>
    </div>
    <ul>
      <li><button class="race">Race</button></li>
      <li><button class="reset">Reset</button></li>
      <li><button class="remove-all">Remove cars</button></li>
      <li><button class="generate">Generate cars</button></li>
    </ul>
  </div>`;
  }
}

async function generateCars(amount: number) {
  let i = 0;
  while (i < amount) {
    i++;
    await createCar({ name: getRandomName(), color: getRandomColor() });
  }
}
function generateCarView(target: HTMLElement, amount: number) {
  target.classList.add("downloading");
  generateCars(amount).then(() => {
    target.classList.remove("downloading");
    updateCarContainer();
  });
}

function printWinnerScreen(name: string, time: number) {
  const timeInSec = (time / 1000).toFixed(3);
  const message = `<h2>Race is over!</h2>
  <p class="winner-message">&#9733;${name}&#9733;<br> finished first in ${timeInSec} seconds<p>`;
  document.querySelector(".race-result").innerHTML = message;
  document.querySelector(".race-result").classList.add("active");
}

function removeWinnerScreen() {
  document.querySelector(".race-result").innerHTML = "";
  document.querySelector(".race-result").classList.remove("active");
}

function stopAllCar() {
  getCars().then((cars) => {
    cars.items.forEach((car: CarType) => {
      stopCar(car.id);
    });
  });
}

function race(target: HTMLElement) {
  getCars().then((cars) => {
    if (+cars.count >= 2) {
      target.classList.add("downloading");
      const promises = cars.items.map((car: CarType) => {
        return drive(car.id);
      });
      Promise.race(promises).then((carResult: WinnerType) => {
        target.classList.remove("downloading");
        getCar(carResult.id).then((car: CarType) => {
          printWinnerScreen(car.name, carResult.time);
          document.addEventListener("click", removeWinnerScreen, { once: true });
        });
        getWinner(carResult.id).then(
          (winner: WinnerType) => {
            let time: number;
            carResult.time < winner.time ? (time = carResult.time) : (time = winner.time);
            const data = {
              wins: winner.wins + 1,
              time: time,
            };
            updateWinner(carResult.id, data);
          },
          () => {
            createWinner({
              id: carResult.id,
              wins: 1,
              time: carResult.time,
            });
          },
        );
      });
    }
  });
}

function updateCarView() {
  const element = document.querySelector(`.active`) as HTMLElement;
  const name = (document.querySelector(".update-name") as HTMLInputElement).value;
  const color = (document.querySelector(".update-color") as HTMLInputElement).value;
  updateCar(+element.dataset.num, {
    name: name,
    color: color,
  });
  const title = element.querySelector("h3");
  title.innerHTML = name;
  const img = element.querySelector(".car-pic");
  img.setAttribute("fill", color);
  element.classList.remove("active");
  (document.querySelector(".update-name") as HTMLInputElement).value = "";
  (document.querySelector(".update-color") as HTMLInputElement).value = "#000000";
}

function createCarView() {
  const name = (document.querySelector(".create-name") as HTMLInputElement).value;
  const color = (document.querySelector(".create-color") as HTMLInputElement).value;
  createCar({ name: name, color: color }).then(() => {
    updateCarContainer();
  });
}

function removeAllCar(target: HTMLElement) {
  target.classList.add("downloading");
  getAllCars().then((cars) => {
    const promises = cars.map((element: CarType) => {
      deleteWinner(element.id);
      return deleteCar(element.id);
    });
    Promise.all(promises).then(() => {
      updateRaceSettings("activeGaragePage", "1");
      updateCarContainer();
      target.classList.remove("downloading");
    });
  });
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  switch (target.className) {
    case "generate":
      generateCarView(target, 100);
      break;
    case "remove-all":
      removeAllCar(target);
      break;
    case "create-confirm":
      createCarView();
      break;
    case "update-confirm":
      if (document.querySelector(`.active`)) {
        updateCarView();
      }
      break;
    case "race":
      race(target);
      break;
    case "reset":
      stopAllCar();
      break;
  }
});
