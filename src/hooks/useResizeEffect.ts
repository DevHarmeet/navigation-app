import { useEffect } from "react";

const useResizeEffect = (
  setIsMobile: (isMobile: boolean) => void,
  setIsHovered: (isHovered: boolean) => void
) => {
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsHovered(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile, setIsHovered]);
};

export default useResizeEffect;
