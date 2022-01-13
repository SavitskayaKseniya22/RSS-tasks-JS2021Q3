import { getRandomName, getRandomColor } from "./utils";
import { createCar, deleteCar, getAllCars, updateCar, getCars } from "./api";
import { Car, CarType } from "./car";

export class ControlPanel {
  carContainer: HTMLElement;
  constructor(container: HTMLElement) {
    this.carContainer = document.querySelector(".cars-container");
    container.innerHTML += this.printControlPanel();

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      if (target.className === "generate") {
        let i = 0;
        while (i < 100) {
          i++;
          createCar({ name: getRandomName(), color: getRandomColor() }).then(() => {});
        }
      } else if (target.className === "remove-all") {
        getAllCars().then((value) => {
          value.forEach((element: CarType) => {
            deleteCar(element.id);
          });
        });
        document.querySelector(".page-number").innerHTML = `page 1`;
        this.carContainer.innerHTML = "";
      } else if (target.className === "create-confirm") {
        const name = (document.querySelector(".create-name") as HTMLInputElement).value;
        const color = (document.querySelector(".create-color") as HTMLInputElement).value;
        createCar({ name: name, color: color }).then(() => {
          /*
          const savedCount = window.localStorage.getItem("activeCarPage");
          getCars(+savedCount).then((cars) => {
            cars.items.forEach((car: CarType) => {
              new Car(car);
            });
          });*/
          getCars().then((cars) => {
            //переписать
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
      }
    });
  }
  printControlPanel() {
    return `<div class="control-panel">
    <div class="create">
      <input class="create-name" type="text" />
      <input class="create-color" type="color" />
      <button class="create-confirm">Create</button>
    </div>
    <div class="update">
      <input class="update-name" type="text" />
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
