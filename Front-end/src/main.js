import "./assets/styles/styles.scss";
import { products } from "../data/productlist.js";
import { afficheProduit } from "./components/products/product.js";

const contentIndex = document.querySelector("[id='indexcontent']");
console.log(contentIndex);

// Création d'une fiche aléatoire de produit par id:
const produitid = [];
while (produitid.length < 3) {
  const randomIndex = Math.floor(Math.random() * products.length);
  if (!produitid.includes(randomIndex)) {
    produitid.push(randomIndex);
  }
}
// Sélection des produits par l'indice:
const selectionProduits = [];
products.forEach((pdt, i) => {
  if (produitid.includes(i)) {
    selectionProduits.push(pdt);
  }
});

afficheProduit(selectionProduits, contentIndex);
