import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { Navigation } from "./navigation";
import { getAllCars } from "./api";
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
      this.header.innerHTML += "<h2>garage</h2>";
      this.controlPanel = new ControlPanel(this.header, this.main);

      this.printCars();
      (document.querySelector("input.to-garage") as HTMLInputElement).checked = true;
    } else {
      this.header.innerHTML += "<h2>winners</h2>";
      (document.querySelector("input.to-winners") as HTMLInputElement).checked = true;
    }
  }
  printCars() {
    getAllCars().then((value: CarType[]) => {
      value.forEach((element) => {
        this.main.innerHTML = new Car(element).renderCar() + this.main.innerHTML;
      });
    });
  }
}
