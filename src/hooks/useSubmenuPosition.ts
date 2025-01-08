import { useEffect, RefObject } from "react";

interface UseSubmenuPositionProps {
  submenuRef: RefObject<HTMLUListElement>;
  parentRef: RefObject<HTMLLIElement>;
  isActive: boolean;
}

const useSubmenuPosition = ({
  submenuRef,
  parentRef,
  isActive,
}: UseSubmenuPositionProps) => {
  useEffect(() => {
    if (submenuRef.current && parentRef.current && isActive) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const submenuRect = submenuRef.current.getBoundingClientRect();

      const offScreenRight =
        parentRect.left + submenuRect.width > window.innerWidth;
      const offScreenLeft = parentRect.left - submenuRect.width < 0;

      if (offScreenRight) {
        submenuRef.current.style.left = "auto";
        submenuRef.current.style.right = "0";
        submenuRef.current.style.transform = "translateY(10px)";
      } else if (offScreenLeft) {
        submenuRef.current.style.left = "0";
        submenuRef.current.style.right = "auto";
        submenuRef.current.style.transform = "translateY(10px)";
      }
    }
  }, [isActive, submenuRef, parentRef]);
};

export default useSubmenuPosition;
