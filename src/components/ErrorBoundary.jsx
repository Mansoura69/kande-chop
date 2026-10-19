import { Component } from "react";

/**
 * Error Boundary : capture les erreurs React non gérées
 * et affiche un message clair au lieu d'une page blanche.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { erreur: null };
  }

  static getDerivedStateFromError(erreur) {
    return { erreur };
  }

  componentDidCatch(erreur, info) {
    // Logue l'erreur pour le débogage sans planter l'interface
    console.error("[KANDE CHOP] Erreur non gérée :", erreur, info);
  }

  render() {
    if (this.state.erreur) {
      return (
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            padding: "40px 24px",
            textAlign: "center",
            fontFamily: "DM Sans, Arial, sans-serif",
            color: "#5a4a42",
          }}
        >
          <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", marginBottom: 12 }}>
            Une erreur est survenue
          </h1>
          <p style={{ color: "#6b5b53", marginBottom: 24 }}>
            Veuillez recharger la page ou retourner à l'accueil.
          </p>
          <a
            href="/"
            style={{
              padding: "10px 22px",
              borderRadius: 5,
              background: "#e8b4bc",
              color: "#5a4a42",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Retour à l'accueil
          </a>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
