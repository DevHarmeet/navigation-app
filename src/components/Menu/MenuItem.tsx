import React, { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import Submenu from "./Submenu";
import { MenuItemProps } from "../../types/types";
import { useLocation, Link } from "react-router-dom";
import useResizeEffect from "../../hooks/useResizeEffect";
import useMenuState from "../../hooks/useMenuState";
import getIconComponent from "../../utils/iconMapper";

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  isScrolled,
  onMobileMenuClose,
  isMenuOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const isActive =
    item.href === location.pathname ||
    item.submenu?.some((subItem) => subItem.href === location.pathname);

  useResizeEffect(setIsMobile, setIsHovered);
  useMenuState({
    isMobile,
    isHovered,
    isMenuOpen,
    setIsHovered,
  });

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile && item.submenu) {
      e.preventDefault();
      setIsHovered(!isHovered);
    } else if (isMobile && item.href) {
      onMobileMenuClose?.();
    }
  };

  return (
    <li
      ref={itemRef}
      className={`navbar-item ${isActive ? "active" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="menuitem"
      aria-haspopup={!!item.submenu}
      aria-expanded={isHovered}
      tabIndex={0}
    >
      {item.submenu ? (
        <span
          className="nav-link"
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) {
              setIsHovered(!isHovered);
            }
          }}
          aria-label={`${item.label} menu`}
        >
          {item.icon && (
            <span className="icon" aria-hidden="true">
              {getIconComponent(item.icon)}
            </span>
          )}
          <span className="label">{item.label}</span>
          <FiChevronDown
            className={`submenu-indicator ${isHovered ? "rotated" : ""}`}
            aria-hidden="true"
          />
        </span>
      ) : (
        <Link
          to={item.href || "#"}
          className="nav-link"
          onClick={() => {
            if (isMobile && item.href) {
              onMobileMenuClose?.();
            }
          }}
          aria-label={item.label}
        >
          {item.icon && (
            <span className="icon" aria-hidden="true">
              {getIconComponent(item.icon)}
            </span>
          )}
          <span className="label">{item.label}</span>
        </Link>
      )}
      {item.submenu && (
        <Submenu
          items={item.submenu}
          isActive={isHovered}
          isScrolled={isScrolled}
          parentRef={itemRef}
          id={`submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
          onMobileMenuClose={onMobileMenuClose}
          setParentHovered={setIsHovered}
        />
      )}
    </li>
  );
};

export default MenuItem;
