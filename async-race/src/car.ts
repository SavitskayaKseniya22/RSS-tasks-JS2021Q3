import { deleteCar, changeDriveMode, getCar, deleteWinner } from "./api";
import { getTime, getID } from "./utils";
import { CarType, EngineType } from "./types";
import { updateCarContainer } from "./garage";

export class Car {
  name: string;
  color: string;
  id: number;

  constructor(carItem: CarType) {
    this.name = carItem.name;
    this.color = carItem.color;
    this.id = carItem.id;
    document.querySelector(".container").innerHTML += this.renderCar();
  }
  renderCar() {
    return `<div class="car" data-num=${this.id}>
    <h3>${this.name}</h3>
    <ul class="buttons-container">
      <li><button class="selectCar">Select</button></li>
      <li><button class="removeCar">Remove</button></li>

    <li>
    <input type="radio" id="start-engine${this.id}" name="engine${this.id}" value="start" class="startEngine" />
    <label for="start-engine${this.id}">Start engine</label>
    </li>

    <li>
    <input type="radio" id="stop-engine${this.id}" name="engine${this.id}" value="stop" class="stopEngine" checked disabled />
    <label for="stop-engine${this.id}">Stop engine</label>
    </li>

    </ul>
    <div class="track">
      <img src="./images/car.svg" alt="car" class="car-pic car-pic${this.id}" style="background-color:${this.color}"  />
      <img src="./images/banner.svg" alt="banner" class="banner-pic" />
    </div>
  </div>`;
  }
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;
  switch (target.className) {
    case "removeCar":
      const removeId = getID(target);
      deleteCar(removeId).then(() => {
        deleteWinner(removeId);
        updateCarContainer();
      });
      break;
    case "startEngine":
      drive(getID(target));
      break;
    case "stopEngine":
      stopCar(getID(target));
      break;
    case "selectCar":
      const id = getID(target);
      getCar(id).then((value) => {
        (document.querySelector(".update-name") as HTMLInputElement).value = value.name;
        (document.querySelector(".update-color") as HTMLInputElement).value = value.color;
        const element = document.querySelector(`.car[data-num="${id}"]`);
        document.querySelectorAll(".active").forEach((activeElement) => {
          activeElement.classList.remove("active");
        });
        element.classList.add("active");
      });
      break;
  }
});

export async function drive(id: number) {
  return new Promise((resolve) => {
    unsetAnimation(id);
    changeDriveMode(id, "started").then((car: EngineType) => {
      updateEngineButton("start", id);
      setAnimation(id, car);
      changeDriveMode(id, "drive").then(
        () => {
          updateEngineButton("stop", id);
          resolve({ id: id, time: getTime(car.velocity, car.distance) });
        },
        () => {
          pauseCar(id);
        },
      );
    });
  });
}

export function pauseCar(id: number) {
  changeDriveMode(id, "stopped").then(() => {
    updateEngineButton("stop", id);
    const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
    carImg.style.animationPlayState = "paused";
  });
}

export function stopCar(id: number) {
  changeDriveMode(id, "stopped").then(() => {
    updateEngineButton("stop", id);
    unsetAnimation(id);
  });
}

function unsetAnimation(id: number) {
  const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
  carImg.classList.remove("car-pic-animation");
  carImg.style.animationDuration = "unset";
  carImg.style.animationPlayState = "unset";
}

function setAnimation(id: number, car: EngineType) {
  const carImg = document.querySelector(`.car-pic.car-pic${id}`) as HTMLImageElement;
  const time = getTime(car.velocity, car.distance);
  carImg.classList.add("car-pic-animation");
  carImg.style.animationDuration = `${time}ms`;
  carImg.style.animationPlayState = "running";
}

function updateEngineButton(button: "start" | "stop", id: number) {
  (document.querySelector(`#${button}-engine${id}`) as HTMLInputElement).checked = true;
  if (button === "start") {
    (document.querySelector(`#start-engine${id}`) as HTMLInputElement).disabled = true;
    (document.querySelector(`#stop-engine${id}`) as HTMLInputElement).disabled = false;
  } else {
    (document.querySelector(`#start-engine${id}`) as HTMLInputElement).disabled = false;
    (document.querySelector(`#stop-engine${id}`) as HTMLInputElement).disabled = true;
  }
}
