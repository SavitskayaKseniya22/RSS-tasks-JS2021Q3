import { getRandomName, getRandomColor } from "./utils";

async function getAllCars() {
  const response = await fetch("http://127.0.0.1:3000/garage");
  const allCars = await response.json();
  console.log(allCars);
  return allCars;
}

async function createCar(data = {}) {
  const response = await fetch("http://127.0.0.1:3000/garage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const car = await response.json();
  return car;
}
async function deleteCar(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "DELETE",
  });
  const car = await response.json();
  return car;
}

async function startEngine(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
    method: "PATCH",
  });
  const car = await response.json();
  return car;
}
async function stopEngine(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
    method: "PATCH",
  });
  const car = await response.json();
  return car;
}

interface CarType {
  name: string;
  color: string;
  id: number;
}

class Car {
  name: string;
  color: string;
  id: number;
  constructor(carItem: CarType) {
    this.name = carItem.name;
    this.color = carItem.color;
    this.id = carItem.id;
  }
  renderCar() {
    return `<li class="car" data-num=${this.id}>
    <h3>${this.name}</h3>
    <ul class="buttons-container">
      <li><button class="selectCar">Select</button></li>
      <li><button class="removeCar">Remove</button></li>
      <li><button class="startEngine">Start</button></li>
      <li><button class="stopEngine">Stop</button></li>
    </ul>
    <div class="track">
      <img src="./images/car.svg" alt="car" class="car-pic" style="background-color:${this.color}"  />
      <img src="./images/banner.svg" alt="banner" class="banner-pic" />
    </div>
  </li>`;
  }
}
const body = document.querySelector("body");

getAllCars().then((value) => {
  value.forEach((element: CarType) => {
    body.innerHTML += new Car(element).renderCar();
  });
});

function getID(target: HTMLButtonElement) {
  const parent = target.closest(".car") as HTMLElement;
  const id = +parent.dataset.num;
  return id;
}
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
  }
});
