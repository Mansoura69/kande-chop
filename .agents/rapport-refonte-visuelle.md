# Rapport de refonte visuelle — KANDE CHOP ALHAMDULILLAH

## Modifications effectuées

### Étape 1 — Logo

- **Remplacement** de `src/assets/logo.svg` par un SVG horizontal épuré (viewBox 260×60) : cintre stylisé avec fleur, texte « KANDE CHOP » en blanc Georgia, signature « Alhamdulillah » en rose poudré italique, fond transparent — optimisé pour le fond chocolat `#5A4A42`.
- **Création** de `src/assets/logo-icon.svg` (60×60) : même symbole cintre+fleur avec fond carré arrondi chocolat, sans texte — utilisable comme favicon.
- `Header.jsx` : logo affiché à `width="200"` (au lieu de 140).

### Étape 2 — Hero Home (SVG inline)

- `Home.jsx` : composant `HeroIllustration()` défini avant `Home()` — retourne un SVG inline 220×320 représentant une silhouette féminine voilée stylisée (tête, voile/hijab, robe longue, bras, détails) avec un cercle décoratif positionné en absolu derrière le SVG.
- Remplacement de la div `.home-hero-decoration` (cercle avec lettre K) par `<HeroIllustration />`.
- `Home.css` : fond dégradé `linear-gradient(135deg, #f3e9dc 0%, #fdf8f6 100%)`, styles `.hero-visual`, `.hero-circle`, `.hero-figure`, keyframes `fadeUp`, `fadeIn`, `scaleIn`, animation sur `.home-hero-content`.
- Responsive : tailles adaptées à 640px et 1024px.

### Étape 3 — Animations cartes produits

- `ProductCard.css` : ajout à la fin du fichier des règles hover (`translateY(-4px)`, ombre), zoom image `scale(1.06)`, keyframes `badgePop`, classe `.cart-badge--pop`.
- Bloc `@media (prefers-reduced-motion: reduce)` couvrant toutes les nouvelles animations.
- `.product-card` : `border-radius: var(--radius-card, 12px)`, `box-shadow: var(--shadow-card, …)`.
- `.product-card-image` : `border-radius: 12px 12px 0 0`.

### Étape 4 — Badge panier animé (React)

- `Header.jsx` : import de `useState`, `useEffect`, `useRef` depuis React. Logique `popping` : déclenche `.cart-badge--pop` pendant 450 ms à chaque augmentation de `nbArticles`. Pas de déclenchement au montage initial (comparaison avec `prevNb.current`).

### Étape 5 — Scroll reveal

- `src/styles/animations.css` créé : classes `.reveal`, `.reveal.visible`, `.reveal-delay-1/2/3`, bloc `prefers-reduced-motion`.
- `src/utils/useReveal.js` créé : hook `useReveal()` exporté nommément — `IntersectionObserver` avec `threshold: 0.12`, déconnexion après première intersection (triggerOnce implicite).
- `global.css` : `@import "./animations.css"` ajouté après `@import Google Fonts`.
- `Home.jsx` : `useReveal()` importé et appliqué sur les sections `.home-categories`, `.home-new-products`, `.home-benefits` avec classes `reveal` et `reveal-delay-1`.

### Étape 6 — Harmonisation CSS

- `global.css` : variables `--radius-card: 12px` et `--shadow-card: 0 4px 16px rgba(90,74,66,0.08)` ajoutées dans `:root`. `.primary-button` : `border-radius: 8px`, `box-shadow: var(--shadow-card)`, hover avec ombre renforcée.
- `Catalog.css` : `.category-filter.active` — ajout de `box-shadow: 0 2px 8px rgba(90,74,66,0.2)`.
- `ProductCard.css` : `.category-filter.active` — idem.
- `Cart.css` : `.cart-summary` — `border-radius: 14px`, `box-shadow: var(--shadow-card)`.
- `ProductDetails.css` : `.order-form` — `border-radius: 14px`, `box-shadow: var(--shadow-card)`.
- `Home.css` : `.home-category-card` → `border-radius: var(--radius-card, 12px)`, `.home-benefit` → `border-radius: 14px`, `box-shadow: var(--shadow-card)`.

### Étape 7 — Build

- `npm run build` : **succès** ✓ (50 modules transformés, aucune erreur ni avertissement)

---

## Fichiers créés

| Fichier | Description |
|---|---|
| `src/assets/logo.svg` | Logo principal horizontal SVG (remplacé) |
| `src/assets/logo-icon.svg` | Icône logo seule SVG 60×60 (créé) |
| `src/styles/animations.css` | Classes scroll-reveal et prefers-reduced-motion (créé) |
| `src/utils/useReveal.js` | Hook React IntersectionObserver (créé) |
| `.agents/rapport-refonte-visuelle.md` | Ce rapport (créé) |

## Fichiers modifiés

| Fichier | Modifications |
|---|---|
| `src/components/Header.jsx` | Logo width 200, badge pop animation |
| `src/pages/Home.jsx` | HeroIllustration SVG, useReveal sur 3 sections |
| `src/styles/Home.css` | Dégradé hero, hero-visual/circle/figure, keyframes, responsive |
| `src/styles/ProductCard.css` | Hover card/image, badgePop keyframes, border-radius, shadow |
| `src/styles/Catalog.css` | category-filter.active box-shadow |
| `src/styles/Cart.css` | cart-summary border-radius 14px + shadow |
| `src/styles/ProductDetails.css` | order-form border-radius 14px + shadow |
| `src/styles/global.css` | @import animations, variables --radius-card/--shadow-card, primary-button |

## Contraintes respectées

- `CartContext.jsx`, `App.jsx`, `produits.json`, `Catalog.jsx` (logique), `ProductDetails.jsx` (formulaire WhatsApp), `Cart.jsx` (logique panier) : **non modifiés**.
- Couleurs navbar `#5A4A42` et palette complète : **conservées**.
- Aucune bibliothèque npm ajoutée.
- Aucun chemin d'image fictif — l'illustration hero est un SVG inline dans `Home.jsx`.
- Toutes les animations incluent `@media (prefers-reduced-motion: reduce)`.
- Build `npm run build` : **succès** sans erreur.

## Limitations

- L'illustration hero est un SVG stylisé vectoriel, non une photographie. Pour un rendu photographique, il faudrait une image réelle (jpg/png) à placer dans `src/assets/`.
- Le logo SVG utilise des polices système (Georgia) — le rendu peut légèrement varier selon les systèmes si Georgia n'est pas installée (remplacée par Times New Roman ou serif générique).
