import { useEffect, RefObject } from "react";

interface UseMenuStateProps {
  isMobile: boolean;
  isHovered: boolean;
  isMenuOpen?: boolean;
  setIsHovered: (isHovered: boolean) => void;
}

const useMenuState = ({
  isMobile,
  isHovered,
  isMenuOpen,
  setIsHovered,
}: UseMenuStateProps) => {
  useEffect(() => {
    const handleDocumentClick = () => {
      if (!isMobile && isHovered) {
        setIsHovered(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isMobile, isHovered, setIsHovered]);

  useEffect(() => {
    if (isMobile && !isMenuOpen) {
      setIsHovered(false);
    }
  }, [isMobile, isMenuOpen, setIsHovered]);
};

export default useMenuState;
