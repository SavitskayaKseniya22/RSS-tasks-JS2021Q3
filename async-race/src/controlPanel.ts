import { getRandomName, getRandomColor, blockButton } from "./utils";
import { apiService } from "./api";
import { CarType, WinnerType } from "./types";
import { Garage } from "./garage";
import { currentPage } from "./index";

export class ControlPanel {
  garage: Garage;

  constructor(garage: Garage) {
    this.garage = garage;
    this.initListener();
  }

  initListener() {
    document.addEventListener("submit", (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.className === "create") {
        e.preventDefault();
        this.createCarView();
      } else if (target.className === "update") {
        e.preventDefault();
        this.updateCarView();
        document.querySelector(".update-confirm").setAttribute("disabled", "disabled");
      }
    });

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
        case "race-all":
          this.race(target);
          break;
        case "reset-all":
          this.stopAllCar();
          break;
      }
    });
  }

  printControlPanel() {
    return `<div class="control-panel">
    <form action="" class="create">
      <input class="create-name" type="text" required placeholder="Enter car name"   />
      <input class="create-color" type="color" />
      <button type="submit" value="Create" class="create-confirm">Create</button>
    </form>
    <form action="" class="update">
      <input class="update-name" type="text" required placeholder="Change car name"  />
      <input class="update-color" type="color" />
      <button type="submit" value="Update" class="update-confirm" disabled>Update</button>
    </form>
    <ul>
      <li><button class="race-all">Race</button></li>
      <li><button class="reset-all">Reset</button></li>
      <li><button class="remove-all">Remove cars</button></li>
      <li><button class="generate">Generate cars</button></li>
    </ul>
  </div>`;
  }

  async generateCars(amount: number) {
    let i = 0;
    while (i < amount) {
      i++;
      await apiService.createCar({ name: getRandomName(), color: getRandomColor() });
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

    raceResult.innerHTML =
      name !== "no one"
        ? `<h2>Race is over!</h2>
<p class="winner-message">&#9733;${name}&#9733;<br> finished first in ${timeInSec} seconds<p>`
        : `<h2>Race is over!</h2>
<p class="winner-message">No one finished first<p>`;

    raceResult.classList.add("active");
  }

  removeWinnerScreen() {
    const raceResult = document.querySelector(".race-result");
    raceResult.innerHTML = "";
    raceResult.classList.remove("active");
  }

  stopAllCar() {
    const raceSettings = currentPage.getRaceSettings();
    apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit).then((cars) => {
      cars.items.map((car: CarType) => {
        const index = cars.items.indexOf(car);
        return this.garage.carCollection[index].stopCar(car.id);
      });
    });
    document.querySelector(".race-all").classList.remove("downloading");
  }

  race(target: HTMLElement) {
    const raceSettings = currentPage.getRaceSettings();
    apiService.getCars(raceSettings.activeGaragePage, raceSettings.garageLimit).then((cars) => {
      if (cars.items.length >= 2) {
        blockButton("block", target);
        const promises = cars.items.map((car: CarType) => {
          const index = cars.items.indexOf(car);
          return this.garage.carCollection[index].drive(car.id);
        });
        Promise.any(promises)
          .then((carResult: WinnerType) => {
            apiService.getCar(carResult.id).then((car: CarType) => {
              this.printWinnerScreen(car.name, carResult.time);
              document.addEventListener("click", this.removeWinnerScreen, { once: true });
            });
            apiService
              .getWinner(carResult.id)
              .then((winner: WinnerType) => {
                let time: number;
                carResult.time < winner.time ? (time = carResult.time) : (time = winner.time);
                const data = {
                  wins: winner.wins + 1,
                  time: time,
                };
                apiService.updateWinner(carResult.id, data);
              })
              .catch(() => {
                apiService.createWinner({
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
    apiService.updateCar(+element.dataset.num, {
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

    apiService.createCar({ name: name, color: color }).then(() => {
      this.garage.updateGarage();
    });
  }

  removeAllCar(target: HTMLElement) {
    target.classList.add("downloading");
    apiService.getAllCars().then((cars) => {
      const promises = cars.map((car: CarType) => {
        return apiService.deleteCar(car.id);
      });
      Promise.allSettled(promises).then(() => {
        currentPage.updateRaceSettings("activeGaragePage", "1");
        this.garage.updateGarage();
        target.classList.remove("downloading");
      });
      const raceSettings = currentPage.getRaceSettings();
      apiService
        .getWinners(raceSettings.activeWinnersPage, raceSettings.winnersLimit, raceSettings.sort, raceSettings.order)
        .then((winners) => {
          winners.items.forEach((winner: WinnerType) => {
            apiService.deleteWinner(winner.id);
          });
        });
    });
  }
}
