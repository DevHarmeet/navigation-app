import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import menuItems from "../../../constants/menuItems";

jest.mock("../../../hooks/useScrollProgress", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(0),
}));

jest.useFakeTimers();

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    global.innerWidth = 1024;
  });

  it("renders navbar with logo and menu items", () => {
    renderWithRouter(<Navbar />);

    expect(screen.getByText("NavbarApp")).toBeInTheDocument();
    menuItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("handles mobile menu toggle", () => {
    global.innerWidth = 500;
    renderWithRouter(<Navbar />);

    const menuButton = screen.getByLabelText("Toggle menu");
    expect(screen.getByRole("list")).not.toHaveClass("open");

    fireEvent.click(menuButton);
    expect(screen.getByRole("list")).toHaveClass("open");

    fireEvent.click(menuButton);
    expect(screen.getByRole("list")).not.toHaveClass("open");
  });

  it("applies scroll classes based on scroll progress", () => {
    const useScrollProgress =
      require("../../../hooks/useScrollProgress").default;

    // Initial render with no scroll
    useScrollProgress.mockReturnValue(0);
    const { rerender } = renderWithRouter(<Navbar />);
    expect(screen.getByRole("navigation")).not.toHaveClass("scrolled");

    // Rerender with scroll
    useScrollProgress.mockReturnValue(0.2);
    rerender(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toHaveClass("scrolled");
  });

  it("renders all menu items with correct links", () => {
    renderWithRouter(<Navbar />);

    menuItems.forEach((item) => {
      if (item.href) {
        const link = screen.getByRole("link", { name: new RegExp(item.label) });
        expect(link).toHaveAttribute("href", item.href);
      }
    });
  });

  it("applies correct CSS variables for scroll progress", () => {
    const useScrollProgress =
      require("../../../hooks/useScrollProgress").default;
    useScrollProgress.mockReturnValue(0.5);

    renderWithRouter(<Navbar />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toHaveStyle("--scroll-progress: 0.5");
  });

  describe("Mobile Responsiveness", () => {
    beforeEach(() => {
      global.innerWidth = 500;
    });

    it("shows hamburger menu on mobile", () => {
      renderWithRouter(<Navbar />);
      expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
    });

    it("toggles menu visibility correctly", () => {
      renderWithRouter(<Navbar />);
      const button = screen.getByLabelText("Toggle menu");
      const menu = screen.getByRole("list");

      expect(menu).not.toHaveClass("open");
      fireEvent.click(button);
      expect(menu).toHaveClass("open");
      expect(button).toHaveClass("open");
    });

    it("closes mobile menu when clicking outside", () => {
      // Ensure we're in mobile mode
      global.innerWidth = 500;

      renderWithRouter(
        <div>
          <Navbar />
          <div data-testid="outside">Outside</div>
        </div>
      );

      const button = screen.getByLabelText("Toggle menu");
      const menu = screen.getByRole("list");

      // First open the menu
      act(() => {
        fireEvent.click(button);
        jest.runAllTimers();
      });
      expect(menu).toHaveClass("open");

      // Then click outside
      act(() => {
        // Simulate a complete click outside event
        document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        jest.runAllTimers();
      });
      expect(menu).not.toHaveClass("open");
    });
  });
});
