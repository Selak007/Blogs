import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("main entry point", () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = "<div id=\"root\"></div>";
  });

  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("react-dom/client");
    vi.doUnmock("./App.jsx");
  });

  it("boots the React app using createRoot", async () => {
    const renderMock = vi.fn();
    const rootMock = { render: renderMock };

    vi.doMock("react-dom/client", () => ({
      createRoot: vi.fn(() => rootMock),
    }));

    vi.doMock("./App.jsx", () => ({
      default: () => null,
    }));

    await import("./main.jsx");

    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
