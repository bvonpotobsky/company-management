import {useState} from "react";
import {useMountEffect} from "~/hooks/use-mount-effect";

export type Screen = "mobile" | "tablet" | "desktop" | "large-desktop" | undefined;

export const useWindowSize = (): Screen => {
  const [windowSize, setWindowSize] = useState<Screen | undefined>(undefined);

  useMountEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        return setWindowSize("mobile");
      }
      if (window.innerWidth > 640 && window.innerWidth < 768) {
        return setWindowSize("tablet");
      }
      if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        return setWindowSize("desktop");
      }
      if (window.innerWidth >= 1024) {
        return setWindowSize("large-desktop");
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return windowSize;
};
