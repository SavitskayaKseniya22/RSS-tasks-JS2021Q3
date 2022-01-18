import { deleteCar, changeDriveMode, getCar, deleteWinner } from "./api";
import { getTime, getID, getCarImg } from "./utils";
import { CarType, EngineType } from "./types";
import { Garage } from "./garage";

export class Car {
  name: string;
  color: string;
  id: number;

  constructor(carItem: CarType) {
    this.name = carItem.name;
    this.color = carItem.color;
    this.id = carItem.id;
    return this;
  }

  selectCar(id: number) {
    getCar(id).then((value) => {
      (document.querySelector(".update-name") as HTMLInputElement).value = value.name;
      (document.querySelector(".update-color") as HTMLInputElement).value = value.color;
      const element = document.querySelector(`.car[data-num="${id}"]`);
      document.querySelectorAll(".active").forEach((activeElement) => {
        activeElement.classList.remove("active");
      });
      element.classList.add("active");
    });
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
      <li><button id="start-engine${this.id}" class="startEngine">Start engine</button></li>
      <li><button id="stop-engine${this.id}" class="stopEngine">Stop engine</button></li>
    
    </ul>
    <div class="track">
      ${getCarImg(this.color, this.id)}
      <img src="./images/banner.svg" alt="banner" class="banner-pic" />
    </div>
  </div>`;
  }

  async drive(id: number) {
    return new Promise((resolve, reject) => {
      this.unsetAnimation(id);
      changeDriveMode(id, "started").then((car: EngineType) => {
        this.updateEngineButton("start", id);
        this.setAnimation(id, car);
        changeDriveMode(id, "drive")
          .then(() => {
            resolve({ id: id, time: getTime(car.velocity, car.distance) });
          })
          .catch(() => {
            this.pauseCar(id);
            reject(`Car number ${id} stopped! Сar engine broken!`);
          })
          .finally(() => {
            this.updateEngineButton("stop", id);
          });
      });
    });
  }

  pauseCar(id: number) {
    changeDriveMode(id, "stopped").then(() => {
      const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
      carImg.style.animationPlayState = "paused";
    });
  }

  stopCar(id: number) {
    changeDriveMode(id, "stopped").then(() => {
      this.updateEngineButton("stop", id);
      this.unsetAnimation(id);
    });
  }

  unsetAnimation(id: number) {
    const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
    carImg.classList.remove("car-pic-animation");
    carImg.style.animationDuration = "unset";
    carImg.style.animationPlayState = "unset";
  }

  setAnimation(id: number, car: EngineType) {
    const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
    const time = getTime(car.velocity, car.distance);
    carImg.classList.add("car-pic-animation");
    carImg.style.animationDuration = `${time}ms`;
    carImg.style.animationPlayState = "running";
  }

  updateEngineButton(button: "start" | "stop", id: number) {
    const start = document.querySelector(`#start-engine${id}`) as HTMLInputElement;
    button === "start" ? (start.disabled = true) : (start.disabled = false);
  }

  initListener(object: Garage) {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      switch (target.className) {
        case "removeCar":
          const removeId = getID(target);
          deleteCar(removeId).then(() => {
            deleteWinner(removeId);
            object.updateGarage();
          });
          break;
        case "startEngine":
          this.drive(getID(target)).catch((res) => {
            console.error(res);
          });
          break;
        case "stopEngine":
          this.stopCar(getID(target));
          break;
        case "selectCar":
          this.selectCar(getID(target));
          break;
      }
    });
  }
}
