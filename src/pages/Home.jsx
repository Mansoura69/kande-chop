import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiTruck,
  FiHeart,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";
import heroPic from "../assets/Ac.jpg";
import produits from "../data/produits.json";
import ProductCard from "../components/ProductCard";
import { useReveal } from "../utils/useReveal";
import "../styles/Home.css";

/* -------------------------------------------------------
   Avis clients — données de démonstration.
   À remplacer par de vrais témoignages avec l'accord
   des personnes concernées avant publication.
   ------------------------------------------------------- */
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

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-circle" />
      <img
        src={heroPic}
        alt=""
        className="hero-photo"
      />
    </div>
  );
}

function Home() {
  const nouveautes = produits
    .filter((produit) => produit.nouveaute && produit.disponible)
    .slice(0, 4);

  const categoriesRef = useReveal();
  const newProductsRef = useReveal();
  const benefitsRef = useReveal();
  const avisRef = useReveal();

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="eyebrow">KANDE CHOP ALHAMDULILLAH</p>

          <h1>
            Votre élégance,
            <br />
            <span>notre passion.</span>
          </h1>

          <p className="home-hero-description">
            Découvrez une sélection de chaussures, voiles, pagnes et accessoires
            choisis avec soin pour sublimer votre style.
          </p>

          <p className="home-hero-blessing">Alhamdulillah.</p>

          <Link to="/catalogue" className="home-hero-button">
            Découvrir la boutique <FiArrowRight />
          </Link>
        </div>

        <HeroVisual />
      </section>

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

      <section className="home-new-products reveal reveal-delay-1" ref={newProductsRef}>
        <div className="home-section-heading">
          <p className="eyebrow">À DÉCOUVRIR</p>
          <h2>Nos nouveautés</h2>
          <p>Découvrez les articles récemment sélectionnés pour vous.</p>
        </div>

        {nouveautes.length > 0 ? (
          <div className="product-grid">
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

      {/* ---- Section avis clients ---- */}
      <section className="home-reviews reveal" ref={avisRef}>
        <div className="home-section-heading">
          <p className="eyebrow">TÉMOIGNAGES</p>
          <h2>Les retours de nos clients</h2>
          <p>Votre satisfaction est notre plus belle récompense.</p>
        </div>

        <div className="home-reviews-grid">
          {avisClients.map((avis) => (
            <article key={avis.id} className="review-card">
              <div className="review-stars" aria-label={`${avis.note} étoiles sur 5`}>
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
