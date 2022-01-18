import { getRandomName, getRandomColor, updateRaceSettings, blockButton } from "./utils";
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
  getWinners,
} from "./api";
import { CarType, WinnerType } from "./types";
import { Garage } from "./garage";

export class ControlPanel {
  garage: Garage;

  constructor(garage: Garage) {
    this.garage = garage;
    this.initListener();
  }

  initListener() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      switch (target.className) {
        case "create-name":
          target.value = getRandomName();
          break;
        case "create-color":
          target.value = getRandomColor();
          break;
        case "generate":
          this.generateCarView(target, 100);
          break;
        case "remove-all":
          this.removeAllCar(target);
          break;
        case "create-confirm":
          this.createCarView();
          break;
        case "update-confirm":
          if (document.querySelector(`.active`)) {
            this.updateCarView();
          }
          break;
        case "race":
          this.race(target);
          break;
        case "reset":
          this.stopAllCar();
          break;
      }
    });
  }

  printControlPanel() {
    return `<div class="control-panel">
    <div class="create">
      <input class="create-name" type="text" placeholder="Enter car name"   />
      <input class="create-color" type="color" />
      <button class="create-confirm">Create</button>
    </div>
    <div class="update">
      <input class="update-name" type="text" placeholder="Change car name"  />
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

  async generateCars(amount: number) {
    let i = 0;
    while (i < amount) {
      i++;
      await createCar({ name: getRandomName(), color: getRandomColor() });
    }
  }

  generateCarView(target: HTMLElement, amount: number) {
    target.classList.add("downloading");
    this.generateCars(amount).then(() => {
      target.classList.remove("downloading");
      this.garage.updateGarage();
    });
  }

  printWinnerScreen(name: string, time: number) {
    const timeInSec = (time / 1000).toFixed(3);
    const raceResult = document.querySelector(".race-result");
    name !== "no one"
      ? (raceResult.innerHTML = `<h2>Race is over!</h2>
<p class="winner-message">&#9733;${name}&#9733;<br> finished first in ${timeInSec} seconds<p>`)
      : (raceResult.innerHTML = `<h2>Race is over!</h2>
<p class="winner-message">No one finished first<p>`);
    raceResult.classList.add("active");
  }

  removeWinnerScreen() {
    const raceResult = document.querySelector(".race-result");
    raceResult.innerHTML = "";
    raceResult.classList.remove("active");
  }

  stopAllCar() {
    getCars().then((cars) => {
      cars.items.forEach((car: CarType) => {
        const index = cars.items.indexOf(car);
        this.garage.carCollection[index].stopCar(car.id);
      });
    });
    document.querySelector(".race").classList.remove("downloading");
  }

  race(target: HTMLElement) {
    getCars().then((cars) => {
      if (+cars.count >= 2) {
        blockButton("block", target);
        const promises = cars.items.map((car: CarType) => {
          const index = cars.items.indexOf(car);
          return this.garage.carCollection[index].drive(car.id);
        });
        Promise.any(promises)
          .then((carResult: WinnerType) => {
            getCar(carResult.id).then((car: CarType) => {
              this.printWinnerScreen(car.name, carResult.time);
              document.addEventListener("click", this.removeWinnerScreen, { once: true });
            });
            getWinner(carResult.id)
              .then((winner: WinnerType) => {
                let time: number;
                carResult.time < winner.time ? (time = carResult.time) : (time = winner.time);
                const data = {
                  wins: winner.wins + 1,
                  time: time,
                };
                updateWinner(carResult.id, data);
              })
              .catch(() => {
                createWinner({
                  id: carResult.id,
                  wins: 1,
                  time: carResult.time,
                });
              });
          })
          .catch(() => {
            this.printWinnerScreen("no one", 0);
            document.addEventListener("click", this.removeWinnerScreen, { once: true });
          });

        Promise.allSettled(promises).then(() => {
          blockButton("unblock", target);
        });
      }
    });
  }

  updateCarView() {
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

  createCarView() {
    const name = (document.querySelector(".create-name") as HTMLInputElement).value;
    const color = (document.querySelector(".create-color") as HTMLInputElement).value;
    createCar({ name: name, color: color }).then(() => {
      this.garage.updateGarage();
    });
  }

  removeAllCar(target: HTMLElement) {
    target.classList.add("downloading");
    getAllCars().then((cars) => {
      const promises = cars.map((car: CarType) => {
        return deleteCar(car.id);
      });
      Promise.allSettled(promises).then(() => {
        updateRaceSettings("activeGaragePage", "1");
        this.garage.updateGarage();
        target.classList.remove("downloading");
      });
      getWinners().then((winners) => {
        winners.items.forEach((winner: WinnerType) => {
          deleteWinner(winner.id);
        });
      });
    });
  }
}
