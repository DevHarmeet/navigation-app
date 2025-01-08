import React from "react";
import { FiHome, FiGrid, FiMail, FiInfo } from "react-icons/fi";
import { MenuItemType } from "../types/types";

const menuItems: MenuItemType[] = [
  { label: "Home", href: "/", icon: <FiHome /> },
  {
    label: "Services",
    icon: <FiGrid />,
    submenu: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Development", href: "/services/mobile-development" },
      { label: "Cloud Services", href: "/services/cloud" },
    ],
  },
  {
    label: "About",
    icon: <FiInfo />,
    submenu: [
      { label: "Our Team", href: "/about/team" },
      { label: "Company", href: "/about/company" },
    ],
  },
  { label: "Contact", href: "/contact", icon: <FiMail /> },
];

export default menuItems;
