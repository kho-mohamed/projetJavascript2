import "../assets/styles/styles.scss";
import { env } from "../../config/env.js";

// variables:

const form = document.querySelector(".form");
const baliseErreurs = document.querySelector("#erreurs");
const btnAnnuler = document.querySelector(".btn-secondary");
let produitId;
let erreurs = [];

const initialisationFormulaire = async () => {
  const params = new URL(window.location.href);
  produitId = params.searchParams.get("id");
  if (produitId) {
    // Si un id de produit est présent dans l'URL, on remplit le formulaire
    // avec les données du produit correspondant.
    if (produitId) {
      const response = await fetch(`${env.BACKEND_PRODUCTS_URL}/${produitId}`);
      if (response.status < 300) {
        // Si la réponse est correcte, on transforme la réponse en JSON
        // et on appelle la fonction pour remplir le formulaire.
        // On utilise la fonction envoiFormulaire pour remplir le formulaire
        // avec les données du produit.
        const produit = await response.json();
        envoiFormulaire(produit);
      }
    }
  }
};

initialisationFormulaire();

// Fonction pour remplir le formulaire avec les données du produit
const envoiFormulaire = (produit) => {
  const nomInput = document.querySelector("#nom");
  const prixInput = document.querySelector("#prix");
  const imageInput = document.querySelector("#image");
  const descriptionInput = document.querySelector("#description");
  nomInput.value = produit.nom || "";
  prixInput.value = produit.prix || "";
  imageInput.value = produit.image || "";
  descriptionInput.value = produit.description || "";
};

// Écouteur d'événement pour le formulaire
// Lorsque le formulaire est soumis, on empêche le comportement par défaut (rechargement de la page)
// et on récupère les données du formulaire pour les valider.

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dataFormulaire = new FormData(form);
  const nouvelArticle = Object.fromEntries(dataFormulaire.entries());

  if (validationFormulaire(nouvelArticle)) {
    try {
      const json = JSON.stringify(nouvelArticle);
      console.log("json :", json);
      let response;
      if (produitId) {
        // Si un id de produit est présent dans l'URL, on met à jour le produit
        response = await fetch(`${env.BACKEND_PRODUCTS_URL}/${produitId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: json,
        });
      } else {
        // Si aucun id de produit n'est présent dans l'URL, on crée un nouveau produit
        response = await fetch(`${env.BACKEND_PRODUCTS_URL}`, {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (response.status < 300) {
        // Si la réponse est correcte, on redirige vers la page des produits
        window.location.assign("./produit.html");
      }
    } catch (error) {
      console.log("ereur :", error);
    }
  }
});

function validationPrix(prixChaine) {
  // Tester la présence d'un prix
  if (!prixChaine) {
    return "Vous n'avez pas renseigné le prix.";
  }

  // valider si un prix est valide comme chiffre:
  const regex = /^(?:0|[1-9]?[0-9]{1,2}|1[0-9]{3})$/;
  if (!regex.test(prixChaine)) {
    return "Le format du prix est incorrect. Il doit être un nombre entier positif et 1999 au maximum.";
  }

  // convertir prix en nombre
  const prixNb = parseFloat(prixChaine);

  // valider si le prix est supérieur à 0
  if (prixNb <= 0) {
    return "Le prix doit être supérieur à 0.";
  }
  return true;
}

function validationNom(nom) {
  // Tester la présence d'un nom
  if (!nom) {
    return "Vous n'avez pas renseigné le nom.";
  }

  // valider si un nom est valide:
  const regex = /^[a-zA-Z0-9\s-]{1,50}$/;
  if (!regex.test(nom)) {
    return "Le nom doit contenir entre 1 et 50 caractères alphanumériques, espaces ou tirets.";
  }
  return true;
}

const validationFormulaire = (article) => {
  erreurs = [];
  if (!article.nom || !article.prix || !article.image || !article.description) {
    erreurs.push("Tous les champs sont obligatoires.");
  }
  let validNom = validationNom(article.nom);
  if (article.nom && validNom !== true) {
    erreurs.push(validNom);
  }
  let validPrix = validationPrix(article.prix);
  if (article.prix && validPrix !== true) {
    erreurs.push(validPrix);
  }
  if (article.description.length < 10 || article.description.length > 500) {
    erreurs.push("La description doit contenir entre 10 et 500 caractères.");
  }

  if (erreurs.length) {
    let erreursHTML = "";
    erreurs.forEach((erreur) => {
      erreursHTML += `<li>${erreur}</li>`;
    });
    baliseErreurs.innerHTML = erreursHTML;
    return false;
  } else {
    baliseErreurs.innerHTML = "";
    return true;
  }
};
