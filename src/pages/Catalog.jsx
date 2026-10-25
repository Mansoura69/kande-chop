import { useEffect, useMemo, useState } from "react";
import produits from "../data/produits.json";
import ProductCard from "../components/ProductCard";
import { FiSearch, FiX } from "react-icons/fi";
import { useGridReveal } from "../utils/useGridReveal";
import "../styles/Catalog.css";

const categories = [
  { valeur: "tous", libelle: "Tous les produits" },
  { valeur: "chaussures", libelle: "Chaussures" },
  { valeur: "voiles", libelle: "Voiles" },
  { valeur: "accessoires", libelle: "Accessoires" },
  { valeur: "robes", libelle: "Robes" },
  { valeur: "ensembles", libelle: "Ensembles" },
  { valeur: "nuisettes", libelle: "Nuisettes" },
  { valeur: "sacs", libelle: "Sacs" },
];

const LIBELLES_CATEGORIES = {
  chaussures: "Chaussures",
  voiles: "Voiles",
  accessoires: "Accessoires",
  robes: "Robes",
  ensembles: "Ensembles",
  nuisettes: "Nuisettes",
  sacs: "Sacs",
};

const LIMITE_INITIALE = 4;

function normaliser(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Grille animée en cascade — s'auto-observe dès le mount.
 * La prop `animKey` force un re-mount (et donc rejoue l'animation)
 * quand la recherche ou le filtre change.
 */
function AnimatedGrid({ children, label, animKey }) {
  const ref = useGridReveal();
  return (
    <div
      key={animKey}
      ref={ref}
      className="product-grid grid-animate"
      aria-label={label}
    >
      {children}
    </div>
  );
}

function Catalog() {
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState("tous");
  const [categoriesDeveloppees, setCategoriesDeveloppees] = useState({});

  // Catégories présentes dans les données, dans l'ordre d'apparition
  const categoriesPresentes = useMemo(() => {
    const vues = new Set();
    return produits
      .filter((p) => {
        if (!vues.has(p.categorie)) {
          vues.add(p.categorie);
          return true;
        }
        return false;
      })
      .map((p) => p.categorie);
  }, []);

  // Mode filtré : recherche active ou catégorie spécifique sélectionnée
  const modeFiltre =
    recherche.trim() !== "" || categorieActive !== "tous";

  // Produits filtrés (mode recherche/filtre)
  const produitsFiltres = useMemo(() => {
    return produits.filter((produit) => {
      const texteRecherche = normaliser(recherche);
      const nomProduit = normaliser(produit.nom);
      const categorieProduit = normaliser(produit.categorie);

      const correspondRecherche =
        nomProduit.includes(texteRecherche) ||
        categorieProduit.includes(texteRecherche);

      const correspondCategorie =
        categorieActive === "tous" || produit.categorie === categorieActive;

      return correspondRecherche && correspondCategorie;
    });
  }, [recherche, categorieActive]);

  // Réinitialiser les catégories développées quand la recherche/filtre change
  useEffect(() => {
    setCategoriesDeveloppees({});
  }, [recherche, categorieActive]);

  function effacerRecherche() {
    setRecherche("");
  }

  function toggleCategorie(cat) {
    setCategoriesDeveloppees((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }

  // Produits par catégorie (pour le mode non-filtré)
  function getProduitsByCategorie(cat) {
    return produits.filter((p) => p.categorie === cat);
  }

  return (
    <main className="page-content catalog-page">
      <section className="catalog-heading">
        <p className="eyebrow">KANDE CHOP ALHAMDULILLAH</p>
        <h1>Notre boutique</h1>
        <p>
          Découvrez notre sélection de chaussures, voiles, robes, ensembles,
          nuisettes, sacs et accessoires.
        </p>
      </section>

      <section className="catalog-tools" aria-label="Rechercher des produits">
        <label className="catalog-search">
          <FiSearch aria-hidden="true" />
          <input
            type="search"
            placeholder="Rechercher un produit..."
            value={recherche}
            onChange={(event) => setRecherche(event.target.value)}
            aria-label="Rechercher un produit par nom ou catégorie"
          />

          {recherche && (
            <button
              type="button"
              className="clear-search-button"
              onClick={effacerRecherche}
              aria-label="Effacer la recherche"
            >
              <FiX />
            </button>
          )}
        </label>

        <div className="category-filters" aria-label="Filtrer par catégorie">
          {categories.map((categorie) => (
            <button
              key={categorie.valeur}
              type="button"
              className={`category-filter ${
                categorieActive === categorie.valeur ? "active" : ""
              }`}
              onClick={() => setCategorieActive(categorie.valeur)}
              aria-pressed={categorieActive === categorie.valeur}
            >
              {categorie.libelle}
            </button>
          ))}
        </div>
      </section>

      {modeFiltre ? (
        <section className="catalog-results" aria-live="polite">
          <p className="catalog-results-count">
            {produitsFiltres.length}{" "}
            {produitsFiltres.length > 1 ? "produits trouvés" : "produit trouvé"}
          </p>

          {produitsFiltres.length > 0 ? (
            <AnimatedGrid
              label="Liste des produits"
              animKey={`${recherche}-${categorieActive}`}
            >
              {produitsFiltres.map((produit) => (
                <ProductCard key={produit.id} produit={produit} />
              ))}
            </AnimatedGrid>
          ) : (
            <div className="catalog-empty">
              <h2>Aucun produit trouvé</h2>
              <p>Essayez un autre mot ou choisissez une autre catégorie.</p>
              <button
                type="button"
                className="reset-filters-button"
                onClick={() => {
                  setRecherche("");
                  setCategorieActive("tous");
                }}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>
      ) : (
        <section aria-live="polite">
          {categoriesPresentes.map((cat) => {
            const tousLesProduits = getProduitsByCategorie(cat);
            const estDeveloppe = !!categoriesDeveloppees[cat];
            const produitsCategorieVisibles = estDeveloppe
              ? tousLesProduits
              : tousLesProduits.slice(0, LIMITE_INITIALE);
            const categorieAPlus = tousLesProduits.length > LIMITE_INITIALE;
            const nbRestants =
              tousLesProduits.length - LIMITE_INITIALE;

            return (
              <section
                key={cat}
                className="catalog-category-section"
                aria-label={LIBELLES_CATEGORIES[cat] ?? cat}
              >
                <div className="catalog-category-header">
                  <h2 className="catalog-category-title">
                    {LIBELLES_CATEGORIES[cat] ?? cat}
                  </h2>
                </div>
                <AnimatedGrid
                  label={`Produits : ${LIBELLES_CATEGORIES[cat] ?? cat}`}
                  animKey={`cat-${cat}-${estDeveloppe}`}
                >
                  {produitsCategorieVisibles.map((produit) => (
                    <ProductCard key={produit.id} produit={produit} />
                  ))}
                </AnimatedGrid>
                {categorieAPlus && (
                  <div className="catalog-voir-plus-wrapper">
                    <button
                      type="button"
                      onClick={() => toggleCategorie(cat)}
                      className="voir-plus-button"
                      aria-expanded={estDeveloppe}
                    >
                      {estDeveloppe
                        ? "Voir moins"
                        : `Voir plus (${nbRestants} article${
                            nbRestants > 1 ? "s" : ""
                          })`}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Catalog;
