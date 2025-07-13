import "../assets/styles/styles.scss";
import { env } from "../../config/env.js";

// variables:

const form = document.querySelector(".form");
const baliseErreurs = document.querySelector("#erreurs");
let erreurs = [];

// Écouteur d'événement pour le formulaire
// Lorsque le formulaire est soumis, on empêche le comportement par défaut (rechargement de la page)
// et on récupère les données du formulaire pour les valider.

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dataFormulaire = new FormData(form);
  const nvUtilisateur = Object.fromEntries(dataFormulaire.entries());
  nvUtilisateur.role = "utilisateur";
  console.log(nvUtilisateur); // ← AJOUT

  if (!nvUtilisateur.login || !nvUtilisateur.password || !nvUtilisateur.nom || !nvUtilisateur.email) {
    alert("Les champs login, mot de passe, nom et email sont requis.");
    return;
  }

  if (!env.BACKEND_USERS_URL) {
    console.error("L'URL de l'API utilisateur est undefined !");
    alert("Erreur de configuration : l'URL de l'API utilisateur est manquante.");
    return;
  }

  if (validationFormulaire(nvUtilisateur)) {
    const json = JSON.stringify(nvUtilisateur);
    console.log("json :", json);
    console.log(env.BACKEND_USERS_URL);
    let response;
    try {
      response = await fetch(env.BACKEND_USERS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });

      if (response.status < 300) {
        alert("Inscription réussie !");
        // Si la réponse est correcte, on transforme la réponse en JSON
        // et on redirige l'utilisateur vers la page d'accueil.
        const utilisateur = await response.json();
        localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
        window.location.assign("./index.html");
      } else {
        const errorData = await response.json();
        alert("Erreur : " + (errorData.error || "Requête invalide"));
      }
    } catch (error) {
      alert("Erreur de communication avec le serveur : " + error.message);
    }
  }
});

function validationPass(password) {
  // Tester la présence d'un password
  if (!password) {
    return "Le mot de passe est obligatoire pour s’inscrire.";
  }

  // valider si un prix est valide comme chiffre:
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!regex.test(password)) {
    return "Le mot de passe doit contenir au moins 8 caractères, dont au moins un chiffre, une lettre et un caractère spécial.";
  }

  return true;
}

function validationLogin(login) {
  // Tester la présence d'un login
  if (!login) {
    return "le login est obligatoire pour se connecter.";
  }

  // valider si un login est valide:
  const regex = /^[a-zA-Z0-9\s-]{1,50}$/;
  if (!regex.test(login)) {
    return "Le login doit contenir entre 1 et 50 caractères alphanumériques, espaces ou tirets.";
  }
  return true;
}

const validationFormulaire = (utilisateur) => {
  erreurs = [];
  if (!utilisateur.login || !utilisateur.password || !utilisateur.nom || !utilisateur.email) {
    erreurs.push("Tous les champs sont obligatoires.");
  }
  let validlogin = validationLogin(utilisateur.login);
  if (utilisateur.login && validlogin !== true) {
    erreurs.push(validlogin);
  }
  let validPwd = validationPass(utilisateur.password);
  if (utilisateur.password && validPwd !== true) {
    erreurs.push(validPwd);
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
