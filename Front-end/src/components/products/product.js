export const afficheProduit = (objetProduits, container) => {
  const divProduits = document.createElement("div");
  divProduits.className = "div-produits";
  const produits = objetProduits.map((pdt, i) => elementProduit(pdt, i));
  divProduits.append(...produits);
  container.appendChild(divProduits);
};

const elementProduit = (pdt, i) => {
  const blocHtml = document.createElement("a");
  blocHtml.className = "carte";
  blocHtml.innerHTML = `
        <div class = "carte-image">
            <img src="${pdt.image}" alt="${pdt.nom}">
        </div >
        <div class="carte-infos">
            <h4 class="carte-titre">${pdt.nom}</h4>
            <h4 class="carte-prix">${pdt.prix}</h4>
            <p class="carte-description">${pdt.description}</p>
        </div>`;
  blocHtml.href = `./product.html?id=${pdt.id}`;
  return blocHtml;
};
