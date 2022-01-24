import { apiService } from "./api";
import { getTime, getID, getCarImg } from "./utils";
import { Car, Engine } from "./types";
import { Garage } from "./garage";

export class CarModel {
  name: string;
  color: string;
  id: number;

  constructor(carItem: Car) {
    this.name = carItem.name;
    this.color = carItem.color;
    this.id = carItem.id;
  }

  async selectCar(id: number) {
    const car = await apiService.getCar(id);
    (document.querySelector(".update-name") as HTMLInputElement).value = car.name;
    (document.querySelector(".update-color") as HTMLInputElement).value = car.color;
    const element = document.querySelector(`.car[data-num="${id}"]`);
    document.querySelectorAll(".active").forEach((activeElement) => {
      activeElement.classList.remove("active");
    });
    element.classList.add("active");
    document.querySelector(".update-confirm").removeAttribute("disabled");
  }

  renderCar() {
    document.querySelector(".container").innerHTML += this.makeCar();
  }

  makeCar() {
    return `<div class="car" data-num=${this.id}>
    <h3>${this.name}</h3>
    <ul class="buttons-container">
      <li><button class="selectCar">Select</button></li>
      <li><button class="removeCar">Remove</button></li>
      <li><button id="start-engine${this.id}" class="startEngine">Start</button></li>
      <li><button id="stop-engine${this.id}" class="stopEngine" disabled>Reset</button></li>
    </ul>
    <div class="track">
      ${getCarImg(this.color, this.id)}
      <img src="./images/banner.svg" alt="banner" class="banner-pic" />
    </div>
  </div>`;
  }

  async drive(id: number) {
    return new Promise(async (resolve, reject) => {
      this.unsetAnimation(id);
      const car = await apiService.changeDriveMode(id, "started");
      this.updateEngineButton("start", id);
      this.setAnimation(id, car);
      try {
        await apiService.changeDriveMode(id, "drive");
        resolve({ id: id, time: getTime(car.velocity, car.distance) });
      } catch (error) {
        this.pauseCar(id);
        reject(`Car number ${id} stopped! Сar engine broken!`);
        console.log(`Car number ${id} stopped! Сar engine broken!`);
      }
    });
  }

  async pauseCar(id: number) {
    await apiService.changeDriveMode(id, "stopped");
    const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
    if (carImg) {
      carImg.style.animationPlayState = "paused";
    }
  }

  async stopCar(id: number) {
    await apiService.changeDriveMode(id, "stopped");
    this.updateEngineButton("stop", id);
    this.unsetAnimation(id);
  }

  unsetAnimation(id: number) {
    const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
    if (carImg) {
      carImg.classList.remove("car-pic-animation");
      carImg.style.animationDuration = "unset";
      carImg.style.animationPlayState = "unset";
    }
  }

  setAnimation(id: number, car: Engine) {
    const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
    if (carImg) {
      const time = getTime(car.velocity, car.distance);
      carImg.classList.add("car-pic-animation");
      carImg.style.animationDuration = `${time}ms`;
      carImg.style.animationPlayState = "running";
    }
  }

  updateEngineButton(button: "start" | "stop", id: number) {
    const start = document.querySelector(`#start-engine${id}`) as HTMLInputElement;
    const stop = document.querySelector(`#stop-engine${id}`) as HTMLInputElement;
    if (start && stop) {
      button === "start" ? ((start.disabled = true), (stop.disabled = false)) : (start.disabled = false);
    }
  }

  async removeCar(target: HTMLButtonElement, object: Garage) {
    const removeId = getID(target);
    await apiService.deleteCar(removeId);
    object.updateGarage();
    try {
      await apiService.getWinner(removeId);
      apiService.deleteWinner(removeId);
    } catch {}
  }

  initListener(object: Garage) {
    document.addEventListener("click", async (e) => {
      const target = e.target as HTMLButtonElement;
      switch (target.className) {
        case "removeCar":
          this.removeCar(target, object);
          break;
        case "startEngine":
          try {
            await this.drive(getID(target));
          } catch (error) {}
          break;
        case "stopEngine":
          this.stopCar(getID(target));
          target.disabled = true;
          break;
        case "selectCar":
          this.selectCar(getID(target));
          break;
      }
    });
  }
}
