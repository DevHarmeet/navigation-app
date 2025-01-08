import React from "react";
import { FiHome, FiGrid, FiMail, FiInfo } from "react-icons/fi";

const iconMap: { [key: string]: () => React.ReactElement } = {
  FiHome: () => <FiHome />,
  FiGrid: () => <FiGrid />,
  FiMail: () => <FiMail />,
  FiInfo: () => <FiInfo />,
};

export const getIconComponent = (
  iconName: string | undefined
): React.ReactElement | null => {
  if (!iconName) return null;
  const IconComponent = iconMap[iconName];
  return IconComponent ? IconComponent() : null;
};

export default getIconComponent;
