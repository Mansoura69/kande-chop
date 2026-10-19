# Plan d'exécution — Refonte visuelle KANDE CHOP ALHAMDULILLAH

**Projet** : `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop`
**Build** : `npm run build` (Vite 8, React 19, pas de test runner)
**Commande de vérification** : `cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build`

---

## Contraintes absolues (rappel — à vérifier à chaque étape)

- **NE PAS** modifier : `CartContext.jsx`, `App.jsx`, `produits.json`, la logique de `Catalog.jsx`, `ProductDetails.jsx` (formulaire WhatsApp), `Cart.jsx` (logique panier).
- Conserver `navbar` fond `#5A4A42` et toutes les couleurs actuelles de la palette.
- **NE PAS** ajouter de bibliothèques npm.
- **NE PAS** utiliser de chemin d'image fictif — l'illustration hero est un SVG inline dans le JSX.
- Conserver tous les imports existants sauf si réellement inutilisés (ne pas supprimer sans vérifier).
- Toutes les animations CSS doivent inclure un bloc `@media (prefers-reduced-motion: reduce)`.
- Le build `npm run build` doit passer sans erreur avant de terminer l'étape finale.

---

## Contexte issu de l'exploration

| Point | État actuel |
|---|---|
| `src/assets/logo.svg` | SVG 420×200 multi-éléments (ornements floraux, lignes, robe, texte) — fond transparent — couleurs OK pour fond chocolat |
| `src/assets/logo-icon.svg` | N'existe pas encore |
| `Header.jsx` | Affiche le logo `width="140"` — pas de `useRef`/`useEffect` pour badge — badge `.cart-badge` dans `.cart-link` |
| `Navbar.jsx` | Simple — NavLink vers `/`, `/catalogue`, `/panier` — pas de hamburger |
| `Home.jsx` | Section `.home-hero-decoration` = div avec `.hero-decoration-circle` et `<span>K</span>` — pas de SVG inline ni d'animation |
| `src/utils/` | Dossier vide — à créer `useReveal.js` dedans |
| `global.css` | Variables CSS présentes — pas de `--radius-card` ni `--shadow-card` — `.primary-button` existe sans `border-radius` arrondi notable |
| `ProductCard.css` | Deux fichiers CSS avec classes `.product-card` : `Catalog.css` (lignes 1–99) et `ProductCard.css` (lignes 1–250) — les styles des cartes sont répartis entre les deux. Seul `ProductCard.css` doit recevoir les ajouts hover/animations |
| `Header.css` | `.cart-badge` présent, pas de classe `.cart-badge--pop` |
| `Home.css` | Pas de keyframes — fond hero `#f3e9dc` — pas de dégradé — `.home-hero-decoration` visible |

---

## Étape 1 — LOGO

**Ce qu'il faut faire :**
Remplacer `src/assets/logo.svg` par une version horizontale épurée : cintre stylisé + fleur + texte « KANDE CHOP » + signature « Alhamdulillah », fond transparent, optimisé pour fond chocolat `#5A4A42`. Créer `src/assets/logo-icon.svg` (symbole seul — cintre+fleur — utilisable comme favicon). Mettre à jour `Header.jsx` pour afficher le logo à `width="200"` (hauteur automatique).

**Fichiers à modifier / créer :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\assets\logo.svg` — remplacer le contenu SVG
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\assets\logo-icon.svg` — créer (nouveau fichier)
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\components\Header.jsx` — changer `width="140"` en `width="200"`, laisser `height` auto

**Détails du nouveau logo.svg :**
- `viewBox="0 0 280 80"` — format horizontal compact
- Symbole à gauche : un cintre simplifié (arc + crochet, `stroke="#F3E9DC"`) centré sur une petite fleur à 5 pétales (`fill="#E8B4BC"`) — tout dans un `<g>` réutilisable
- Texte « KANDE CHOP » : `font-family="Georgia, serif"` `font-size="28"` `font-weight="700"` `fill="#FFFFFF"` `letter-spacing="4"`
- Texte « Alhamdulillah » : `font-size="10"` `fill="#E8B4BC"` `letter-spacing="3"` — positionné sous le texte principal
- Fond : `<rect fill="none"/>` (transparent)

**Détails du logo-icon.svg :**
- `viewBox="0 0 48 48"` — carré
- Même cintre + fleur centrés, grossis pour lisibilité — pas de texte
- Utilisable comme favicon 32×32 ou 48×48

**Vérification :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Le build doit passer sans erreur. Vérifier que `logo.svg` et `logo-icon.svg` sont bien des SVG valides (balise `<svg>` correcte, attributs `xmlns`, pas de syntaxe cassée).

---

## Étape 2 — HERO HOME (SVG inline)

**Ce qu'il faut faire :**
Dans `Home.jsx`, remplacer la div `.home-hero-decoration` par un composant fonction `HeroIllustration()` défini dans le même fichier. Ce composant retourne un SVG inline représentant une silhouette féminine voilée stylisée — pas d'image réelle, SVG vectoriel uniquement. Mettre à jour `Home.css` : fond dégradé sur `.home-hero`, cercle décoratif derrière la silhouette, keyframes `fadeUp` / `fadeIn` / `scaleIn`, et responsive.

**Fichiers à modifier :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\pages\Home.jsx`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\Home.css`

**Détails de HeroIllustration() :**
Composant défini au-dessus de `function Home()` dans le même fichier :
```jsx
function HeroIllustration() {
  return (
    <div className="home-hero-illustration" aria-hidden="true">
      {/* Cercle décoratif — derrière, en CSS avec z-index */}
      <div className="hero-circle" />
      {/* SVG silhouette féminine voilée */}
      <svg
        className="hero-svg"
        viewBox="0 0 260 340"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ... éléments SVG décrits ci-dessous ... */}
      </svg>
    </div>
  );
}
```

**Éléments SVG de la silhouette** (coordonnées à respecter pour le rendu) :
- Tête : `<circle cx="130" cy="58" r="34" fill="#F3E9DC" />`
- Voile/hijab : `<path d="M96 58 Q80 70 78 120 Q100 130 130 128 Q160 130 182 120 Q180 70 164 58 Q148 40 130 36 Q112 40 96 58Z" fill="#E8B4BC" opacity="0.9"/>`
- Corps/robe (haut) : `<path d="M90 128 Q72 148 68 200 L192 200 Q188 148 170 128 Q150 136 130 136 Q110 136 90 128Z" fill="#5A4A42" opacity="0.85"/>`
- Corps/robe (bas) : `<path d="M68 200 Q60 260 62 310 L198 310 Q200 260 192 200Z" fill="#5A4A42" opacity="0.7"/>`
- Détail col : `<path d="M110 136 Q130 152 150 136" fill="none" stroke="#E8B4BC" stroke-width="2" opacity="0.6"/>`
- Reflets voile : `<ellipse cx="108" cy="80" rx="8" ry="16" fill="#FFFFFF" opacity="0.15" transform="rotate(-20 108 80)"/>`

**Remplacement dans Home.jsx :**
- Supprimer la div `className="home-hero-decoration"` et tout son contenu (`hero-decoration-circle`, le span `K`, et le `<p>`)
- La remplacer par `<HeroIllustration />`
- Conserver `aria-hidden="true"` sur l'élément conteneur

**Modifications Home.css :**

1. `.home-hero` : changer `background: #f3e9dc` en dégradé `background: linear-gradient(135deg, #fdf8f6 0%, #f3e9dc 50%, #efe0d5 100%)`
2. Remplacer les styles `.home-hero-decoration`, `.hero-decoration-circle`, `.hero-decoration-circle span`, `.home-hero-decoration > p` par :
```css
.home-hero-illustration {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  animation: fadeIn 0.9s ease both;
  animation-delay: 0.2s;
}

.hero-circle {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle, #e8b4bc 0%, #f3e9dc 70%);
  opacity: 0.55;
  z-index: 0;
  animation: scaleIn 0.8s cubic-bezier(0.34,1.56,0.64,1) both;
  animation-delay: 0.1s;
}

.hero-svg {
  position: relative;
  z-index: 1;
  width: 200px;
  max-width: 90%;
  height: auto;
  animation: fadeUp 0.8s ease both;
  animation-delay: 0.3s;
  filter: drop-shadow(0 8px 24px rgba(90,74,66,0.12));
}
```
3. Ajouter les keyframes (avant ou après les media queries existantes) :
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
}
```
4. Animer le contenu héro — ajouter à `.home-hero-content` :
```css
.home-hero-content {
  animation: fadeUp 0.7s ease both;
  animation-delay: 0.4s;
}
```
5. Dans `@media (prefers-reduced-motion: reduce)` existant, ajouter :
```css
.home-hero-illustration,
.hero-circle,
.hero-svg,
.home-hero-content {
  animation: none;
}
```
6. Responsive : adapter `.home-hero-illustration` à `min-height: 340px` à partir de 640px et `min-height: 420px` à partir de 1024px. Adapter `.hero-circle` à `width: 300px; height: 300px` à 640px et `width: 340px; height: 340px` à 1024px. Adapter `.hero-svg` à `width: 240px` à 640px et `width: 280px` à 1024px.

**Vérification :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Confirmer que le build passe sans erreur. La section hero doit avoir un SVG inline visible (pas de `<img>` avec src externe). Aucune image cassée.

---

## Étape 3 — ANIMATIONS CARTES (CSS uniquement)

**Ce qu'il faut faire :**
Ajouter à la fin de `ProductCard.css` les règles de hover pour les cartes produits (soulèvement + ombre), le zoom de l'image au survol, et les keyframes `badgePop` avec la classe `.cart-badge--pop`. Tout accompagné d'un bloc `@media (prefers-reduced-motion: reduce)`.

**Fichier à modifier :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\ProductCard.css`

**Contenu à ajouter à la fin du fichier** (après le dernier bloc existant) :

```css
/* ========================================
   ANIMATIONS CARTES PRODUITS
   ======================================== */

/* Soulèvement et ombre au survol */
.product-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(90, 74, 66, 0.13);
}

/* Zoom image au survol */
.product-card-image img {
  transition: transform 0.35s ease;
}

.product-card:hover .product-card-image img {
  transform: scale(1.06);
}

/* Keyframes badge panier */
@keyframes badgePop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.45); }
  70%  { transform: scale(0.88); }
  100% { transform: scale(1); }
}

.cart-badge--pop {
  animation: badgePop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  .product-card {
    transition: none;
  }

  .product-card:hover {
    transform: none;
    box-shadow: none;
  }

  .product-card-image img {
    transition: none;
  }

  .product-card:hover .product-card-image img {
    transform: none;
  }

  .cart-badge--pop {
    animation: none;
  }
}
```

**Précaution :** `ProductCard.css` contient déjà des classes `.product-card` et `.product-card-image img` (définitions de base). Les nouvelles règles ajoutées à la FIN complètent sans écraser — elles seront prioritaires via l'ordre de cascade. Ne pas dupliquer les propriétés existantes (`border-radius`, `background`, etc.).

**Vérification :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Build doit passer sans erreur. Pas d'avertissement sur les propriétés CSS dupliquées critiques.

---

## Étape 4 — BADGE PANIER ANIMÉ (React)

**Ce qu'il faut faire :**
Modifier `Header.jsx` pour que le badge `.cart-badge` reçoive la classe `.cart-badge--pop` pendant 400 ms chaque fois que `nbArticles` augmente. Utiliser `useEffect`, `useState`, et `useRef` (pour éviter le déclenchement au montage initial). Ajouter les imports manquants à la ligne d'import de React.

**Fichier à modifier :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\components\Header.jsx`

**État actuel des imports dans Header.jsx :**
```js
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import logoSrc from "../assets/logo.svg";
import "../styles/Header.css";
```
Il n'y a pas d'import React actuellement (React 19 JSX transform — pas besoin d'`import React` global, mais `useEffect`, `useState`, `useRef` doivent être importés).

**Modifications à apporter :**

1. Ajouter en première ligne :
```js
import { useState, useEffect, useRef } from "react";
```

2. Dans `function Header()`, après `const { nbArticles } = useCart();`, ajouter :
```js
const [badgePop, setBadgePop] = useState(false);
const prevNbRef = useRef(null);

useEffect(() => {
  // Ne pas déclencher à l'initialisation (premier rendu)
  if (prevNbRef.current === null) {
    prevNbRef.current = nbArticles;
    return;
  }
  if (nbArticles > prevNbRef.current) {
    setBadgePop(true);
    const timer = setTimeout(() => setBadgePop(false), 400);
    prevNbRef.current = nbArticles;
    return () => clearTimeout(timer);
  }
  prevNbRef.current = nbArticles;
}, [nbArticles]);
```

3. Modifier la span `.cart-badge` existante :
```jsx
{nbArticles > 0 && (
  <span
    className={`cart-badge${badgePop ? " cart-badge--pop" : ""}`}
    aria-hidden="true"
  >
    {nbArticles}
  </span>
)}
```

4. Laisser tous les autres imports et le JSX inchangés.

5. La prop `width` du logo passe de `"140"` à `"200"` (cf. étape 1).

**Vérification :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Build sans erreur. Pas d'avertissement ESLint sur `useEffect` sans dépendances ou hooks appelés de manière conditionnelle.

---

## Étape 5 — SCROLL REVEAL

**Ce qu'il faut faire :**
Créer `src/styles/animations.css` avec les classes `.reveal` / `.reveal.visible` / `.reveal-delay-1`, `.reveal-delay-2`, `.reveal-delay-3` + bloc `prefers-reduced-motion`. Créer `src/utils/useReveal.js` (hook `IntersectionObserver`). Ajouter `@import "./styles/animations.css"` dans `global.css`. Appliquer `useReveal()` dans `Home.jsx` sur les trois sections `.home-categories`, `.home-new-products`, `.home-benefits`.

**Fichiers à créer :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\animations.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\utils\useReveal.js`

**Fichiers à modifier :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\global.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\pages\Home.jsx`

**Contenu de animations.css :**
```css
/* ========================================
   KANDE CHOP — Animations scroll reveal
   ======================================== */

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Contenu de useReveal.js :**
```js
import { useEffect, useRef } from "react";

/**
 * Ajoute la classe "visible" sur l'élément référencé
 * quand il entre dans le viewport (IntersectionObserver).
 * triggerOnce : ne rejoue pas si l'élément ressort du viewport.
 */
export default function useReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.15, triggerOnce = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return ref;
}
```

**Modification global.css :**
Ajouter à la toute fin des imports en haut du fichier (juste après la ligne `@import url("https://fonts.googleapis.com/...")`):
```css
@import "./styles/animations.css";
```
Attention : `global.css` se trouve dans `src/styles/`. L'import relatif doit donc être `"./animations.css"` (même dossier), pas `"./styles/animations.css"`.

**Modification Home.jsx :**
1. Ajouter l'import du hook (après les imports existants) :
```js
import useReveal from "../utils/useReveal";
```
2. Dans `function Home()`, ajouter les refs après `const nouveautes = ...` :
```js
const refCategories = useReveal();
const refNewProducts = useReveal();
const refBenefits = useReveal();
```
3. Ajouter les classes `reveal` et les refs aux sections :
```jsx
<section className="home-categories reveal" ref={refCategories}>
<section className="home-new-products reveal reveal-delay-1" ref={refNewProducts}>
<section className="home-benefits reveal" ref={refBenefits}>
```
(les sections `.home-hero` ne reçoivent PAS la classe `reveal` — elles utilisent déjà les animations CSS du step 2)

**Vérification :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Build sans erreur. Confirmer que `animations.css` est bien importé (pas de 404 sur le build).

---

## Étape 6 — HARMONISATION CSS

**Ce qu'il faut faire :**
Ajouter les variables `--radius-card` et `--shadow-card` dans `:root` de `global.css` et améliorer `.primary-button`. Mettre à jour `ProductCard.css`, `Catalog.css`, `Cart.css`, `ProductDetails.css`, `Home.css` pour utiliser des border-radius, ombres et espacements cohérents selon la palette existante.

**Fichiers à modifier :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\global.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\ProductCard.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\Catalog.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\Cart.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\ProductDetails.css`
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\src\styles\Home.css`

### 6a — global.css

Dans le bloc `:root { ... }`, ajouter après `--color-border: #eadbd3;` :
```css
--radius-card: 12px;
--shadow-card: 0 4px 16px rgba(90, 74, 66, 0.08);
```

Modifier `.primary-button` — remplacer le `border-radius: 5px` existant par `border-radius: 8px` et ajouter `box-shadow: var(--shadow-card)` dans la règle de base ; dans `:hover`, conserver `transform: translateY(-1px)` et ajouter `box-shadow: 0 6px 20px rgba(90,74,66,0.14)`.

### 6b — ProductCard.css

Dans le fichier `ProductCard.css` (qui contient à la fois les styles du catalogue et des cartes), modifier :
- La classe `.product-card` (déjà présente dans ce fichier) : changer `border-radius: 10px` → `border-radius: var(--radius-card)` et ajouter `box-shadow: var(--shadow-card)`.
- La classe `.product-card-image` : changer ou ajouter `border-radius: 12px 12px 0 0` (arrondi en haut seulement, pour que le bas rejoigne le contenu sans arrondi).

**Note :** `Catalog.css` contient aussi des règles `.product-card` et `.product-card-image img` (lignes 1–99). Ces règles doublonnent partiellement avec `ProductCard.css`. Ne modifier que `ProductCard.css` — les valeurs dans `ProductCard.css` cascaderont correctement puisque ce fichier est importé dans le composant `ProductCard.jsx`.

### 6c — Catalog.css

Dans `.category-filter.active`, ajouter `box-shadow: 0 2px 8px rgba(90,74,66,0.18)` (en plus de `border-color: #5a4a42; background: #5a4a42; color: #ffffff` déjà présents).

### 6d — Cart.css

Dans `.cart-summary`, remplacer `border-radius: 12px` par `border-radius: 14px` et ajouter `box-shadow: var(--shadow-card)`.

### 6e — ProductDetails.css

Dans `.order-form`, remplacer `border-radius: 10px` par `border-radius: 14px` et ajouter `box-shadow: var(--shadow-card)`.

### 6f — Home.css

Les modifications suivantes (le fond dégradé du hero a déjà été fait à l'étape 2) :
- `.home-category-card` : changer `border-radius: 10px` → `border-radius: var(--radius-card)`.
- `.home-benefit` : changer `border-radius: 12px` → `border-radius: 14px` (déjà à 12px, uniformiser à 14px avec le panier/formulaire) et s'assurer que `box-shadow: var(--shadow-card)` est utilisé à la place du `0 4px 14px rgba(90,74,66,0.05)` actuel.

**Vérification :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Build sans erreur. Vérifier visuellement que les variables CSS `var(--radius-card)` et `var(--shadow-card)` sont bien définies dans `:root` avant leur utilisation.

---

## Étape 7 — BUILD FINAL ET RAPPORT

**Ce qu'il faut faire :**
Lancer `npm run build` dans le répertoire du projet. Corriger toute erreur de build remontée par Vite (imports manquants, JSX malformé, CSS invalide). Puis créer le rapport `rapport-refonte-visuelle.md`.

**Fichiers à créer :**
- `c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop\.agents\rapport-refonte-visuelle.md`

**Commande de build :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```

**Si le build échoue :**
- Lire la sortie d'erreur complète.
- Les erreurs les plus probables sont : import de `useReveal` avec un chemin incorrect, oubli d'un `@import` dans global.css, JSX invalide dans `HeroIllustration`, ou propriété CSS non reconnue.
- Corriger dans les fichiers concernés et relancer le build.
- Ne pas terminer cette étape tant que le build n'est pas vert.

**Contenu minimal du rapport :**
```md
# Rapport de refonte visuelle — KANDE CHOP ALHAMDULILLAH

## Modifications effectuées

### Étape 1 — Logo
- Remplacement de `src/assets/logo.svg` par un SVG horizontal épuré.
- Création de `src/assets/logo-icon.svg` (symbole seul, 48×48).
- `Header.jsx` : logo affiché à `width="200"`.

### Étape 2 — Hero Home
- `Home.jsx` : composant `HeroIllustration()` avec SVG inline silhouette voilée.
- `Home.css` : fond dégradé, cercle décoratif, keyframes fadeUp/fadeIn/scaleIn.

### Étape 3 — Animations cartes
- `ProductCard.css` : hover translateY(-4px), zoom image scale(1.06), keyframes badgePop.

### Étape 4 — Badge panier animé
- `Header.jsx` : useEffect + useRef + useState pour déclencher `.cart-badge--pop`.

### Étape 5 — Scroll reveal
- `src/styles/animations.css` créé.
- `src/utils/useReveal.js` créé (hook IntersectionObserver).
- `global.css` : @import animations.css ajouté.
- `Home.jsx` : useReveal() appliqué sur 3 sections.

### Étape 6 — Harmonisation CSS
- `global.css` : variables --radius-card, --shadow-card, .primary-button amélioré.
- `ProductCard.css` : border-radius 12px, image arrondie en haut.
- `Catalog.css` : .category-filter.active box-shadow.
- `Cart.css` : .cart-summary border-radius 14px + shadow.
- `ProductDetails.css` : .order-form border-radius 14px + shadow.
- `Home.css` : catégories et benefits harmonisés.

### Étape 7 — Build
- `npm run build` : succès ✓

## Contraintes respectées
- CartContext.jsx, App.jsx, produits.json, Catalog.jsx (logique), ProductDetails.jsx (formulaire), Cart.jsx (logique) : non modifiés.
- Couleurs navbar #5A4A42 et palette complète : conservées.
- Aucune bibliothèque npm ajoutée.
- Aucun chemin d'image fictif.
- Toutes les animations incluent @media (prefers-reduced-motion: reduce).
```

**Vérification finale :**
```
cd "c:\Users\Mansoura Ab\Desktop\Kande-chop\kande-chop" && npm run build
```
Build vert = étape terminée.

---

## Ordre de dépendances entre étapes

```
Étape 1 (logo)
  └─► Étape 4 (Header.jsx — même fichier, compléter les imports React)

Étape 2 (hero + Home.css keyframes)
  └─► Étape 5 (Home.jsx — même fichier, ajouter useReveal)

Étape 3 (ProductCard.css — keyframes badgePop)
  └─► Étape 4 (Header.jsx — badge utilise .cart-badge--pop défini à l'étape 3)

Étape 6 (CSS harmonisation)
  → indépendante des étapes 1–5, peut être faite en parallèle
  → mais doit être terminée avant l'étape 7

Étape 7 (build + rapport)
  → dépend de toutes les étapes précédentes
```

**Ordre recommandé d'exécution :** 1 → 2 → 3 → 4 → 5 → 6 → 7
