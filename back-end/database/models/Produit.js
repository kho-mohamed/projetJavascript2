import JSONArrayDatabase from "../JSONArrayDatabase.js";
const produitsDB = new JSONArrayDatabase("productlist.json");

export default class Product {
  /**
   * Étant donné que les données seront validées en frontend, on ne fait qu'une validation minimale ici.
   * On suppose que le frontend envoie des données valides.
   */
  static async create(produitDonnee) {
    // Validation minimale
    if (!produitDonnee.nom || !produitDonnee.prix) {
      throw new Error("Le nom et le prix sont absents de vos données");
    }

    return produitsDB.insert(produitDonnee);
  }

  // Trouve un produit par son ID

  static async findById(id) {
    return produitsDB.findById(id);
  }

  //Trouve tous les produits
  static async findAll() {
    return produitsDB.findAll();
  }

  /**
   * Trouve les produits disponibles (en stock)
   * la fonction vérifie d'abord si le produit est marqué comme disponible
   * et ensuite si le stock est supérieur à 0.
   */
  static async findAvailable() {
    // On récupère tous les produits et on filtre ceux qui sont disponibles
    const products = await produitsDB.findAll();
    // On filtre les produits qui sont disponibles et en stock
    return products.filter((p) => p.estDisponible && p.stock > 0);
  }

  /**
   * Met à jour un produit
   */
  static async update(id, updates) {
    const exist = await produitsDB.findById(id);
    if (!exist) {
      throw new Error("Ce produit n'existe pas");
    }

    const updatedData = {
      ...exist,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return produitsDB.update(id, updatedData);
  }

  /**
   * Supprime un produit en utilisant son ID
   */
  static async delete(id) {
    return produitsDB.delete(id);
  }

  /**
   * Met à jour le stock d'un produit
   */
  static async updateStock(id, quantityChange) {
    const product = await produitsDB.findById(id);
    if (!product) {
      throw new Error("ce produit n'existe pas");
    }

    const newStock = product.stock + quantityChange;
    if (newStock < 0) {
      throw new Error("Oups, le stock ne peut pas être négatif");
    }

    return produitsDB.update(id, {
      stock: newStock,
      estDisponible: newStock > 0,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Recherche des produits par d'autres critères
   * comme une partie du nom et une partie de la description.
   */
  static async search(crietere) {
    const products = await produitsDB.findAll();
    return products.filter(
      (p) =>
        p.nom.toLowerCase().includes(crietere.toLowerCase()) ||
        (p.maison &&
          p.description.toLowerCase().includes(crietere.toLowerCase()))
    );
  }
}
