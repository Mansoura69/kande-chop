import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMessageCircle, FiArrowLeft, FiShoppingCart, FiCheck } from "react-icons/fi";
import produits from "../data/produits.json";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetails.css";

const NUMERO_WHATSAPP = "2290167434268";

function ProductDetails() {
  const { id } = useParams();
  const produit = produits.find((item) => item.id === id);
  const { ajouterAuPanier } = useCart();
  const [ajoute, setAjoute] = useState(false);

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [taille, setTaille] = useState("");
  const [tailleAutre, setTailleAutre] = useState("");
  const [couleur, setCouleur] = useState("");
  const [couleurAutre, setCouleurAutre] = useState("");
  const [quantite, setQuantite] = useState("1");
  const [quartier, setQuartier] = useState("");
  const [informations, setInformations] = useState("");

  if (!produit) {
    return (
      <main className="page-content order-page">
        <h1>Produit introuvable</h1>
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>
        <Link to="/catalogue" className="back-link">
          <FiArrowLeft /> Retour au catalogue
        </Link>
      </main>
    );
  }

  if (!produit.disponible) {
    return (
      <main className="page-content order-page">
        <h1>{produit.nom}</h1>
        <p>Ce produit est actuellement indisponible.</p>
        <Link to="/catalogue" className="back-link">
          <FiArrowLeft /> Retour au catalogue
        </Link>
      </main>
    );
  }

  const quantiteValide = Math.max(1, Number(quantite) || 1);
  const prixTotal = produit.prix * quantiteValide;

  function handleAjouterAuPanier() {
    ajouterAuPanier(produit, 1);
    setAjoute(true);
    setTimeout(() => setAjoute(false), 1800);
  }

  function envoyerCommande(event) {
    event.preventDefault();

    const lignes = [
      "Bonjour KANDE CHOP Alhamdulillah, je souhaite commander :",
      "",
      `Produit : ${produit.nom}`,
      `Prix unitaire : ${produit.prix.toLocaleString("fr-FR")} FCFA`,
      `Quantité : ${quantiteValide}`,
    ];

    if (produit.tailles.length > 0) {
      lignes.push(
        `Taille souhaitée : ${
          taille === "autre" ? tailleAutre.trim() : taille
        }`,
      );
    }

    if (produit.couleurs.length > 0) {
      lignes.push(
        `Couleur souhaitée : ${
          couleur === "autre" ? couleurAutre.trim() : couleur
        }`,
      );
    }

    lignes.push(
      `Total des articles : ${prixTotal.toLocaleString("fr-FR")} FCFA`,
      "",
      `Nom complet : ${nom.trim()}`,
      `Téléphone : ${telephone.trim()}`,
      `Quartier de livraison : ${quartier.trim()}`,
    );

    if (informations.trim()) {
      lignes.push(`Informations supplémentaires : ${informations.trim()}`);
    }

    lignes.push(
      "",
      "Merci ! Je souhaite confirmer la disponibilité et les frais de livraison.",
    );

    const message = encodeURIComponent(lignes.join("\n"));
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${message}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="page-content order-page">
      <Link to="/catalogue" className="back-link">
        <FiArrowLeft /> Retour au catalogue
      </Link>

      <section className="order-layout">
        <div className="order-product">
          <img
            src={produit.images?.[0]}
            alt={produit.nom}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <p className="eyebrow">{produit.categorie}</p>
          <h1>{produit.nom}</h1>

          <p className="order-price">
            {produit.prix.toLocaleString("fr-FR")} FCFA
          </p>

          <button
            type="button"
            className={`add-to-cart-button add-to-cart-button--details${
              ajoute ? " add-to-cart-button--done" : ""
            }`}
            onClick={handleAjouterAuPanier}
          >
            {ajoute ? <FiCheck /> : <FiShoppingCart />}
            {ajoute ? "Ajouté au panier !" : "Ajouter au panier"}
          </button>

          <p>{produit.description}</p>
        </div>

        <form className="order-form" onSubmit={envoyerCommande}>
          <h2>Formulaire de commande</h2>
          <p>Remplissez vos informations pour commander cet article.</p>

          <label htmlFor="nom">Nom complet *</label>
          <input
            id="nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            autoComplete="name"
            required
          />

          <label htmlFor="telephone">Numéro de téléphone *</label>
          <input
            id="telephone"
            type="tel"
            value={telephone}
            onChange={(event) => setTelephone(event.target.value)}
            autoComplete="tel"
            required
          />

          {produit.tailles.length > 0 && (
            <>
              <label htmlFor="taille">Taille souhaitée *</label>
              <select
                id="taille"
                value={taille}
                onChange={(event) => setTaille(event.target.value)}
                required
              >
                <option value="">Choisir une taille</option>
                {produit.tailles.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="autre">Autre taille</option>
              </select>

              {taille === "autre" && (
                <>
                  <label htmlFor="tailleAutre">Précisez la taille *</label>
                  <input
                    id="tailleAutre"
                    value={tailleAutre}
                    onChange={(event) => setTailleAutre(event.target.value)}
                    required
                  />
                </>
              )}
            </>
          )}

          {produit.couleurs.length > 0 && (
            <>
              <label htmlFor="couleur">Couleur souhaitée *</label>
              <select
                id="couleur"
                value={couleur}
                onChange={(event) => setCouleur(event.target.value)}
                required
              >
                <option value="">Choisir une couleur</option>
                {produit.couleurs.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="autre">Autre couleur</option>
              </select>

              {couleur === "autre" && (
                <>
                  <label htmlFor="couleurAutre">Précisez la couleur *</label>
                  <input
                    id="couleurAutre"
                    value={couleurAutre}
                    onChange={(event) => setCouleurAutre(event.target.value)}
                    required
                  />
                </>
              )}
            </>
          )}

          <label htmlFor="quantite">Quantité *</label>
          <input
            id="quantite"
            type="number"
            min="1"
            step="1"
            value={quantite}
            onChange={(event) => setQuantite(event.target.value)}
            required
          />

          <label htmlFor="quartier">Quartier de livraison *</label>
          <input
            id="quartier"
            value={quartier}
            onChange={(event) => setQuartier(event.target.value)}
            autoComplete="address-level3"
            required
          />

          <label htmlFor="informations">
            Informations supplémentaires (facultatif)
          </label>
          <textarea
            id="informations"
            value={informations}
            onChange={(event) => setInformations(event.target.value)}
            rows="3"
          />

          <div className="order-total">
            <span>Total des articles</span>
            <strong>{prixTotal.toLocaleString("fr-FR")} FCFA</strong>
          </div>

          <p className="delivery-note">
            Les frais de livraison seront confirmés par la vendeuse.
          </p>

          <button type="submit" className="send-order-button">
            <FiMessageCircle />
            Envoyer ma commande sur WhatsApp
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProductDetails;
