import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiCheck } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../styles/ProductCard.css";

/* Icône WhatsApp inline — pas de dépendance supplémentaire */
function WhatsAppIcon({ size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.529 5.857L.057 23.804a.5.5 0 0 0 .61.638l6.124-1.604A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.853 9.853 0 0 1-5.031-1.378l-.36-.214-3.733.979.997-3.648-.235-.374A9.86 9.86 0 0 1 2.1 12C2.1 6.533 6.533 2.1 12 2.1S21.9 6.533 21.9 12 17.467 21.9 12 21.9z"/>
    </svg>
  );
}

function ProductCard({ produit }) {
  const { ajouterAuPanier } = useCart();
  const [ajoute, setAjoute] = useState(false);

  function handleAjouterAuPanier(event) {
    // Empêche toute navigation ou propagation vers la carte
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
        {produit.nouveaute && (
          <span className="product-badge">Nouveauté</span>
        )}
        {!produit.disponible && (
          <span className="product-badge product-badge-unavailable">
            Indisponible
          </span>
        )}
        <img
          src={produit.images?.[0]}
          alt={produit.nom}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="product-card-content">
        <p className="product-category">{produit.categorie}</p>
        <h2>{produit.nom}</h2>
        <p className="product-price">
          {new Intl.NumberFormat("fr-FR").format(produit.prix)} FCFA
        </p>

        {/* Bouton Ajouter au panier — type="button" empêche tout submit accidentel */}
        <button
          type="button"
          className={`add-to-cart-button${
            ajoute ? " add-to-cart-button--done" : ""
          }`}
          onClick={handleAjouterAuPanier}
          disabled={!produit.disponible}
          aria-label={`Ajouter ${produit.nom} au panier`}
        >
          {ajoute ? <FiCheck /> : <FiShoppingCart />}
          {ajoute ? "Ajouté !" : "Ajouter au panier"}
        </button>

        {/* Lien vers la fiche produit pour commande directe WhatsApp */}
        <Link
          to={`/produit/${produit.id}`}
          className="product-order-button whatsapp-pulse"
          aria-label={`Commander ${produit.nom} par WhatsApp`}
          onClick={(event) => {
            if (!produit.disponible) {
              event.preventDefault();
            }
          }}
          aria-disabled={!produit.disponible}
        >
          {produit.disponible ? (
            <>
              <WhatsAppIcon size={15} />
              Commander
            </>
          ) : (
            "Indisponible"
          )}
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
