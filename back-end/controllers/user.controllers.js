import User from "../database/models/User.js";

// Contrôleurs pour les utilisateurs
// Ces contrôleurs gèrent les requêtes HTTP pour les utilisateurs

// cette fonction permet de créer un utilisateur
// elle utilise la méthode create configurée dans le modèle User
// elle retourne l'utilisateur créé avec un status 201
export const creerUtilisateur = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    // si il y a une erreur lors de la création de l'utilisateur
    // on retourne une erreur avec un status 400
    res.status(400).json({ error: error.message });
  }
};


// cette fonction permet de lister tous les utilisateurs
// elle utilise la méthode findAll configurée dans le modèle User
// elle retourne tous les utilisateurs
export const listeUtilisateurs = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// cette fonction permet de trouver un utilisateur par son ID
// elle utilise la méthode findById configurée dans le modèle User
export const rechercheUtilisateurAvId = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "L'utilisateur recherché est introuvable" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// cette fonction permet de mettre à jour un utilisateur
// elle utilise la méthode update configurée dans le modèle User
export const mettreAJourUtilisateur = async (req, res) => {
  try {
    const user = await User.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "L'utilisateur recherché est introuvable" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// cette fonction permet de supprimer un utilisateur
// elle utilise la méthode delete configurée dans le modèle User
export const supprimerUtilisateur = async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// cette fonction permet de trouver un utilisateur par son email
// elle utilise la méthode findByEmail configurée dans le modèle User
export const rechercheUtilisateurAvEmail = async (req, res) => {
  try {
    const user = await User.findByEmail(req.params.email);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
