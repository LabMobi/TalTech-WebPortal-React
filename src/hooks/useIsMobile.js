// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return { isMobile };
};

export default useIsMobile;
