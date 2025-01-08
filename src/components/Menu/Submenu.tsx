import React, { useRef } from "react";
import { SubmenuProps } from "../../types/types";
import useSubmenuPosition from "../../hooks/useSubmenuPosition";
import useMobileState from "../../hooks/useMobileState";
import { useLocation, Link } from "react-router-dom";

const Submenu: React.FC<SubmenuProps> = ({
  items,
  isActive,
  isScrolled,
  parentRef,
  onMobileMenuClose,
}) => {
  const submenuRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const isMobile = useMobileState();

  useSubmenuPosition({ submenuRef, parentRef, isActive });

  return (
    <ul
      ref={submenuRef}
      className={`submenu ${isActive ? "active" : ""} ${
        isScrolled ? "scrolled" : ""
      }`}
      role="menu"
      aria-hidden={!isActive && !document.activeElement?.closest(".submenu")}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`submenu-item ${
            item.href && item.href === location.pathname ? "active" : ""
          }`}
          role="menuitem"
        >
          <Link
            to={item.href || "#"}
            className="submenu-link"
            onClick={() => {
              if (isMobile) {
                onMobileMenuClose?.();
              }
            }}
            tabIndex={0}
            aria-label={item.label}
          >
            {item.icon && (
              <span className="icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="label">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Submenu;
