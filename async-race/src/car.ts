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
    <input type="radio" id="stop-engine${this.id}" name="engine${
      this.id
    }" value="stop" class="stopEngine" checked disabled />
    <label for="stop-engine${this.id}">Stop engine</label>
    </li>

    </ul>
    <div class="track">
     
      ${getCarImg(this.color, this.id)}
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

export function getCarImg(color: string, id: number) {
  return `
  <svg viewBox="0 0 612.001 612.001" fill=${color} class="car-pic car-pic${id}">
  <g>
    <path d="M589.333,276.033c-11.234-3.756-89.378-20.834-89.378-20.834s-144.86-82.375-162.245-82.375s-136.639,0.053-136.639,0.053
      c-29.137,0-53.487,22.203-81.68,47.909c-13.287,12.112-27.953,25.442-44.13,37.299l-60.249,8.011
      C6.306,268.872,0,277.018,0,286.643v69.03c0,11.913,9.656,21.571,21.57,21.571h41.401c3.007,34.65,32.153,61.932,67.57,61.932
      c35.415,0,64.563-27.283,67.57-61.931h197.687c3.007,34.65,32.153,61.931,67.57,61.931s64.563-27.283,67.57-61.931h34.013
      c26.95,0,40.119-11.64,43.426-22.566C616.739,327.03,610.724,283.185,589.333,276.033z M130.541,406.48
      c-19.38,0-35.148-15.766-35.148-35.146s15.766-35.148,35.148-35.148c19.38,0,35.146,15.766,35.146,35.148
      C165.688,390.714,149.921,406.48,130.541,406.48z M261.008,255.201H143.134c8.526-6.736,16.409-13.886,23.671-20.505
      c19.086-17.402,35.57-32.432,55.294-32.432c0,0,17.85-0.008,38.91-0.017V255.201z M289.711,202.236
      c14.588-0.005,27.592-0.009,34.116-0.009c16.245,0,82.135,38.264,106.864,52.975h-140.98L289.711,202.236L289.711,202.236z
       M463.367,406.48c-19.38,0-35.146-15.766-35.146-35.146s15.766-35.148,35.146-35.148c19.38,0,35.148,15.766,35.148,35.148
      C498.515,390.714,482.747,406.48,463.367,406.48z"/>
  </g>
  </svg>`;
}
