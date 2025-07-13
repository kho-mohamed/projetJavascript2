import express from "express";
import { verifierAdmin } from "../middlewares/verifierAdmin.js";
const router = express.Router();

import {
  creerProduit,
  listeProduits,
  produitsDisponibles,
  trouverProduit,
  miseajourProduit,
  miseajourStock,
  supprimerProduit,
  rechercheProduits,
} from "../controllers/produit.controllers.js";

// Ce routeur gère les routes liées aux produits

// requête POST /produit - Créer un produit
router.post("/", verifierAdmin, creerProduit);

// requête GET /produit - Lister tous les produits
router.get("/", listeProduits);

// requête GET /produit/disponibles - Lister les produits disponibles
router.get("/disponible", produitsDisponibles);

// requête GET /produit/:id - Obtenir un produit par son ID
router.get("/:id", trouverProduit);

// requête PUT /produit/:id - Mettre à jour un produit via son ID
router.put("/:id", verifierAdmin, miseajourProduit);

// requête PATCH /produit/:id/stock - Mettre à jour le stock via son ID
router.patch("/:id/stock", miseajourStock);

// requête DELETE /produit/:id - Supprimer un produit via son ID
router.delete("/:id", verifierAdmin, supprimerProduit);

// GET /produit/recherche/:query - Recherche de produits par mot-clé
router.get("/search/:query", rechercheProduits);

export default router;
