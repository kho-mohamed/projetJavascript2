import "../assets/styles/styles.scss";

const form = document.querySelector(".form");
const baliseErreurs = document.querySelector("#erreurs");
let erreurs = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const dataFormulaire = new FormData(form);
  const { login, password } = Object.fromEntries(dataFormulaire.entries());

  console.log("🔐 Tentative de connexion avec:", {
    login,
    password: "***masqué***",
  });

  erreurs = [];

  if (!login || !password) {
    erreurs.push("Tous les champs sont obligatoires.");
    afficherErreurs(erreurs);
    return;
  }

  try {
    console.log("📡 Envoi de la requête d'authentification...");
    const response = await fetch(
      "http://localhost:5252/utilisateur/authentification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      }
    );

    console.log("📨 Réponse reçue:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("❌ Erreur d'authentification:", errorData);

      if (response.status === 401) {
        erreurs.push("Login ou mot de passe invalide.");
      } else {
        erreurs.push(
          "Erreur de connexion: " +
            (errorData.message || errorData.error || "Erreur inconnue")
        );
      }
      afficherErreurs(erreurs);
      return;
    }

    const utilisateur = await response.json();
    console.log("✅ Connexion réussie pour:", utilisateur);

    localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
    alert(`Connexion réussie ! Bienvenue ${utilisateur.nom}`);

    // Redirection selon le rôle de l'utilisateur
    if (utilisateur.role === "admin") {
      window.location.href = "../index.html"; // ou vers une page admin
    } else {
      window.location.href = "../index.html"; // page d'accueil
    }
  } catch (error) {
    console.error("💥 Erreur réseau:", error);
    erreurs.push("Erreur réseau ou serveur. Vérifiez votre connexion.");
    afficherErreurs(erreurs);
  }
});

function afficherErreurs(erreurs) {
  let erreursHTML = "";
  erreurs.forEach((erreur) => {
    erreursHTML += `<li>${erreur}</li>`;
  });
  baliseErreurs.innerHTML = erreursHTML;
}
