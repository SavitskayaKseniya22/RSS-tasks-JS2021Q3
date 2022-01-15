import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { getCars, getWinner, getWinners } from "./api";
import { Car, CarType } from "./car";
import { Pagination } from "./pagination";
import { Winners } from "./winners";

export class Page {
  structure: Structure;
  controlPanel: ControlPanel;
  body: HTMLBodyElement;
  header: HTMLElement;
  main: HTMLElement;
  pagination: Pagination;
  activeGaragePage: string;
  activePage: string;
  winners: Winners;
  activeWinnersPage: string;

  constructor(activePage = "garage", activeGaragePage = "1", activeWinnersPage = "1") {
    this.body = document.querySelector("body");
    this.structure = new Structure();
    this.pagination = new Pagination();
    this.controlPanel = new ControlPanel();
    this.winners = new Winners();
    this.activeGaragePage = activeGaragePage;
    this.activePage = activePage;
    this.activeWinnersPage = activeWinnersPage;
  }
  printCars() {
    getCars().then((cars) => {
      this.header.innerHTML += `<h2 class="cars-count">garage(${cars.count})</h2>`;
      cars.items.forEach((car: CarType) => {
        new Car(car);
      });
    });
  }
  printWinnersCount() {
    getWinners().then((cars) => {
      this.header.innerHTML += `<h2 class="winners-count">winners(${cars.count})</h2>`;
    });
  }
  printGarage() {
    window.localStorage.getItem("activeGaragePage")
      ? (this.activeGaragePage = window.localStorage.getItem("activeGaragePage"))
      : window.localStorage.setItem("activeGaragePage", this.activeGaragePage);

    this.main.innerHTML += `<h3 class="page-number">page ${this.activeGaragePage}</h3>`;
    this.main.innerHTML += `<div class="race-result"></div>`;
    this.header.innerHTML += this.controlPanel.printControlPanel();
    this.printCars();
  }
  printWinners() {
    window.localStorage.getItem("activeWinnersPage")
      ? (this.activeWinnersPage = window.localStorage.getItem("activeWinnersPage"))
      : window.localStorage.setItem("activeWinnersPage", this.activeWinnersPage);

    this.main.innerHTML += `<h3 class="page-number">page ${this.activeWinnersPage}</h3>`;
    document.querySelector(".container").innerHTML += this.winners.printTable();
    this.winners.makeTableTr();
    this.printWinnersCount();
  }
  updatePage() {
    window.localStorage.getItem("activePage")
      ? (this.activePage = window.localStorage.getItem("activePage"))
      : window.localStorage.setItem("activePage", this.activePage);

    this.body.innerHTML = this.structure.printStructure();
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");

    if (this.activePage === "garage") {
      this.printGarage();
    } else {
      this.printWinners();
    }
    this.main.innerHTML += this.pagination.printPagination();
    (document.querySelector(`input.to-${this.activePage}`) as HTMLInputElement).checked = true;
  }
}
