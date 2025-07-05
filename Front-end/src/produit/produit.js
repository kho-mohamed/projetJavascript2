import "../assets/styles/styles.scss";
import { products } from "../../data/productlist.js";
import { afficheProduit } from "../components/products/product.js";
import { env } from "../../config/env.js";
import { divSupprime } from "../components/divSupprime/index.js";

const content = document.querySelector("#gelerycontent");

const ajouterEvenements = (container) => {
  const supprimerBtn = container.querySelectorAll(".carte-btn-supprimer");
  const modifierBtn = container.querySelectorAll(".carte-btn-modifier");
  modifierBtn.forEach((boutton) => {
    boutton.addEventListener("click", (event) => {
      const target = event.currentTaget;
      const productId = target.dataset.id;
      console.log("productId :", productId);
      console.log("target :", target);
      window.location.assign(`/form/form.html?id=${productId}`);
    });
  });
  supprimerBtn.forEach((boutton) => {
    boutton.addEventListener("click", async (event) => {
      try {
        const confirm = await Alert.confirm(
          "Êtes-vous sûr de vouloir supprimer ce produit ?",
          "Supprimer",
          "Annuler"
        );
        if (confirm) {
          const target = event.currentTarget;
          const productId = target.dataset.id;
          const response = await fetch(
            `${env.BACKEND_PRODUCTS_URL}/${productId}`,
            {
              method: "DELETE",
            }
          );
          const body = await response.json();
          const carteProduit = divSupprime(".carte");
          fetchProduits();
        }
      } catch (error) {
        console.log("erreur :", error);
      }
    });
  });
};
const fetchProduits = async () => {
  try {
    const response = await fetch(`${env.BACKEND_PRODUCTS_URL}`);
    let produits = await response.json();
    console.log("produits :", produits);
    if (!Array.isArray(produits)) {
      produits = [produits];
    }
    afficheProduit(produits, content);
  } catch (error) {
    console.log("erreur :", error);
  }
};

fetchProduits();
