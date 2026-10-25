import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Enveloppe les pages avec un fondu léger à chaque changement de route.
 * Utilise uniquement CSS opacity + transform — aucune lib externe.
 * Compatible avec prefers-reduced-motion.
 */
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Vérifier la préférence système
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // État initial : invisible
    el.classList.add("page-transition-enter");

    // Un frame plus tard : transition vers l'état visible
    const raf = requestAnimationFrame(() => {
      el.classList.remove("page-transition-enter");
      el.classList.add("page-transition-enter-active");

      // Nettoyer la classe une fois la transition terminée
      const onEnd = () => {
        el.classList.remove("page-transition-enter-active");
        el.removeEventListener("transitionend", onEnd);
      };
      el.addEventListener("transitionend", onEnd, { once: true });
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      {children}
    </div>
  );
}

export default PageTransition;
