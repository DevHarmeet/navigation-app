import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Submenu from "../../../components/Menu/Submenu";

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("Submenu", () => {
  const mockItems = [
    { label: "Item 1", href: "/item1", icon: "FiHome" },
    { label: "Item 2", href: "/item2" },
  ];

  const mockParentRef = {
    current: document.createElement("li"),
  };

  it("renders submenu items correctly", () => {
    renderWithRouter(
      <Submenu
        items={mockItems}
        isActive={true}
        isScrolled={false}
        parentRef={mockParentRef}
        id="test-submenu"
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies correct visibility based on isActive prop", () => {
    const { rerender } = renderWithRouter(
      <Submenu
        items={mockItems}
        isActive={false}
        isScrolled={false}
        parentRef={mockParentRef}
        id="test-submenu"
      />
    );

    expect(screen.getByRole("menu", { hidden: true })).not.toHaveClass(
      "active"
    );

    rerender(
      <MemoryRouter>
        <Submenu
          items={mockItems}
          isActive={true}
          isScrolled={false}
          parentRef={mockParentRef}
          id="test-submenu"
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("menu")).toHaveClass("active");
  });

  it("applies correct accessibility attributes", () => {
    renderWithRouter(
      <Submenu
        items={mockItems}
        isActive={true}
        isScrolled={false}
        parentRef={mockParentRef}
        id="test-submenu"
      />
    );

    const submenu = screen.getByRole("menu");
    expect(submenu).toHaveAttribute("aria-hidden", "false");

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems).toHaveLength(2);

    // Check tabindex on links
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("tabindex", "0");
    });
  });

  it("handles scrolled state correctly", () => {
    renderWithRouter(
      <Submenu
        items={mockItems}
        isActive={true}
        isScrolled={true}
        parentRef={mockParentRef}
        id="test-submenu"
      />
    );

    expect(screen.getByRole("menu")).toHaveClass("scrolled");
  });

  it("handles mobile menu close and navigation", () => {
    const onMobileMenuClose = jest.fn();
    global.innerWidth = 500;

    renderWithRouter(
      <Submenu
        items={mockItems}
        isActive={true}
        isScrolled={false}
        parentRef={mockParentRef}
        id="test-submenu"
        onMobileMenuClose={onMobileMenuClose}
      />
    );

    fireEvent.click(screen.getAllByRole("link")[0]);
    expect(onMobileMenuClose).toHaveBeenCalled();
  });

  it("positions submenu correctly", () => {
    const { rerender } = renderWithRouter(
      <Submenu
        items={mockItems}
        isActive={true}
        isScrolled={false}
        parentRef={mockParentRef}
        id="test-submenu"
      />
    );

    // Test different positions
    mockParentRef.current.getBoundingClientRect = () => ({
      right: window.innerWidth - 100,
      width: 200,
      left: window.innerWidth - 300,
      top: 0,
      bottom: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    rerender(
      <MemoryRouter>
        <Submenu
          items={mockItems}
          isActive={true}
          isScrolled={false}
          parentRef={mockParentRef}
          id="test-submenu"
        />
      </MemoryRouter>
    );
  });
});
