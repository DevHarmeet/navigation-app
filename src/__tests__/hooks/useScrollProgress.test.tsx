import { renderHook, act } from "@testing-library/react";
import useScrollProgress from "../../hooks/useScrollProgress";

describe("useScrollProgress", () => {
  beforeEach(() => {
    global.scrollY = 0;
    global.innerWidth = 1024;
  });

  it("should return 0 initially", () => {
    const { result } = renderHook(() => useScrollProgress());
    expect(result.current).toBe(0);
  });

  it("should calculate scroll progress based on scroll distance", () => {
    const { result } = renderHook(() =>
      useScrollProgress({ scrollDistance: 1000 })
    );

    act(() => {
      global.scrollY = 500;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(0.5);
  });

  it("should return 0 on mobile when mobileDisabled is true", () => {
    global.innerWidth = 500;
    const { result } = renderHook(() =>
      useScrollProgress({ mobileDisabled: true })
    );

    act(() => {
      global.scrollY = 1000;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(0);
  });

  it("should not exceed 1 when scrolling past the scroll distance", () => {
    const { result } = renderHook(() =>
      useScrollProgress({ scrollDistance: 1000 })
    );

    act(() => {
      global.scrollY = 2000;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(1);
  });
});
