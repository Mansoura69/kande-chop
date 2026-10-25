import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  FiArrowRight,
  FiArrowLeft,
  FiTruck,
  FiHeart,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";
import produits from "../data/produits.json";
import ProductCard from "../components/ProductCard";
import { useReveal } from "../utils/useReveal";
import { useGridReveal } from "../utils/useGridReveal";
import "../styles/Home.css";

// ── Images du carrousel ──────────────────────────────────────────
import slide1 from "../assets/IMG/1147855023792558667.jpg";
import slide2 from "../assets/IMG/861876447475653872.jpg";
import slide3 from "../assets/IMG/Elegant Kimono Fashion Style.jpg";
import slide4 from "../assets/IMG/Step in Style.jpg";

const DIAPOSITIVES = [
  {
    id: 1,
    image: slide1,
    alt: "Collection KANDE CHOP — élégance au quotidien",
    titre: "Votre style, votre signature.",
    sousTitre: "Des pièces choisies pour révéler votre élégance.",
  },
  {
    id: 2,
    image: slide2,
    alt: "Collection KANDE CHOP — qualité et confiance",
    titre: "La qualité fait la différence.",
    sousTitre:
      "Choisissez vos pièces avec confiance et profitez d'un style qui vous ressemble.",
  },
  {
    id: 3,
    image: slide3,
    alt: "Collection KANDE CHOP — style et personnalité",
    titre: "Affirmez votre style.",
    sousTitre:
      "Des articles qui mettent en valeur votre personnalité, en toute simplicité.",
  },
  {
    id: 4,
    image: slide4,
    alt: "Collection KANDE CHOP — découvrir la boutique",
    titre: "Trouvez votre prochain coup de cœur.",
    sousTitre: "Explorez notre catalogue et choisissez vos pièces préférées.",
  },
];

const DUREE_AUTO = 5000;

// ── Composant carrousel ──────────────────────────────────────────
function HeroCarousel() {
  const [actif, setActif] = useState(0);
  const [enTransition, setEnTransition] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const total = DIAPOSITIVES.length;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const allerA = useCallback(
    (index) => {
      if (enTransition) return;
      setEnTransition(true);
      setTimeout(
        () => {
          setActif(index);
          setEnTransition(false);
        },
        reduceMotion ? 0 : 400
      );
    },
    [enTransition, reduceMotion]
  );

  const suivant = useCallback(() => {
    allerA((actif + 1) % total);
  }, [actif, total, allerA]);

  const precedent = useCallback(() => {
    allerA((actif - 1 + total) % total);
  }, [actif, total, allerA]);

  // Auto-play
  useEffect(() => {
    if (reduceMotion) return;
    timerRef.current = setTimeout(suivant, DUREE_AUTO);
    return () => clearTimeout(timerRef.current);
  }, [actif, suivant, reduceMotion]);

  // Swipe tactile
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    clearTimeout(timerRef.current);
    if (delta < 0) suivant();
    else precedent();
  }

  const diapo = DIAPOSITIVES[actif];

  return (
    <section
      className="hero-carousel"
      aria-label="Carrousel principal"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="hero-carousel-track" aria-live="polite">
        {DIAPOSITIVES.map((slide, i) => (
          <div
            key={slide.id}
            className={`hero-slide${i === actif ? " hero-slide--active" : ""}${
              enTransition && i === actif ? " hero-slide--exit" : ""
            }`}
            aria-hidden={i !== actif}
          >
            {/* Fond flouté — même image agrandie, comble les espaces latéraux */}
            <img
              src={slide.image}
              alt=""
              className="hero-slide-bg"
              aria-hidden="true"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Image principale nette — contain, proportions préservées */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-slide-img"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="hero-slide-overlay" />
          </div>
        ))}
      </div>

      {/* Texte */}
      <div
        className={`hero-caption${
          enTransition ? " hero-caption--exit" : " hero-caption--enter"
        }`}
      >
        <p className="eyebrow">KANDE CHOP ALHAMDULILLAH</p>
        <h1 className="hero-caption-titre">{diapo.titre}</h1>
        <p className="hero-caption-sous-titre">{diapo.sousTitre}</p>
        <Link to="/catalogue" className="hero-caption-btn">
          Découvrir la collection <FiArrowRight />
        </Link>
      </div>

      {/* Flèches */}
      <button
        type="button"
        className="hero-arrow hero-arrow--prev"
        onClick={() => {
          clearTimeout(timerRef.current);
          precedent();
        }}
        aria-label="Diapositive précédente"
      >
        <FiArrowLeft />
      </button>
      <button
        type="button"
        className="hero-arrow hero-arrow--next"
        onClick={() => {
          clearTimeout(timerRef.current);
          suivant();
        }}
        aria-label="Diapositive suivante"
      >
        <FiArrowRight />
      </button>

      {/* Points indicateurs */}
      <div className="hero-dots" role="tablist" aria-label="Diapositives">
        {DIAPOSITIVES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            className={`hero-dot${i === actif ? " hero-dot--active" : ""}`}
            aria-label={`Aller à la diapositive ${i + 1}`}
            aria-selected={i === actif}
            onClick={() => {
              clearTimeout(timerRef.current);
              allerA(i);
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Données de démonstration — avis clients ──────────────────── */
const avisClients = [
  {
    id: 1,
    nom: "Aïcha S.",
    initiales: "AS",
    note: 5,
    commentaire:
      "Très beaux articles, conformes à mes attentes. J'ai beaucoup apprécié la présentation des produits et la qualité du service.",
  },
  {
    id: 2,
    nom: "Mariam A.",
    initiales: "MA",
    note: 5,
    commentaire:
      "Une belle expérience d'achat. Les articles sont élégants et le contact a été agréable. Je recommande la boutique.",
  },
  {
    id: 3,
    nom: "Fatoumata O.",
    initiales: "FO",
    note: 5,
    commentaire:
      "J'ai apprécié le choix des modèles et les informations reçues avant ma commande. Une boutique à découvrir.",
  },
  {
    id: 4,
    nom: "Ibrahim M.",
    initiales: "IM",
    note: 5,
    commentaire:
      "Une boutique intéressante avec de beaux produits et un service accueillant. Je suis satisfait de mon expérience.",
  },
];

const categories = [
  {
    nom: "Chaussures",
    valeur: "chaussures",
    description: "Élégance à chaque pas",
    symbole: "01",
  },
  {
    nom: "Voiles",
    valeur: "voiles",
    description: "Douceur et raffinement",
    symbole: "02",
  },
  {
    nom: "Pagnes",
    valeur: "pagnes",
    description: "Des motifs qui inspirent",
    symbole: "03",
  },
  {
    nom: "Accessoires",
    valeur: "accessoires",
    description: "La touche finale",
    symbole: "04",
  },
];

function Home() {
  const nouveautes = produits
    .filter((produit) => produit.nouveaute && produit.disponible)
    .slice(0, 4);

  const categoriesRef = useReveal();
  const newProductsRef = useReveal();
  const benefitsRef = useReveal();
  const avisRef = useReveal();
  const nouveautesGridRef = useGridReveal();

  return (
    <main className="home-page">
      {/* ── Carrousel hero ── */}
      <HeroCarousel />

      {/* ── Catégories ── */}
      <section className="home-categories reveal" ref={categoriesRef}>
        <div className="home-section-heading">
          <p className="eyebrow">NOTRE SÉLECTION</p>
          <h2>Explorez nos catégories</h2>
          <p>Trouvez les pièces qui vous ressemblent.</p>
        </div>

        <div className="home-category-grid">
          {categories.map((categorie) => (
            <Link
              key={categorie.valeur}
              to={`/catalogue?categorie=${categorie.valeur}`}
              className={`home-category-card category-${categorie.valeur}`}
            >
              <span className="category-number">{categorie.symbole}</span>
              <div>
                <h3>{categorie.nom}</h3>
                <p>{categorie.description}</p>
              </div>
              <FiArrowRight className="category-arrow" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Nouveautés ── */}
      <section
        className="home-new-products reveal reveal-delay-1"
        ref={newProductsRef}
      >
        <div className="home-section-heading">
          <p className="eyebrow">À DÉCOUVRIR</p>
          <h2>Nos nouveautés</h2>
          <p>Découvrez les articles récemment sélectionnés pour vous.</p>
        </div>

        {nouveautes.length > 0 ? (
          <div ref={nouveautesGridRef} className="product-grid grid-animate">
            {nouveautes.map((produit) => (
              <ProductCard key={produit.id} produit={produit} />
            ))}
          </div>
        ) : (
          <p className="home-no-products">
            Nos nouveautés arrivent bientôt. Revenez nous voir !
          </p>
        )}

        <div className="home-all-products">
          <Link to="/catalogue" className="home-secondary-button">
            Voir tous les produits <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Avantages ── */}
      <section className="home-benefits reveal" ref={benefitsRef}>
        <div className="home-section-heading">
          <p className="eyebrow">VOTRE SATISFACTION</p>
          <h2>Une expérience en toute confiance</h2>
        </div>

        <div className="home-benefits-grid">
          <article className="home-benefit">
            <FiHeart aria-hidden="true" />
            <h3>Une sélection soignée</h3>
            <p>Des articles sélectionnés avec attention pour votre style.</p>
          </article>

          <article className="home-benefit">
            <FiMessageCircle aria-hidden="true" />
            <h3>Commande simple</h3>
            <p>Échangez directement avec nous pour préparer votre commande.</p>
          </article>

          <article className="home-benefit">
            <FiTruck aria-hidden="true" />
            <h3>Livraison à confirmer</h3>
            <p>Les modalités et frais de livraison sont confirmés avec vous.</p>
          </article>

          <article className="home-benefit">
            <FiShield aria-hidden="true" />
            <h3>Un contact direct</h3>
            <p>Votre commande est transmise directement par WhatsApp.</p>
          </article>
        </div>
      </section>

      {/* ── Avis clients ── */}
      <section className="home-reviews reveal" ref={avisRef}>
        <div className="home-section-heading">
          <p className="eyebrow">TÉMOIGNAGES</p>
          <h2>Les retours de nos clients</h2>
          <p>Votre satisfaction est notre plus belle récompense.</p>
        </div>

        <div className="home-reviews-grid">
          {avisClients.map((avis) => (
            <article key={avis.id} className="review-card">
              <div
                className="review-stars"
                aria-label={`${avis.note} étoiles sur 5`}
              >
                {"★".repeat(avis.note)}
              </div>
              <p className="review-comment">« {avis.commentaire} »</p>
              <div className="review-author">
                <span className="review-avatar" aria-hidden="true">
                  {avis.initiales}
                </span>
                <span className="review-name">{avis.nom}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
