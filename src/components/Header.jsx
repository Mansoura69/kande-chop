import { useState, useEffect, useRef } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import logoSrc from "../assets/logo.svg";
import "../styles/Header.css";

function Header() {
  const { nbArticles } = useCart();

  const [popping, setPopping] = useState(false);
  const prevNb = useRef(nbArticles);
  useEffect(() => {
    if (nbArticles > prevNb.current) {
      setPopping(true);
      const t = setTimeout(() => setPopping(false), 450);
      prevNb.current = nbArticles;
      return () => clearTimeout(t);
    }
    prevNb.current = nbArticles;
  }, [nbArticles]);

  return (
    <header className="header">
      <Link to="/" className="logo-link" aria-label="KANDE CHOP ALHAMDULILLAH — Accueil">
        <img
          src={logoSrc}
          alt="KANDE CHOP ALHAMDULILLAH"
          className="logo-img"
          width="200"
          height="auto"
        />
      </Link>

      <Navbar />

      <div className="header-actions">
        <Link
          to="/panier"
          aria-label={`Voir le panier${
            nbArticles > 0
              ? `, ${nbArticles} article${nbArticles > 1 ? "s" : ""}`
              : ""
          }`}
          className="cart-link"
        >
          <FiShoppingBag />
          {nbArticles > 0 && (
            <span
              className={`cart-badge${popping ? " cart-badge--pop" : ""}`}
              aria-hidden="true"
            >
              {nbArticles}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
