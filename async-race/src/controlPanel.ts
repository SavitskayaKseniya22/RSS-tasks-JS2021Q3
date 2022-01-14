import { getRandomName, getRandomColor } from "./utils";
import { createCar, deleteCar, getAllCars, updateCar, getCars } from "./api";
import { Car, CarType, drive, stopCar } from "./car";

export class ControlPanel {
  constructor() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.className === "generate") {
        this.generateCars(100).then(() => {
          getCars().then((cars) => {
            document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
            document.querySelector(".cars-container").innerHTML = "";
            cars.items.forEach((car: CarType) => {
              new Car(car);
            });
          });
        });
      } else if (target.className === "remove-all") {
        getAllCars().then((value) => {
          value.forEach((element: CarType) => {
            deleteCar(element.id);
          });
        });
        document.querySelector(".page-number").innerHTML = `page 1`;
        document.querySelector(".cars-container").innerHTML = "";
        document.querySelector(".cars-count").innerHTML = `garage(0)`;
        window.localStorage.setItem("activeCarPage", "1");
      } else if (target.className === "create-confirm") {
        const name = (document.querySelector(".create-name") as HTMLInputElement).value;
        const color = (document.querySelector(".create-color") as HTMLInputElement).value;
        createCar({ name: name, color: color }).then((car) => {
          getCars().then((cars) => {
            const idArray: number[] = [];
            cars.items.forEach((car: CarType) => {
              idArray.push(car.id);
            });
            if (idArray.includes(car.id)) {
              new Car(car);
            }
            document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
          });
        });
      } else if (target.className === "update-confirm" && document.querySelector(`.active`)) {
        const element = document.querySelector(`.active`) as HTMLElement;
        const name = (document.querySelector(".update-name") as HTMLInputElement).value;
        const color = (document.querySelector(".update-color") as HTMLInputElement).value;
        updateCar(+element.dataset.num, {
          name: name,
          color: color,
        });
        const title = element.querySelector("h3");
        title.innerHTML = name;
        const img = element.querySelector(".car-pic") as HTMLImageElement;
        img.style.backgroundColor = color;
        element.classList.remove("active");
        (document.querySelector(".update-name") as HTMLInputElement).value = "";
        (document.querySelector(".update-color") as HTMLInputElement).value = "#000000";
      } else if (target.className === "race") {
        getCars().then((cars) => {
          console.log(cars);
          cars.items.forEach((car: CarType) => {
            const id = car.id;
            drive(id);
          });
        });
      } else if (target.className === "reset") {
        getCars().then((cars) => {
          cars.items.forEach((car: CarType) => {
            const id = car.id;
            stopCar(id);
          });
        });
      }
    });
  }
  async generateCars(amount: number) {
    let i = 0;
    while (i < amount) {
      i++;
      await createCar({ name: getRandomName(), color: getRandomColor() });
    }
  }
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
