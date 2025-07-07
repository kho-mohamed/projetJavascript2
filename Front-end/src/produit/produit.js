import "../assets/styles/styles.scss";
import { env } from "../../config/env.js";
import { divSupprime } from "../components/divSupprime/index.js";
import { Alert } from "../components/alert/index.js";

const content = document.querySelector("#gelerycontent");

const afficheProduit = (objetProduits, container) => {
  const divProduits = document.createElement("div");
  divProduits.className = "div-produits";
  const produits = objetProduits.map((pdt, i) => elementProduit(pdt, i));
  divProduits.append(...produits);
  ajouterEvenements(divProduits);
  container.appendChild(divProduits);
};

const elementProduit = (pdt) => {
  const blocHtml = document.createElement("div");
  blocHtml.className = `carte`;
  blocHtml.innerHTML = `
        <div class = "carte-image">
            <img src="${pdt.image}" alt="${pdt.nom}">
        </div >
        <div class="carte-infos">
            <h4 class="carte-titre">${pdt.nom}</h4>
            <h4 class="carte-prix">${pdt.prix} $</h4>
            <p class="carte-description">${pdt.description}</p>
            <div class="carte-btns">
            <div data-id=${pdt.id} class="carte-btn carte-btn-supprimer"><img src="../assets/images/delete.svg">  </div>
            <div class="carte-btn carte-btn-modifier" data-id=${pdt.id}><img src="../assets/images/edit.svg">  </div>
            </div>
        </div>`;
  blocHtml.href = `./product.html?id=${pdt.id}`;
  return blocHtml;
};

const ajouterEvenements = (container) => {
  const supprimerBtn = container.querySelectorAll(".carte-btn-supprimer");
  const modifierBtn = container.querySelectorAll(".carte-btn-modifier");
  modifierBtn.forEach((boutton) => {
    boutton.addEventListener("click", (event) => {
      const target = event.currentTarget;
      const productId = target.dataset.id;
      window.location.assign(`/form/form.html?id=${productId}`);
    });
  });
  supprimerBtn.forEach((boutton) => {
    boutton.addEventListener("click", async (event) => {
      const target = event.currentTarget;
      try {
        const confirm = await Alert.confirm(
          "Êtes-vous sûr de vouloir supprimer ce produit ?",
          "Supprimer",
          "Annuler"
        );
        if (confirm) {
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
    if (!Array.isArray(produits)) {
      produits = [produits];
    }
    afficheProduit(produits, content);
  } catch (error) {
    console.log("erreur :", error);
  }
};

fetchProduits();

export { afficheProduit };
