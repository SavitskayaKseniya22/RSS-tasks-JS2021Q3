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

export async function startEngine(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=started`, {
    method: "PATCH",
  });
  const car = await response.json();
  return car;
}
export async function stopEngine(id: number) {
  const response = await fetch(`http://127.0.0.1:3000/engine?id=${id}&status=stopped`, {
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
  const response = await fetch(`http://127.0.0.1:3000/garage?_page=${page}&_limit=${limit}`, {
    method: "GET",
  });

  return {
    items: await response.json(),
    count: response.headers.get("X-Total-Count"),
  };
}
