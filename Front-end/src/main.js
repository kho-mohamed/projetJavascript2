import "./assets/styles/styles.scss";
import { afficheProduit } from "./produit/produit.js";
import { env } from "../config/env.js";

const contentIndex = document.querySelector("#indexcontent");

const fetchProduits = async () => {
  try {
    const response = await fetch(`${env.BACKEND_PRODUCTS_URL}`);
    let produits = await response.json();
    if (!Array.isArray(produits)) {
      produits = [produits];
      // Création d'une fiche aléatoire de produit par id:
    }
    const produitid = [];
    while (produitid.length < 3) {
      const randomIndex = Math.floor(Math.random() * produits.length);
      if (!produitid.includes(randomIndex)) {
        produitid.push(randomIndex);
      }
    }
    // Sélection des produits par l'indice:
    const selectionProduits = [];
    produits.forEach((pdt, i) => {
      if (produitid.includes(i)) {
        selectionProduits.push(pdt);
      }
    });
    afficheProduit(selectionProduits, contentIndex);
  } catch (error) {
    console.log("erreur :", error);
  }
};

fetchProduits();
