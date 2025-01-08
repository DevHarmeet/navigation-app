import { useState, useEffect } from "react";

interface UseScrollProgressOptions {
  mobileDisabled?: boolean;
  scrollDistance?: number;
}

const useScrollProgress = ({
  mobileDisabled = true,
  scrollDistance = 2000,
}: UseScrollProgressOptions = {}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileDisabled && window.innerWidth <= 768) {
        setScrollProgress(0);
        return;
      }
      const scrolled = Math.min(window.scrollY / scrollDistance, 1);
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileDisabled, scrollDistance]);

  return scrollProgress;
};

export default useScrollProgress;
