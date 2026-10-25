import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiMessageCircle,
  FiPlus,
  FiMinus,
  FiArrowLeft,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const NUMERO_WHATSAPP = "2290167434268";

function Cart() {
  const {
    lignes,
    nbArticles,
    total,
    augmenterQuantite,
    diminuerQuantite,
    supprimerDuPanier,
    viderLePanier,
  } = useCart();

  // IDs des articles en cours de suppression (animation en cours)
  const [supprimant, setSupprimant] = useState(new Set());

  function handleSupprimer(id) {
    // Démarre l'animation de sortie
    setSupprimant((prev) => new Set(prev).add(id));
    // Supprime réellement après la durée de l'animation (280ms)
    setTimeout(() => {
      supprimerDuPanier(id);
      setSupprimant((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 280);
  }

  function envoyerCommandeGroupee() {
    if (lignes.length === 0) return;

    const lignesMessage = lignes.map((ligne, index) => {
      const sousTotal = ligne.prix * ligne.quantite;
      return [
        `${index + 1}. ${ligne.nom}`,
        `   - Quantité : ${ligne.quantite}`,
        `   - Prix unitaire : ${ligne.prix.toLocaleString("fr-FR")} FCFA`,
        `   - Sous-total : ${sousTotal.toLocaleString("fr-FR")} FCFA`,
      ].join("\n");
    });

    const message = [
      "Bonjour KANDE CHOP ALHAMDULILLAH, je souhaite commander les articles suivants :",
      "",
      ...lignesMessage,
      "",
      `Total des articles : ${total.toLocaleString("fr-FR")} FCFA`,
      "",
      "Merci de me confirmer la disponibilité des articles et les frais de livraison.",
    ].join("\n");

    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleVider() {
    if (
      window.confirm(
        "Vider votre panier ? Cette action supprimera tous les articles."
      )
    ) {
      viderLePanier();
    }
  }

  if (lignes.length === 0) {
    return (
      <main className="page-content cart-page">
        <h1 className="cart-title">Mon panier</h1>
        <div className="cart-empty">
          <FiShoppingCart className="cart-empty-icon" aria-hidden="true" />
          <h2>Votre panier est vide</h2>
          <p>Vous n'avez encore ajouté aucun article à votre panier.</p>
          <Link to="/catalogue" className="cart-discover-button">
            <FiArrowLeft />
            Découvrir nos produits
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Mon panier</h1>
        <span className="cart-count">
          {nbArticles} article{nbArticles > 1 ? "s" : ""}
        </span>
      </div>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Articles dans le panier">
          {lignes.map((ligne) => {
            const sousTotal = ligne.prix * ligne.quantite;
            const enSuppression = supprimant.has(ligne.id);
            return (
              <article
                key={ligne.id}
                className={`cart-item${enSuppression ? " cart-item--removing" : ""}`}
              >
                <div className="cart-item-image">
                  {ligne.image && (
                    <img
                      src={ligne.image}
                      alt={ligne.nom}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>

                <div className="cart-item-info">
                  <p className="cart-item-category">{ligne.categorie}</p>
                  <h2 className="cart-item-name">{ligne.nom}</h2>
                  <p className="cart-item-price">
                    {ligne.prix.toLocaleString("fr-FR")} FCFA
                  </p>

                  <div className="cart-item-controls">
                    <div className="cart-quantity">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => diminuerQuantite(ligne.id)}
                        aria-label={`Diminuer la quantité de ${ligne.nom}`}
                      >
                        <FiMinus />
                      </button>
                      <span
                        className="cart-qty-value"
                        aria-label={`Quantité : ${ligne.quantite}`}
                      >
                        {ligne.quantite}
                      </span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => augmenterQuantite(ligne.id)}
                        aria-label={`Augmenter la quantité de ${ligne.nom}`}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <p className="cart-item-subtotal">
                      {sousTotal.toLocaleString("fr-FR")} FCFA
                    </p>

                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => handleSupprimer(ligne.id)}
                      aria-label={`Supprimer ${ligne.nom} du panier`}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="cart-actions-secondary">
            <Link to="/catalogue" className="cart-continue-link">
              <FiArrowLeft />
              Continuer mes achats
            </Link>
            <button
              type="button"
              className="cart-clear-btn"
              onClick={handleVider}
            >
              <FiTrash2 />
              Vider le panier
            </button>
          </div>
        </section>

        <aside
          className="cart-summary"
          aria-label="Récapitulatif de la commande"
        >
          <h2 className="cart-summary-title">Récapitulatif</h2>

          <div className="cart-summary-line">
            <span>Articles ({nbArticles})</span>
            <span>{total.toLocaleString("fr-FR")} FCFA</span>
          </div>

          <div className="cart-summary-line cart-summary-delivery">
            <span>Livraison</span>
            <span className="cart-delivery-note">À confirmer</span>
          </div>

          <div className="cart-summary-total">
            <span>Total articles</span>
            <strong>{total.toLocaleString("fr-FR")} FCFA</strong>
          </div>

          <p className="cart-delivery-info">
            Les frais de livraison seront confirmés par la vendeuse.
          </p>

          <button
            type="button"
            className="cart-whatsapp-btn whatsapp-pulse"
            onClick={envoyerCommandeGroupee}
          >
            <FiMessageCircle />
            Commander sur WhatsApp
          </button>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
