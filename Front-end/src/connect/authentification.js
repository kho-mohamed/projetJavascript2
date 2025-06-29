import "../assets/styles/styles.scss";
// Importation des données des utilisateurs
import { users } from "../../data/users.js";

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
  const login = Object.fromEntries(dataFormulaire.entries());
  if (validationFormulaire(login)) {
    //Si le formulaire est valide, on renvoie vers la page de produit via le routeur qui sera créer ultérieurement.
    alert("Connexion réussie !");
  }
});

function validationConnection(userlog) {
  // Tester la présence d'un login et password
  if (!userlog.login) {
    return "le login est obligatoire pour se connecter.";
  }
  if (!userlog.password) {
    return "le mot de passe est obligatoire pour se connecter.";
  }
  // on compare le mot de passe avec l'objet users pour vérifier si le mot de passe existe déjà
  const userExists = users.find((user) => user.login === userlog.login);

  if (userExists) {
    if (userExists.password != userlog.password) {
      return "Les informations de connection sont incorrectes. Veuillez vérifier votre login et mot de passe.";
    }
  }
  if (!userExists) {
    return "Aucun utilisateur trouvé avec ce login.";
  }

  return true;
}

const validationFormulaire = (utilisateur) => {
  erreurs = [];
  if (!utilisateur.login || !utilisateur.password) {
    erreurs.push("Tous les champs sont obligatoires.");
  }
  let validConnect = validationConnection(utilisateur);
  if (validConnect !== true) {
    erreurs.push(validConnect);
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
