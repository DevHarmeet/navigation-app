import React, { useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import MenuItem from "../Menu/MenuItem";
import useScrollProgress from "../../hooks/useScrollProgress";
import useClickOutside from "../../hooks/useClickOutside";
import "./Navbar.scss";
import menuItems from "../../constants/menuItems";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const navRef = useRef<HTMLElement>(null);

  useClickOutside({
    ref: navRef,
    handler: () => setIsMenuOpen(false),
    enabled: window.innerWidth <= 768,
  });

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrollProgress > 0.1 ? "scrolled" : ""}`}
      style={
        {
          "--scroll-progress": scrollProgress,
        } as React.CSSProperties
      }
    >
      <div className="navbar-container">
        <div className="navbar-logo">NavbarApp</div>

        <div
          className={`mobile-menu-button ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FiX size={24} className="menu-icon" />
          ) : (
            <FiMenu size={24} className="menu-icon" />
          )}
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isScrolled={scrollProgress > 0.1}
              onMobileMenuClose={() => setIsMenuOpen(false)}
              isMenuOpen={isMenuOpen}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
