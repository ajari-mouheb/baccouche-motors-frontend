import "@testing-library/jest-dom/vitest";
import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: (props: { src?: string; alt?: string } & Record<string, unknown>) => {
    const { src, alt, ...rest } = props;
    return React.createElement("img", { src, alt: alt ?? "", ...rest });
  },
}));
