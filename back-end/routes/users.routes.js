import express from "express";
const router = express.Router();

import {
  creerUtilisateur,
  listeUtilisateurs,
  rechercheUtilisateurAvId,
  mettreAJourUtilisateur,
  supprimerUtilisateur,
  rechercheUtilisateurAvEmail,
} from "../controllers/user.controllers.js";

// requête POST / - Créer un nouvel utilisateur
router.post("/", creerUtilisateur);

// requête GET / - Pour lister tous les utilisateurs
router.get("/", listeUtilisateurs);

// requête GET //:id - Trouver un utilisateur par son ID
router.get("/:id", rechercheUtilisateurAvId);

// requête PUT //:id - mettre à jour un utilisateur avec son ID
router.put("/:id", mettreAJourUtilisateur);

// requête DELETE //:id - pour supprimer un utilisateur avec son ID
router.delete("/:id", supprimerUtilisateur);

// requête GET //email/:email - trouver un utilisateur par son email
router.get("/email/:email", rechercheUtilisateurAvEmail);

export default router;
