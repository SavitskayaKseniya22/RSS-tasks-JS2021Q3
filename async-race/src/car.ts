import { deleteCar, startEngine, stopEngine, getCar, getCars } from "./api";
import { getID } from "./utils";
export interface CarType {
  name: string;
  color: string;
  id: number;
}

export class Car {
  name: string;
  color: string;
  id: number;
  carContainer: HTMLElement;
  constructor(carItem: CarType) {
    this.name = carItem.name;
    this.color = carItem.color;
    this.id = carItem.id;
    this.carContainer = document.querySelector(".cars-container");
    this.carContainer.innerHTML += this.renderCar();
  }
  renderCar() {
    return `<li class="car" data-num=${this.id}>
    <h3>${this.name}</h3>
    <ul class="buttons-container">
      <li><button class="selectCar">Select</button></li>
      <li><button class="removeCar">Remove</button></li>

    <li>
    <input type="radio" id="start-engine${this.id}" name="engine${this.id}" value="start" class="startEngine" />
    <label for="start-engine${this.id}">Start engine</label>
    </li>

    <li>
    <input type="radio" id="stop-engine${this.id}" name="engine${this.id}" value="stop" class="stopEngine" />
    <label for="stop-engine${this.id}">Stop engine</label>
    </li>

    </ul>
    <div class="track">
      <img src="./images/car.svg" alt="car" class="car-pic" style="background-color:${this.color}"  />
      <img src="./images/banner.svg" alt="banner" class="banner-pic" />
    </div>
  </li>`;
  }
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLButtonElement;

  if (target.className === "removeCar") {
    const id = getID(target);
    deleteCar(id).then(() => {
      getCars(+window.localStorage.getItem("activeCarPage") || 1).then((cars) => {
        document.querySelector(".cars-container").innerHTML = "";
        document.querySelector(".cars-count").innerHTML = `garage(${cars.count})`;
        cars.items.forEach((car: CarType) => {
          new Car(car);
        });
      });
    });
  } else if (target.className === "startEngine") {
    const id = getID(target);
    startEngine(id);
  } else if (target.className === "stopEngine") {
    const id = getID(target);
    stopEngine(id);
  } else if (target.className === "selectCar") {
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
  }
});
