import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalog />} />
        <Route path="/produit/:id" element={<ProductDetails />} />
        <Route path="/panier" element={<Cart />} />
        <Route
          path="*"
          element={
            <main className="page-content">
              <h1>Page introuvable</h1>
              <a href="/">Retour à l'accueil</a>
            </main>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
