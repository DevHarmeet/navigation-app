import { renderHook } from "@testing-library/react";
import useSubmenuPosition from "../../hooks/useSubmenuPosition";

describe("useSubmenuPosition", () => {
  const mockSubmenuRef = {
    current: {
      style: {} as CSSStyleDeclaration,
      getBoundingClientRect: () => ({
        width: 200,
        height: 300,
        top: 0,
        left: 0,
        right: 200,
        bottom: 300,
        x: 0,
        y: 0,
        toJSON: () => {},
      }),
    },
  };

  const baseGetBoundingClientRect = () => ({
    width: 100,
    height: 50,
    top: 0,
    left: 800,
    right: 900,
    bottom: 50,
    x: 800,
    y: 0,
    toJSON: () => {},
  });

  const mockParentRef = {
    current: {
      getBoundingClientRect: baseGetBoundingClientRect,
    },
  };

  beforeEach(() => {
    global.innerWidth = 1024;
    mockSubmenuRef.current.style = {} as CSSStyleDeclaration;
    mockParentRef.current.getBoundingClientRect = baseGetBoundingClientRect;
  });

  it("should not adjust position when submenu fits on screen", () => {
    mockParentRef.current.getBoundingClientRect = () => ({
      ...baseGetBoundingClientRect(),
      left: 400,
    });

    renderHook(() =>
      useSubmenuPosition({
        submenuRef: mockSubmenuRef as any,
        parentRef: mockParentRef as any,
        isActive: true,
      })
    );

    expect(mockSubmenuRef.current.style.left).toBeUndefined();
    expect(mockSubmenuRef.current.style.right).toBeUndefined();
  });

  it("should adjust position when submenu would go off-screen right", () => {
    mockParentRef.current.getBoundingClientRect = () => ({
      ...baseGetBoundingClientRect(),
      left: window.innerWidth - 100,
    });

    renderHook(() =>
      useSubmenuPosition({
        submenuRef: mockSubmenuRef as any,
        parentRef: mockParentRef as any,
        isActive: true,
      })
    );

    expect(mockSubmenuRef.current.style.left).toBe("auto");
    expect(mockSubmenuRef.current.style.right).toBe("0");
  });

  it("should not make adjustments when not active", () => {
    renderHook(() =>
      useSubmenuPosition({
        submenuRef: mockSubmenuRef as any,
        parentRef: mockParentRef as any,
        isActive: false,
      })
    );

    expect(mockSubmenuRef.current.style.left).toBeUndefined();
    expect(mockSubmenuRef.current.style.right).toBeUndefined();
  });
});
