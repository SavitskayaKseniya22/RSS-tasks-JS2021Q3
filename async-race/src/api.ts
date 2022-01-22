import { CarsResponse, RaceSettingsTypes, CarType, WinnersResponse, WinnerType } from "./types";

export class ApiService {
  constructor() {}

  async getAllCars() {
    const response = await fetch("http://127.0.0.1:3000/garage");
    const allCars = (await response.json()) as CarType[];
    return allCars;
  }

  async createCar(data = {}) {
    const response = await fetch("http://127.0.0.1:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const car = (await response.json()) as CarType;
    return car;
  }

  async deleteCar(id: number) {
    await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "DELETE",
    });
  }

  async deleteWinner(id: number) {
    await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "DELETE",
    });
  }

  async changeDriveMode(id: number, status: "started" | "stopped" | "drive") {
    const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
      method: "PATCH",
    });
    const car = await response.json();
    return car;
  }

  async getCar(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "GET",
    });
    const car = (await response.json()) as CarType;
    return car;
  }

  async updateCar(id: number, data = {}) {
    const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const car = (await response.json()) as CarType;
    return car;
  }

  async getCars(page = 1, limit = 7) {
    const currentPage =
      (JSON.parse(window.localStorage.getItem("raceSettings")) as RaceSettingsTypes).activeGaragePage || page;
    const response = await fetch(`http://127.0.0.1:3000/garage?_page=${currentPage}&_limit=${limit}`, {
      method: "GET",
    });
    return {
      items: await response.json(),
      count: response.headers.get("X-Total-Count"),
      pageNumber: currentPage,
    } as CarsResponse;
  }

  async getWinners(page = 1, limit = 10, sort = "id" || "wins" || "time", order = "ASC" || "DESC") {
    const raceSettings = JSON.parse(window.localStorage.getItem("raceSettings")) as RaceSettingsTypes;
    const currentPage = +raceSettings.activeWinnersPage || page;
    const currentSort = raceSettings.sort || sort;
    const currentOrder = raceSettings.order || order;
    const response = await fetch(
      `http://127.0.0.1:3000/winners?_page=${currentPage}&_limit=${limit}&_sort=${currentSort}&_order=${currentOrder}`,
      {
        method: "GET",
      },
    );

    return {
      items: await response.json(),
      count: response.headers.get("X-Total-Count"),
      pageNumber: currentPage,
      sort: currentSort,
      order: currentOrder,
    } as WinnersResponse;
  }

  async createWinner(data = {}) {
    const response = await fetch(`http://127.0.0.1:3000/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const car = (await response.json()) as WinnerType;
    return car;
  }

  async updateWinner(id: number, data = {}) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const car = (await response.json()) as WinnerType;
    return car;
  }

  async getWinner(id: number) {
    const response = await fetch(`http://127.0.0.1:3000/winners/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const car = (await response.json()) as WinnerType;
      return car;
    } else {
      throw new Error("error");
    }
  }
}

export const apiService = new ApiService();
