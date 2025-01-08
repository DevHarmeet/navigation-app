import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuItem from "../../../components/Menu/MenuItem";

jest.useFakeTimers();

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("MenuItem", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  const mockItem = {
    label: "Test Item",
    href: "/test",
    icon: "FiHome",
  };

  const mockItemWithSubmenu = {
    label: "Test With Submenu",
    icon: "FiHome",
    submenu: [
      { label: "Sub Item 1", href: "/sub1" },
      { label: "Sub Item 2", href: "/sub2" },
    ],
  };

  it("renders basic menu item correctly", () => {
    renderWithRouter(<MenuItem item={mockItem} isScrolled={false} />);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
  });

  it("renders submenu items when hovered", () => {
    renderWithRouter(
      <MenuItem item={mockItemWithSubmenu} isScrolled={false} />
    );

    const submenu = screen.getByRole("menu", { hidden: true });
    expect(submenu).toHaveAttribute("aria-hidden", "true");

    act(() => {
      fireEvent.mouseEnter(screen.getByRole("menuitem"));
      jest.runAllTimers();
    });

    expect(submenu).toHaveAttribute("aria-hidden", "false");
  });

  it("handles mobile click correctly", () => {
    global.innerWidth = 500;
    renderWithRouter(
      <MenuItem item={mockItemWithSubmenu} isScrolled={false} />
    );

    const menuItem = screen.getByRole("menuitem");
    const submenu = screen.getByRole("menu", { hidden: true });

    act(() => {
      fireEvent.click(menuItem);
    });
    expect(submenu).toHaveAttribute("aria-hidden", "false");

    act(() => {
      fireEvent.click(menuItem);
    });
    expect(submenu).toHaveAttribute("aria-hidden", "true");
  });

  it("applies correct accessibility attributes", () => {
    renderWithRouter(
      <MenuItem item={mockItemWithSubmenu} isScrolled={false} />
    );

    const menuItem = screen.getByRole("menuitem");
    expect(menuItem).toHaveAttribute("aria-haspopup", "true");
    expect(menuItem).toHaveAttribute("aria-expanded", "false");

    global.innerWidth = 500;
    act(() => {
      fireEvent.click(menuItem);
      jest.runAllTimers();
    });
    expect(menuItem).toHaveAttribute("aria-expanded", "true");
  });

  it("handles keyboard navigation", () => {
    global.innerWidth = 1024;
    renderWithRouter(
      <MenuItem item={mockItemWithSubmenu} isScrolled={false} />
    );

    const menuItem = screen.getByRole("menuitem");
    const submenu = screen.getByRole("menu", { hidden: true });

    act(() => {
      fireEvent.keyDown(menuItem, { key: "Enter" });
      fireEvent.mouseEnter(menuItem);
      jest.runAllTimers();
    });
    expect(submenu).toHaveAttribute("aria-hidden", "false");
  });

  it("handles mouse leave correctly", () => {
    renderWithRouter(
      <MenuItem item={mockItemWithSubmenu} isScrolled={false} />
    );
    const menuItem = screen.getByRole("menuitem");
    const submenu = screen.getByRole("menu", { hidden: true });

    act(() => {
      fireEvent.mouseEnter(menuItem);
      jest.runAllTimers();
      fireEvent.mouseLeave(menuItem);
      jest.runAllTimers();
    });

    expect(submenu).toHaveAttribute("aria-hidden", "true");
  });

  it("cleans up timers on unmount", () => {
    const { unmount } = renderWithRouter(
      <MenuItem item={mockItemWithSubmenu} isScrolled={false} />
    );
    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });

  it("handles mobile menu close", () => {
    const onMobileMenuClose = jest.fn();
    global.innerWidth = 500;
    renderWithRouter(
      <MenuItem
        item={{ ...mockItem }}
        isScrolled={false}
        onMobileMenuClose={onMobileMenuClose}
      />
    );

    fireEvent.click(screen.getByRole("menuitem"));
    expect(onMobileMenuClose).toHaveBeenCalled();
  });
});
