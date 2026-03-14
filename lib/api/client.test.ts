import { describe, it, expect, vi, beforeEach } from "vitest";
import { getStoredToken, setStoredToken } from "./client";

describe("API Client", () => {
  beforeEach(() => {
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  describe("getStoredToken", () => {
    it("returns null when no token in storage", () => {
      vi.mocked(sessionStorage.getItem).mockReturnValue(null);
      expect(getStoredToken()).toBeNull();
    });

    it("returns token from sessionStorage", () => {
      vi.mocked(sessionStorage.getItem).mockReturnValue("test-token-123");
      expect(getStoredToken()).toBe("test-token-123");
    });
  });

  describe("setStoredToken", () => {
    it("stores token when provided", () => {
      setStoredToken("new-token");
      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "baccouche-auth-token",
        "new-token"
      );
    });

    it("removes token when null", () => {
      setStoredToken(null);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith("baccouche-auth-token");
    });
  });
});
