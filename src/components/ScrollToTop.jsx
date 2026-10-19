import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remonte automatiquement en haut de la page à chaque changement de route.
 * À placer à l'intérieur de <BrowserRouter> mais en dehors des <Routes>.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
