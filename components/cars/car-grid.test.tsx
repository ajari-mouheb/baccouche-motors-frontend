import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { CarGrid } from "./car-grid";
import type { Car } from "@/lib/types";

const mockCars: Car[] = [
  {
    id: "1",
    slug: "bmw-serie-3",
    name: "BMW Série 3",
    model: "320i",
    year: 2024,
    price: "Sur demande",
    image: "/test.jpg",
    description: "Test car",
  },
  {
    id: "2",
    slug: "bmw-serie-5",
    name: "BMW Série 5",
    model: "520i",
    year: 2024,
    image: "/test2.jpg",
    description: "Test car 2",
  },
];

describe("CarGrid", () => {
  it("renders car cards", () => {
    render(<CarGrid cars={mockCars} />);
    expect(screen.getByText("BMW Série 3")).toBeInTheDocument();
    expect(screen.getByText("BMW Série 5")).toBeInTheDocument();
  });

  it("renders empty state when no cars", () => {
    render(<CarGrid cars={[]} />);
    expect(screen.queryByText("BMW Série 3")).not.toBeInTheDocument();
  });

  it("renders links to car details", () => {
    render(<CarGrid cars={mockCars} />);
    const links = screen.getAllByRole("link", { name: /Voir les détails/i });
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/cars/bmw-serie-3");
  });
});
