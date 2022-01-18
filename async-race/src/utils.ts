import carNames from "./carNames.json";
import { RaceSettingsTypes } from "./types";
import { Car } from "./car";

function getRandomNumber(max: number) {
  const rand = -0.5 + Math.random() * (max + 1);
  return Math.round(rand);
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getRandomName() {
  const carTypeNum = getRandomNumber(Object.keys(carNames).length - 1);
  const carType = Object.keys(carNames)[carTypeNum];
  const carNameNum = getRandomNumber(Object.values(carNames)[carTypeNum].length - 1);
  const carModel = Object.values(carNames)[carTypeNum][carNameNum];
  return `${carType} ${carModel}`;
}

export function getID(target: HTMLButtonElement) {
  const parent = target.closest(".car") as HTMLElement;
  const id = +parent.dataset.num;
  return id;
}

export function getTime(v: number, d: number) {
  return d / v;
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

export function updateRaceSettings(prop: string, value: string) {
  const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings")) as RaceSettingsTypes;
  raceSettings[prop] = value;
  window.localStorage.setItem("raceSettings", JSON.stringify(raceSettings));
  return value;
}

export function takeId(carCollection: Car[]) {
  return carCollection.map((element) => {
    return element.id;
  });
}

export function isDiff(carCollection: Car[], carCollectionNew: Car[]) {
  const carCollectionId = takeId(carCollection);
  const carCollectionNewId = takeId(carCollectionNew);

  let diff = false;
  if (carCollectionId.length !== carCollectionNewId.length) {
    diff = true;
  } else {
    for (let i = 0; i < carCollectionNewId.length; i++) {
      if (carCollectionNewId[i] === carCollectionId[i]) {
        continue;
      } else {
        diff = true;
        break;
      }
    }
  }
  return diff;
}

export function blockButton(state: "block" | "unblock", target: HTMLElement) {
  const buttons = document.querySelectorAll("button");
  if (state === "block") {
    target.classList.add("downloading");
    buttons.forEach((button) => {
      button.setAttribute("disabled", "disabled");
    });
    document.querySelector(".to-winners").setAttribute("disabled", "disabled");
  } else {
    target.classList.remove("downloading");
    buttons.forEach((button) => {
      button.removeAttribute("disabled");
    });
    document.querySelector(".to-winners").removeAttribute("disabled");
  }
}
