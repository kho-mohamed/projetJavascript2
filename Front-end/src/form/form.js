import "../assets/styles/styles.scss";
import { env } from "../../config/env.js";

// Vérification du rôle utilisateur
const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
if (!utilisateur || utilisateur.role !== "admin") {
  Alert.erreur("Accès interdit. Réservé aux administrateurs.");
  window.location.href = "/";
}

// Variables
const form = document.querySelector(".form");
const baliseErreurs = document.querySelector("#erreurs");
const btnAnnuler = document.querySelector(".btn-secondary");
let produitId;
let erreurs = [];

// Initialisation du formulaire
const initialisationFormulaire = async () => {
  const params = new URL(window.location.href);
  produitId = params.searchParams.get("id");
  if (produitId) {
    const response = await fetch(`${env.BACKEND_PRODUCTS_URL}/${produitId}`);
    if (response.status < 300) {
      const produit = await response.json();
      envoiFormulaire(produit);
    }
  }
};
initialisationFormulaire();

// Remplir le formulaire si on modifie un produit
const envoiFormulaire = (produit) => {
  document.querySelector("#nom").value = produit.nom || "";
  document.querySelector("#prix").value = produit.prix || "";
  document.querySelector("#image").value = produit.image || "";
  document.querySelector("#description").value = produit.description || "";
};

// Événement lors de la soumission du formulaire
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dataFormulaire = new FormData(form);
  const nouvelArticle = Object.fromEntries(dataFormulaire.entries());

  if (validationFormulaire(nouvelArticle)) {
    try {
      const json = JSON.stringify(nouvelArticle);
      let response;

      if (produitId) {
        // Mise à jour du produit
        response = await fetch(`${env.BACKEND_PRODUCTS_URL}/${produitId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            utilisateur: JSON.stringify(utilisateur), // <- Ajout ici
          },
          body: json,
        });
      } else {
        // Création d'un nouveau produit
        response = await fetch(`${env.BACKEND_PRODUCTS_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            utilisateur: JSON.stringify(utilisateur), // <- Ajout ici
          },
          body: json,
        });
      }

      if (response.status < 300) {
        window.location.assign("./produit.html");
      } else {
        const erreur = await response.json();
        Alert.erreur(erreur.message || "Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      Alert.erreur("Une erreur est survenue.");
    }
  }
});

// Fonctions de validation
function validationPrix(prixChaine) {
  if (!prixChaine) return "Vous n'avez pas renseigné le prix.";
  const regex = /^(?:0|[1-9]?[0-9]{1,2}|1[0-9]{3})$/;
  if (!regex.test(prixChaine))
    return "Le format du prix est incorrect. Il doit être un nombre entier positif et 1999 au maximum.";
  if (parseFloat(prixChaine) <= 0) return "Le prix doit être supérieur à 0.";
  return true;
}

function validationNom(nom) {
  if (!nom) return "Vous n'avez pas renseigné le nom.";
  const regex = /^[a-zA-Z0-9\s-]{1,50}$/;
  if (!regex.test(nom))
    return "Le nom doit contenir entre 1 et 50 caractères alphanumériques, espaces ou tirets.";
  return true;
}

const validationFormulaire = (article) => {
  erreurs = [];
  if (!article.nom || !article.prix || !article.image || !article.description) {
    erreurs.push("Tous les champs sont obligatoires.");
  }

  const validNom = validationNom(article.nom);
  if (validNom !== true) erreurs.push(validNom);

  const validPrix = validationPrix(article.prix);
  if (validPrix !== true) erreurs.push(validPrix);

  if (article.description.length < 10 || article.description.length > 500) {
    erreurs.push("La description doit contenir entre 10 et 500 caractères.");
  }

  if (erreurs.length) {
    baliseErreurs.innerHTML = erreurs.map((e) => `<li>${e}</li>`).join("");
    return false;
  } else {
    baliseErreurs.innerHTML = "";
    return true;
  }
};
