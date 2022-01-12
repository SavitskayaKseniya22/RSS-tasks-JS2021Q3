import carNames from "./carNames.json";

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
