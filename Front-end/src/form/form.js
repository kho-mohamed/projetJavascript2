import "../assets/styles/styles.scss";

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
  const nouvelArticle = Object.fromEntries(dataFormulaire.entries());

  if (validationFormulaire(nouvelArticle)) {
    const json = JSON.stringify(nouvelArticle);

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
