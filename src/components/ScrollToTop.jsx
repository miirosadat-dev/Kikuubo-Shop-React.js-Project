import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Every time you open a different page, start at the top of it.
// Instant (not animated), so a long page doesn't spend a second sliding up.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;