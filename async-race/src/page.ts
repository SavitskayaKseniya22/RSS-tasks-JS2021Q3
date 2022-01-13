import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { Navigation } from "./navigation";
import { getCars } from "./api";
import { Car, CarType } from "./car";
import { Pagination } from "./pagination";

export class Page {
  structure: Structure;
  controlPanel: ControlPanel;
  navigation: Navigation;
  body: HTMLBodyElement;
  header: HTMLElement;
  main: HTMLElement;
  pagination: Pagination;
  activeCarPage: string;
  constructor(activePage = "garage", activeCarPage = "1") {
    this.body = document.querySelector("body");
    this.structure = new Structure(this.body);
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");
    this.navigation = new Navigation(this.header);
    this.activeCarPage = activeCarPage;

    window.localStorage.getItem("activeCarPage")
      ? (this.activeCarPage = window.localStorage.getItem("activeCarPage"))
      : window.localStorage.setItem("activeCarPage", this.activeCarPage);

    if (activePage === "garage") {
      this.main.innerHTML = `<h3 class="page-number">page ${this.activeCarPage}</h3>` + this.main.innerHTML;
      this.pagination = new Pagination(this.main);
      this.controlPanel = new ControlPanel(this.header);

      this.printCars();
      (document.querySelector("input.to-garage") as HTMLInputElement).checked = true;
      getCars().then((cars) => {
        this.header.innerHTML = `<h2 class="cars-count">garage(${cars.count})</h2>` + this.header.innerHTML;
      });
    } else {
      this.header.innerHTML = "<h2>winners</h2>" + this.header.innerHTML;
      (document.querySelector("input.to-winners") as HTMLInputElement).checked = true;
    }
  }
  printCars() {
    getCars(+this.activeCarPage).then((cars) => {
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
  }
}
