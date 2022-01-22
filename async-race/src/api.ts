import { CarsResponse, CarType, WinnersResponse, WinnerType } from "./types";

export class ApiService {
  link: string;
  constructor() {
    this.link = "http://127.0.0.1:3000";
  }

  async getAllCars() {
    const response = await fetch(`${this.link}/garage`);
    const allCars = (await response.json()) as CarType[];
    return allCars;
  }

  async createCar(data: CarType = {}) {
    const response = await fetch(`${this.link}/garage`, {
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
    const response = await fetch(`${this.link}/garage/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }

  async deleteWinner(id: number) {
    const response = await fetch(`${this.link}/winners/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }

  async changeDriveMode(id: number, status: "started" | "stopped" | "drive") {
    const response = await fetch(`${this.link}/engine?id=${id}&status=${status}`, {
      method: "PATCH",
    });
    const car = await response.json();
    return car;
  }

  async getCar(id: number) {
    const response = await fetch(`${this.link}/garage/${id}`, {
      method: "GET",
    });
    const car = (await response.json()) as CarType;
    return car;
  }

  async updateCar(id: number, data: CarType = {}) {
    const response = await fetch(`${this.link}/garage/${id}`, {
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
    const response = await fetch(`${this.link}/garage?_page=${page}&_limit=${limit}`, {
      method: "GET",
    });
    return {
      items: await response.json(),
      count: response.headers.get("X-Total-Count"),
      pageNumber: page,
    } as CarsResponse;
  }

  async getWinners(page = 1, limit = 10, sort = "id", order = "ASC") {
    const response = await fetch(`${this.link}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
      method: "GET",
    });

    return {
      items: await response.json(),
      count: response.headers.get("X-Total-Count"),
      pageNumber: page,
      sort: sort,
      order: order,
    } as WinnersResponse;
  }

  async createWinner(data: WinnerType = {}) {
    const response = await fetch(`${this.link}/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const car = (await response.json()) as WinnerType;
    return car;
  }

  async updateWinner(id: number, data: WinnerType = {}) {
    const response = await fetch(`${this.link}/winners/${id}`, {
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
    const response = await fetch(`${this.link}/winners/${id}`, {
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
