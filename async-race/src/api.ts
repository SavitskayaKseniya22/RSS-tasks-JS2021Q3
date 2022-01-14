export async function getAllCars() {
  const response = await fetch("http://127.0.0.1:3000/garage");
  const allCars = await response.json();
  return allCars;
}

export async function createCar(data = {}) {
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
export async function deleteCar(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "DELETE",
  });
  const car = await response.json();
  return car;
}

export async function changeDriveMode(id: number, status: "started" | "stopped" | "drive") {
  const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=${status}`, {
    method: "PATCH",
  });
  const car = await response.json();

  return car;
}

export async function getCar(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "GET",
  });
  const car = await response.json();
  return car;
}

export async function updateCar(id: number, data = {}) {
  const response = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const car = await response.json();
  return car;
}

export async function getCars(page = 1, limit = 7) {
  const currentPage = +window.localStorage.getItem("activeCarPage") || page;
  const response = await fetch(`http://127.0.0.1:3000/garage?_page=${currentPage}&_limit=${limit}`, {
    method: "GET",
  });

  return {
    items: await response.json(),
    count: response.headers.get("X-Total-Count"),
  };
}

export async function getWinners(page = 1, limit = 7, sort = "id" || "wins" || "time", order = "ASC" || "DESC") {
  const response = await fetch(
    `http://127.0.0.1:3000//winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
    {
      method: "GET",
    },
  );

  return {
    items: await response.json(),
    count: response.headers.get("X-Total-Count"),
  };
}
