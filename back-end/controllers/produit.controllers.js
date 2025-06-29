import Product from "../database/models/Produit.js";

// Contrôleurs pour les produits
// Ces contrôleurs gèrent les requêtes HTTP pour les produits
// cette fonction permet de créer un produit
export const creerProduit = async (req, res) => {
  try {
    // après la création du produit grace à la méthode create configurée dans le modèle Produit
    // on retourne le produit créé avec un status 201
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    // si il y a une erreur lors de la création du produit
    // on retourne une erreur avec un status 400
    res.status(400).json({ error: error.message });
  }
};
// cette fonction permet de lister tous les produits
// elle utilise la méthode findAll configurée dans le modèle Produit

export const listeProduits = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cette fonction permet de lister les produits disponibles
// elle utilise la méthode findAvailable configurée dans le modèle Produit
// elle retourne tous les produits qui sont disponibles et en stock
export const produitsDisponibles = async (req, res) => {
  try {
    const products = await Product.findAvailable();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cette fonction permet de trouver un produit par son ID
// elle utilise la méthode findById configurée dans le modèle Produit
export const trouverProduit = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ error: "Le produit que vous avez saisie est introuvable" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cette fonction permet de mettre à jour un produit
// elle utilise la méthode update configurée dans le modèle Produit
export const miseajourProduit = async (req, res) => {
  try {
    const product = await Product.update(req.params.id, req.body);
    if (!product)
      return res
        .status(404)
        .json({ error: "Le produit que vous avez saisie est introuvable" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// cette fonction permet de mettre à jour le stock d'un produit
// elle utilise la méthode updateStock configurée dans le modèle Produit
export const miseajourStock = async (req, res) => {
  try {
    const { action, quantite } = req.body;
    let qte = parseInt(quantite) || 0;

    if (action === "decrement") qte = -qte;
    else if (action !== "increment") {
      return res
        .status(400)
        .json({ error: "Action doit être 'increment' ou 'decrement'" });
    }

    const product = await Product.updateStock(req.params.id, qte);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// cette fonction permet de supprimer un produit
// elle utilise la méthode delete configurée dans le modèle Produit
export const supprimerProduit = async (req, res) => {
  try {
    const supprime = await Product.delete(req.params.id);
    if (!supprime)
      return res
        .status(404)
        .json({ error: "Le produit selectionnée est introuvable" });
    res.json({ message: "Bravo, Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cette fonction permet de rechercher des produits par d'autres critères
// comme une partie du nom et une partie de la description.
export const rechercheProduits = async (req, res) => {
  try {
    const produits = await Product.search(req.params.query);
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
