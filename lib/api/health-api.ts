import { api } from "./client";

export async function healthRoot(): Promise<void> {
  await api.get("/");
}

export async function healthApi(): Promise<void> {
  await api.get("/api");
}
