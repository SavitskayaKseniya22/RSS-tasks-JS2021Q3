import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { getCars } from "./api";
import { Car, CarType } from "./car";
import { Pagination } from "./pagination";

export class Page {
  structure: Structure;
  controlPanel: ControlPanel;
  body: HTMLBodyElement;
  header: HTMLElement;
  main: HTMLElement;
  pagination: Pagination;
  activeCarPage: string;
  activePage: string;

  constructor(activePage = "garage", activeCarPage = "1") {
    this.body = document.querySelector("body");
    this.structure = new Structure(this.body);
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");
    this.activeCarPage = activeCarPage;
    this.activePage = activePage;

    window.localStorage.getItem("activeCarPage")
      ? (this.activeCarPage = window.localStorage.getItem("activeCarPage"))
      : window.localStorage.setItem("activeCarPage", this.activeCarPage);

    window.localStorage.getItem("activePage")
      ? (this.activePage = window.localStorage.getItem("activePage"))
      : window.localStorage.setItem("activePage", this.activePage);

    if (this.activePage === "garage") {
      this.printGarage();
    } else {
      this.printWinners();
    }
  }
  printCars() {
    getCars().then((cars) => {
      this.header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
  }
  printGarage() {
    this.main.innerHTML += `<h3 class="page-number">page ${this.activeCarPage}</h3>`;
    this.pagination = new Pagination(this.main);
    this.controlPanel = new ControlPanel(this.header);
    this.printCars();
    (document.querySelector("input.to-garage") as HTMLInputElement).checked = true;
  }
  printWinners() {
    this.header.innerHTML += "<h2>winners</h2>";
    (document.querySelector("input.to-winners") as HTMLInputElement).checked = true;
  }
}
