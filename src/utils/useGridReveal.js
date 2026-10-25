import { useEffect, useRef } from "react";

/**
 * Observe un conteneur de grille et lui ajoute la classe
 * "visible" dès qu'il entre dans le viewport.
 * À utiliser avec la classe CSS .grid-animate (animations.css).
 */
export function useGridReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si déjà visible (ex : top de page), déclencher immédiatement
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
