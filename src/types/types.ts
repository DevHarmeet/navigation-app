export interface MenuItemType {
  label: string;
  href?: string;
  icon?: string;
  submenu?: { label: string; href: string; icon?: string }[];
}

export interface MenuItemProps {
  item: MenuItemType;
  isScrolled: boolean;
  onMobileMenuClose?: () => void;
  isMenuOpen?: boolean;
}

export interface SubmenuProps {
  items: Omit<MenuItemType, "submenu">[];
  isActive: boolean;
  isScrolled: boolean;
  parentRef: React.RefObject<HTMLLIElement>;
  id: string;
  onMobileMenuClose?: () => void;
  setParentHovered?: (value: boolean) => void;
}
