import { useState, useEffect, useRef } from "react";
import { FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logoSrc from "../assets/logo.svg";
import "../styles/Header.css";

const NAV_LIENS = [
  { to: "/", label: "Accueil", end: true },
  { to: "/catalogue", label: "Catalogue", end: false },
  { to: "/panier", label: "Panier", end: false },
];

function Header() {
  const { nbArticles } = useCart();
  const location = useLocation();

  /* ---- Badge panier animé ---- */
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

  /* ---- Menu hamburger mobile ---- */
  const [menuOuvert, setMenuOuvert] = useState(false);
  const menuRef = useRef(null);

  // Fermer au changement de route (ex : clic sur un lien)
  useEffect(() => {
    setMenuOuvert(false);
  }, [location]);

  // Fermer au clic en dehors du menu
  useEffect(() => {
    if (!menuOuvert) return;
    function handleClickDehors(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOuvert(false);
      }
    }
    document.addEventListener("mousedown", handleClickDehors);
    document.addEventListener("touchstart", handleClickDehors);
    return () => {
      document.removeEventListener("mousedown", handleClickDehors);
      document.removeEventListener("touchstart", handleClickDehors);
    };
  }, [menuOuvert]);

  // Fermer à la touche Escape
  useEffect(() => {
    if (!menuOuvert) return;
    function handleEscape(e) {
      if (e.key === "Escape") setMenuOuvert(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOuvert]);

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOuvert]);

  return (
    <header className="header" ref={menuRef}>
      {/* Logo */}
      <Link
        to="/"
        className="logo-link"
        aria-label="KANDE CHOP ALHAMDULILLAH — Accueil"
      >
        <img
          src={logoSrc}
          alt="KANDE CHOP ALHAMDULILLAH"
          className="logo-img"
          width="200"
          height="auto"
        />
      </Link>

      {/* Navbar desktop — masquée sur mobile via CSS */}
      <nav className="navbar" aria-label="Navigation principale">
        {NAV_LIENS.map((lien) => (
          <NavLink key={lien.to} to={lien.to} end={lien.end}>
            {lien.label}
          </NavLink>
        ))}
      </nav>

      {/* Actions droite : icône panier (toujours visible) + bouton hamburger (mobile seulement) */}
      <div className="header-actions">
        {/* Icône panier — toujours présente */}
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

        {/* Bouton hamburger — visible uniquement sur mobile */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuOuvert((v) => !v)}
          aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOuvert}
          aria-controls="mobile-menu"
        >
          {menuOuvert ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menu déroulant mobile */}
      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOuvert ? " mobile-menu--open" : ""}`}
        aria-label="Menu mobile"
        aria-hidden={!menuOuvert}
      >
        {NAV_LIENS.map((lien) => (
          <NavLink
            key={lien.to}
            to={lien.to}
            end={lien.end}
            className={({ isActive }) =>
              `mobile-menu-link${isActive ? " mobile-menu-link--active" : ""}`
            }
            tabIndex={menuOuvert ? 0 : -1}
          >
            {lien.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
