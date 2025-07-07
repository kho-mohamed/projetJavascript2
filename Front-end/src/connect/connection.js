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

  if (validationFormulaire(nvUtilisateur)) {
    const json = JSON.stringify(nvUtilisateur);
    console.log("json :", json);
    console.log(env.BACKEND_LOGIN_URL);
    let response;
    response = await fetch(`${env.BACKEND_LOGIN_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });
    if (response.status < 300) {
      // Si la réponse est correcte, on transforme la réponse en JSON
      // et on redirige l'utilisateur vers la page d'accueil.
      const utilisateur = await response.json();
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
      window.location.assign("./index.html");
    }
  }
});

function validationPass(password) {
  // Tester la présence d'un password
  if (!password) {
    return "le mot de passe est obligatoire pour se connecter.";
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
  if (!utilisateur.login || !utilisateur.password || !utilisateur.password2) {
    utilisateur.push("Tous les champs sont obligatoires.");
  }
  let validlogin = validationLogin(utilisateur.login);
  if (utilisateur.login && validlogin !== true) {
    erreurs.push(validlogin);
  }
  let validPwd = validationPass(utilisateur.password);
  if (utilisateur.password && validPwd !== true) {
    erreurs.push(validPwd);
  }

  if (utilisateur.password2 && utilisateur.password2 !== utilisateur.password) {
    erreurs.push(
      "La confirmation du mot de passe ne correspond pas au mot de passe."
    );
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
