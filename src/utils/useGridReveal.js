import { useEffect, useRef } from "react";

/**
 * Observe un conteneur de grille et lui ajoute la classe
 * "visible" dès qu'il entre dans le viewport.
 * À utiliser avec la classe CSS .grid-animate (animations.css).
 *
 * Important : le `key` doit être posé sur le composant qui appelle
 * ce hook (pas sur le div interne) pour que useEffect se relance
 * correctement lors d'un re-mount (ex : "Voir plus").
 */
export function useGridReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Vérifier si l'élément est déjà dans le viewport
    const rect = el.getBoundingClientRect();
    const dansLeViewport =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (dansLeViewport) {
      // Déjà visible : déclencher avec un micro-délai pour laisser
      // React finir le rendu des enfants avant d'animer
      const id = requestAnimationFrame(() => {
        if (el) el.classList.add("visible");
      });
      return () => cancelAnimationFrame(id);
    }

    // Pas encore visible : observer l'entrée dans le viewport
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
