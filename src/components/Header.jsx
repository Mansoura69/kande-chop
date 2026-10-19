import { FiShoppingBag, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

function Header() {
  const { nbArticles } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo">
        KANDE <span>CHOP</span>
        <small>ALHAMDULILLAH</small>
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
            <span className="cart-badge" aria-hidden="true">
              {nbArticles}
            </span>
          )}
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label="Ouvrir le menu"
        >
          <FiMenu />
        </button>
      </div>
    </header>
  );
}

export default Header;
