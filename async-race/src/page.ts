import { Structure } from "./structure";
import { ControlPanel } from "./controlPanel";
import { Pagination } from "./pagination";
import { Winners } from "./winners";
import { Garage } from "./garage";

export class Page {
  structure: Structure;
  controlPanel: ControlPanel;
  body: HTMLBodyElement;
  header: HTMLElement;
  main: HTMLElement;
  pagination: Pagination;
  activePage: string;
  winners: Winners;
  garage: Garage;

  constructor(activePage = "garage") {
    this.body = document.querySelector("body");
    this.structure = new Structure();
    this.controlPanel = new ControlPanel();
    this.winners = new Winners();
    this.garage = new Garage();
    this.pagination = new Pagination(this.winners);
    this.activePage = activePage;
  }

  updatePage() {
    window.localStorage.getItem("activePage")
      ? (this.activePage = window.localStorage.getItem("activePage"))
      : window.localStorage.setItem("activePage", this.activePage);

    this.body.innerHTML = this.structure.printStructure();
    this.main = document.querySelector(".main");
    this.header = document.querySelector(".header");

    if (this.activePage === "garage") {
      this.garage.printGarage(this.main, this.header);
      this.header.innerHTML += this.controlPanel.printControlPanel();
    } else {
      this.winners.printWinners(this.main, this.header);
    }
    this.main.innerHTML += this.pagination.printPagination();
    (document.querySelector(`input.to-${this.activePage}`) as HTMLInputElement).checked = true;
  }
}
