import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useCars } from "./use-cars";
import * as carsApi from "@/lib/api/cars-api";

vi.mock("@/lib/api/cars-api");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("useCars", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches cars successfully", async () => {
    const mockCars = [
      {
        id: "1",
        slug: "test",
        name: "Test Car",
        model: "X",
        year: 2024,
        image: "/x.jpg",
        description: "Test",
      },
    ];
    vi.mocked(carsApi.getAll).mockResolvedValue({
      data: mockCars,
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    });

    const { result } = renderHook(() => useCars(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockCars);
    expect(carsApi.getAll).toHaveBeenCalledOnce();
  });

  it("handles fetch error", async () => {
    vi.mocked(carsApi.getAll).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useCars(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
