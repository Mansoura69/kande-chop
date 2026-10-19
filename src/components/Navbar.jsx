import { NavLink } from "react-router-dom"; // NavLink permet de naviguer entre les pages sans recharger tout le site. Nous ajouterons ensuite un indicateur visuel pour la page active.

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Accueil
      </NavLink>

      <NavLink to="/catalogue">Catalogue</NavLink>

      <NavLink to="/panier">Panier</NavLink>
    </nav>
  );
}

export default Navbar;
