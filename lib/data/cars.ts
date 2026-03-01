export interface Car {
  id: string;
  slug: string;
  name: string;
  model: string;
  year: number;
  price?: string;
  image: string;
  description: string;
  specs?: Record<string, string>;
}

export const cars: Car[] = [
  {
    id: "1",
    slug: "bmw-serie-3",
    name: "BMW Série 3",
    model: "320i",
    year: 2024,
    price: "Sur demande",
    image: "/placeholder-car.svg",
    description: "La BMW Série 3 incarne l'essence du plaisir de conduire. Conçue pour ceux qui recherchent dynamisme et élégance.",
    specs: {
      "Moteur": "4 cylindres turbo",
      "Puissance": "184 ch",
      "Transmission": "Automatique 8 rapports",
    },
  },
  {
    id: "2",
    slug: "bmw-serie-5",
    name: "BMW Série 5",
    model: "520i",
    year: 2024,
    price: "Sur demande",
    image: "/placeholder-car.svg",
    description: "La berline business par excellence. Confort, technologie et performance réunis.",
    specs: {
      "Moteur": "4 cylindres turbo",
      "Puissance": "204 ch",
      "Transmission": "Automatique 8 rapports",
    },
  },
  {
    id: "3",
    slug: "bmw-x3",
    name: "BMW X3",
    model: "xDrive20d",
    year: 2024,
    price: "Sur demande",
    image: "/placeholder-car.svg",
    description: "Le SAV compact qui allie polyvalence urbaine et capacités tout-terrain.",
    specs: {
      "Moteur": "4 cylindres diesel",
      "Puissance": "190 ch",
      "Transmission": "xDrive automatique",
    },
  },
  {
    id: "4",
    slug: "bmw-x5",
    name: "BMW X5",
    model: "xDrive30d",
    year: 2024,
    price: "Sur demande",
    image: "/placeholder-car.svg",
    description: "Le SAV de luxe qui définit les standards en matière de confort et de performance.",
    specs: {
      "Moteur": "6 cylindres diesel",
      "Puissance": "265 ch",
      "Transmission": "xDrive automatique",
    },
  },
];

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}

export function getAllCarSlugs(): string[] {
  return cars.map((car) => car.slug);
}
