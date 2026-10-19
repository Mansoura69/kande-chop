import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiShoppingCart, FiCheck } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ produit }) {
  const { ajouterAuPanier } = useCart();
  const [ajoute, setAjoute] = useState(false);

  function handleAjouterAuPanier(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!produit.disponible || ajoute) return;
    ajouterAuPanier(produit, 1);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1800);
  }

  return (
    <article className="product-card">
      <div className="product-card-image">
        {produit.nouveaute && <span className="product-badge">Nouveauté</span>}
        {!produit.disponible && (
          <span className="product-badge product-badge-unavailable">Indisponible</span>
        )}
        <img
          src={produit.images?.[0]}
          alt={produit.nom}
          loading="lazy"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      </div>

      <div className="product-card-content">
        <p className="product-category">{produit.categorie}</p>
        <h2>{produit.nom}</h2>
        <p className="product-price">
          {new Intl.NumberFormat("fr-FR").format(produit.prix)} FCFA
        </p>

        <button
          type="button"
          className={`add-to-cart-button${ajoute ? " add-to-cart-button--done" : ""}`}
          onClick={handleAjouterAuPanier}
          disabled={!produit.disponible}
          aria-label={`Ajouter ${produit.nom} au panier`}
        >
          {ajoute ? <FiCheck /> : <FiShoppingCart />}
          {ajoute ? "Ajouté !" : "Ajouter au panier"}
        </button>

        <Link
          to={`/produit/${produit.id}`}
          className="product-order-button"
          aria-label={`Commander ${produit.nom} par WhatsApp`}
          onClick={(event) => { if (!produit.disponible) { event.preventDefault(); } }}
          aria-disabled={!produit.disponible}
        >
          <FiShoppingBag />
          {produit.disponible ? "Commander par WhatsApp" : "Indisponible"}
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
