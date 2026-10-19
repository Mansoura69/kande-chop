import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "kande-chop-panier";

function chargerPanier() {
  try {
    const donnees = localStorage.getItem(STORAGE_KEY);
    if (!donnees) return [];
    const parsed = JSON.parse(donnees);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (ligne) =>
        typeof ligne.id === "string" &&
        typeof ligne.nom === "string" &&
        typeof ligne.prix === "number" &&
        typeof ligne.quantite === "number" &&
        ligne.quantite >= 1
    );
  } catch {
    return [];
  }
}

function sauvegarderPanier(lignes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lignes));
  } catch {
    // Ignorer les erreurs d'écriture
  }
}

function panierReducer(state, action) {
  switch (action.type) {
    case "AJOUTER": {
      const { produit, quantite = 1 } = action;
      const existant = state.find((l) => l.id === produit.id);
      if (existant) {
        return state.map((l) =>
          l.id === produit.id
            ? { ...l, quantite: l.quantite + quantite }
            : l
        );
      }
      return [
        ...state,
        {
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          image: produit.images?.[0] ?? "",
          categorie: produit.categorie,
          quantite,
        },
      ];
    }
    case "AUGMENTER": {
      return state.map((l) =>
        l.id === action.id ? { ...l, quantite: l.quantite + 1 } : l
      );
    }
    case "DIMINUER": {
      return state.map((l) =>
        l.id === action.id
          ? { ...l, quantite: Math.max(1, l.quantite - 1) }
          : l
      );
    }
    case "SUPPRIMER": {
      return state.filter((l) => l.id !== action.id);
    }
    case "VIDER": {
      return [];
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [lignes, dispatch] = useReducer(panierReducer, [], chargerPanier);

  useEffect(() => {
    sauvegarderPanier(lignes);
  }, [lignes]);

  function ajouterAuPanier(produit, quantite = 1) {
    if (!produit.disponible) return;
    dispatch({ type: "AJOUTER", produit, quantite });
  }

  function augmenterQuantite(id) {
    dispatch({ type: "AUGMENTER", id });
  }

  function diminuerQuantite(id) {
    dispatch({ type: "DIMINUER", id });
  }

  function supprimerDuPanier(id) {
    dispatch({ type: "SUPPRIMER", id });
  }

  function viderLePanier() {
    dispatch({ type: "VIDER" });
  }

  const nbArticles = lignes.reduce((acc, l) => acc + l.quantite, 0);
  const total = lignes.reduce((acc, l) => acc + l.prix * l.quantite, 0);

  return (
    <CartContext.Provider
      value={{
        lignes,
        nbArticles,
        total,
        ajouterAuPanier,
        augmenterQuantite,
        diminuerQuantite,
        supprimerDuPanier,
        viderLePanier,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
