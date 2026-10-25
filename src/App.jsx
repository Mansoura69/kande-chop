import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <PageTransition>
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
      </PageTransition>

      <Footer />
    </>
  );
}

export default App;
