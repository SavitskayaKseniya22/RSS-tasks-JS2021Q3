import { deleteCar, startEngine, stopEngine, getCar, updateCar } from "./api";
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
  constructor(carItem: CarType) {
    this.name = carItem.name;
    this.color = carItem.color;
    this.id = carItem.id;

    document.addEventListener("click", function (e) {
      const target = e.target as HTMLButtonElement;
      if (target.className === "removeCar") {
        const id = getID(target);
        deleteCar(id);
        const parent = target.closest(".car") as HTMLElement;
        parent.remove();
      } else if (target.className === "startEngine") {
        const id = getID(target);
        startEngine(id);
      } else if (target.className === "stopEngine") {
        const id = getID(target);
        stopEngine(id);
      } else if (target.className === "selectCar") {
        const id = getID(target);
        console.log(id);

        getCar(id).then((value) => {
          (document.querySelector(".update-name") as HTMLInputElement).value = value.name;
          (document.querySelector(".update-color") as HTMLInputElement).value = value.color;
          document.addEventListener("click", function (e) {
            if ((e.target as HTMLElement).className === "update-confirm") {
              updateCar(id, {
                name: (document.querySelector(".update-name") as HTMLInputElement).value,
                color: (document.querySelector(".update-color") as HTMLInputElement).value,
              });
              const element = document.querySelector(`[data-num="${id}"]`) as HTMLInputElement;
              const title = element.querySelector("h3");
              title.innerHTML = (document.querySelector(".update-name") as HTMLInputElement).value;

              const img = element.querySelector(".car-pic") as HTMLImageElement;
              img.style.backgroundColor = (document.querySelector(".update-color") as HTMLInputElement).value;
            }
          });
        });
      }
    });
  }
  renderCar() {
    return `<li class="car" data-num=${this.id}>
    <h3>${this.name}</h3>
    <ul class="buttons-container">
      <li><button class="selectCar">Select</button></li>
      <li><button class="removeCar">Remove</button></li>

    <li>
    <input type="radio" id="start-engine" name="engine" value="start" class="startEngine" />
    <label for="start-engine">Start engine</label>
    </li>

    <li>
    <input type="radio" id="stop-engine" name="engine" value="stop" class="stopEngine" />
    <label for="stop-engine">Stop engine</label>
    </li>

    </ul>
    <div class="track">
      <img src="./images/car.svg" alt="car" class="car-pic" style="background-color:${this.color}"  />
      <img src="./images/banner.svg" alt="banner" class="banner-pic" />
    </div>
  </li>`;
  }
}
