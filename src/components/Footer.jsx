import { Link } from "react-router-dom";
import {
  FiMessageCircle,
  FiMapPin,
  FiClock,
  FiArrowUpRight,
} from "react-icons/fi";
import "../styles/Footer.css";

function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            KANDE CHOP
            <span>ALHAMDULILLAH</span>
          </Link>

          <p className="footer-slogan">
            Votre élégance, notre passion. Alhamdulillah.
          </p>

          <p className="footer-description">
            Découvrez notre sélection de chaussures, voiles, pagnes et
            accessoires pour sublimer votre style au quotidien.
          </p>
        </div>

        <div className="footer-column">
          <h2>Navigation</h2>
          <Link to="/">Accueil</Link>
          <Link to="/catalogue">Notre boutique</Link>
          <Link to="/catalogue?categorie=chaussures">Chaussures</Link>
          <Link to="/catalogue?categorie=voiles">Voiles</Link>
          <Link to="/catalogue?categorie=pagnes">Pagnes</Link>
          <Link to="/catalogue?categorie=accessoires">Accessoires</Link>
        </div>

        <div className="footer-column">
          <h2>À votre service</h2>

          <a
            href="https://wa.me/2290167434268"
            target="_blank"
            rel="noreferrer"
          >
            <FiMessageCircle />
            Nous contacter sur WhatsApp
            <FiArrowUpRight className="footer-external-icon" />
          </a>

          <p>
            <FiMapPin />
            Livraison : modalités à confirmer avec la vendeuse
          </p>

          <p>
            <FiClock />
            Horaires : à confirmer
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {annee} KANDE CHOP Alhamdulillah. Tous droits réservés.</p>

        <Link to="/catalogue" className="footer-shop-link">
          Découvrir la boutique <FiArrowUpRight />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
