import "../assets/styles/styles.scss";

// Sélection du conteneur pour afficher les produits du panier
const panierContent = document.querySelector("#panier-content");

// Fonction pour afficher les produits du panier
const afficherPanier = () => {
  panierContent.innerHTML = "";

  const panier = JSON.parse(localStorage.getItem("panier")) || [];

  if (panier.length === 0) {
    panierContent.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  panier.forEach((produit) => {
    const produitHtml = document.createElement("div");
    produitHtml.className = "panier-item";

    produitHtml.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}" class="panier-item-img">
      <div class="panier-item-title">${produit.nom}</div>
      <div class="panier-item-description">${produit.description || ""}</div>
      <div class="panier-item-description">${produit.prix} $</div>
    `;

    panierContent.appendChild(produitHtml);
  });
};

// Fonction pour vider le panier
const ajouterEvenementViderPanier = () => {
  const viderBtn = document.querySelector("#vider-panier");

  if (viderBtn) {
    viderBtn.addEventListener("click", () => {
      const confirmation = confirm("Voulez-vous vraiment vider le panier ?");
      if (confirmation) {
        localStorage.removeItem("panier");
        afficherPanier(); // Mise à jour de l'affichage
      }
    });
  }
};

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  afficherPanier();
  ajouterEvenementViderPanier();
});
