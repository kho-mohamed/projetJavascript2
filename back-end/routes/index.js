import express from "express";
// Importer les routes des produits et des utilisateurs
import produitRoutes from "./products.routes.js";
import usersRoutes from "./users.routes.js";

// Création d'un routeur express
// Ce routeur va gérer les différentes routes de l'application
const router = express.Router();

// Middleware de validation
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

router.get("/", (req, res) => {
  res.end("Le serveur est en ligne et prêt à recevoir des requêtes !");
});

// Utilisation des routes pour les produits et les utilisateurs
// Ces routes seront préfixées par /produit et /utilisateur respectivement
router.use("/produit", produitRoutes);
router.use("/utilisateur", usersRoutes);

export default router;
