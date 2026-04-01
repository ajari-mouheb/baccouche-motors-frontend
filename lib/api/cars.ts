import type { Car } from "@/lib/data/cars";
import { cars as initialCars } from "@/lib/data/cars";

const carsData: Car[] = [...initialCars];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchCars(): Promise<Car[]> {
  await delay(300);
  return [...carsData];
}

export async function fetchCarBySlug(slug: string): Promise<Car | undefined> {
  await delay(200);
  return carsData.find((c) => c.slug === slug);
}

export async function createCar(
  data: Omit<Car, "id" | "slug">
): Promise<Car> {
  await delay(400);
  const slug =
    `${data.name}-${data.model}`.toLowerCase().replace(/\s+/g, "-") +
    `-${Date.now().toString(36)}`;
  const id = (carsData.length + 1).toString();
  const car: Car = { ...data, id, slug };
  carsData.push(car);
  return car;
}

export async function updateCar(id: string, data: Partial<Car>): Promise<Car | null> {
  await delay(400);
  const idx = carsData.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  carsData[idx] = { ...carsData[idx], ...data };
  return carsData[idx];
}

export async function deleteCar(id: string): Promise<boolean> {
  await delay(300);
  const idx = carsData.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  carsData.splice(idx, 1);
  return true;
}
