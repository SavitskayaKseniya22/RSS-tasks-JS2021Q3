import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { Navigation } from "./navigation";
import { getCars } from "./api";
import { Car, CarType } from "./car";

export class Page {
  structure: Structure;
  controlPanel: ControlPanel;
  navigation: Navigation;
  body: HTMLBodyElement;
  main: HTMLElement;
  header: HTMLElement;
  constructor(activePage = "garage") {
    this.body = document.querySelector("body");
    this.structure = new Structure(this.body);
    this.main = document.querySelector("main");
    this.header = document.querySelector("header");
    this.navigation = new Navigation(this.header);
    if (activePage == "garage") {
      this.controlPanel = new ControlPanel(this.header, this.main);
      this.printCars();

      (document.querySelector("input.to-garage") as HTMLInputElement).checked = true;

      getCars().then((cars) => {
        console.log(cars);
        this.header.innerHTML = `<h2>garage(${cars.count})</h2>` + this.header.innerHTML;
      });
    } else {
      this.header.innerHTML = "<h2>winners</h2>" + this.header.innerHTML;
      (document.querySelector("input.to-winners") as HTMLInputElement).checked = true;
    }
  }
  printCars() {
    getCars().then((cars) => {
      cars.items.forEach((car: CarType) => {
        this.main.innerHTML = new Car(car).renderCar() + this.main.innerHTML;
      });
    });
  }
}
