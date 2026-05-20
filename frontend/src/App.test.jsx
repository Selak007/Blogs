import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import App from "./App.jsx";

const BLOGS_ROUTE = "/blogs";

describe("App", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  const pushBlogsRoute = () => {
    window.history.pushState({}, "Blogs", BLOGS_ROUTE);
  };

  it("toggles dark mode class and persists preference", async () => {
    fetch.mockResolvedValue({ json: () => Promise.resolve([]) });

    render(<App />);
    const toggleButton = screen.getByRole("button", { name: /toggle dark mode/i });
    const user = userEvent.setup();

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(toggleButton);
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
    expect(window.localStorage.getItem("theme")).toBe("dark");

    await user.click(toggleButton);
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(false));
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("shows loading state while blogs request is in-flight", async () => {
    pushBlogsRoute();
    let resolveFetch;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    fetch.mockReturnValue(fetchPromise);

    render(<App />);

    expect(screen.getByText(/loading blogs/i)).toBeInTheDocument();

    resolveFetch({ json: () => Promise.resolve([]) });

    await screen.findByRole("heading", { level: 1, name: /latest blogs/i });
  });

  it("renders blogs returned from the API (success state)", async () => {
    pushBlogsRoute();
    const mockBlogs = [
      { title: "Otter Adventures", content: "Otters love to play." },
      { title: "Parrot Stories", content: "Parrots mimic sounds." },
    ];
    fetch.mockResolvedValue({ json: () => Promise.resolve(mockBlogs) });

    render(<App />);

    expect(await screen.findByText("Otter Adventures")).toBeInTheDocument();
    expect(screen.getByText("Parrot Stories")).toBeInTheDocument();
    expect(screen.queryByText(/loading blogs/i)).not.toBeInTheDocument();
  });

  it("handles an empty blogs response (empty state)", async () => {
    pushBlogsRoute();
    fetch.mockResolvedValue({ json: () => Promise.resolve([]) });

    render(<App />);

    await screen.findByRole("heading", { level: 1, name: /latest blogs/i });
    await waitFor(() => {
      expect(screen.queryAllByRole("heading", { level: 3 })).toHaveLength(0);
    });
  });

  it("falls back to default content when the blogs request fails (error state)", async () => {
    pushBlogsRoute();
    fetch.mockRejectedValue(new Error("Network error"));

    render(<App />);

    expect(await screen.findByText("All About Cats")).toBeInTheDocument();
    expect(screen.getByText("All About Dogs")).toBeInTheDocument();
  });
});
