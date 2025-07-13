import bcrypt from "bcrypt";
import User from "../database/models/User.js";

// Contrôleurs pour les utilisateurs
// Ces contrôleurs gèrent les requêtes HTTP pour les utilisateurs

// cette fonction permet de créer un utilisateur
// elle utilise la méthode create configurée dans le modèle User
// elle retourne l'utilisateur créé avec un status 201
export const creerUtilisateur = async (req, res) => {
  const { login, password, nom, email } = req.body;

  if (!login || !password || !nom || !email) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      login,
      password: hashedPassword,
      nom,
      email,
      role: "utilisateur",
    });
    res.status(201).json(user);
  } catch (error) {
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
    if (!user)
      return res
        .status(404)
        .json({ error: "L'utilisateur recherché est introuvable" });
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
    if (!user)
      return res
        .status(404)
        .json({ error: "L'utilisateur recherché est introuvable" });
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

// Contrôleur d'authentification (version avec bcrypt)
export const authentifierUtilisateur = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res
      .status(400)
      .json({ message: "Le login et le mot de passe sont requis." });
  }

  try {
    const utilisateur = await User.findByEmail(login); // login est en fait l'email

    if (!utilisateur) {
      return res
        .status(401)
        .json({ message: "Login ou mot de passe invalide." });
    }

    // Vérifier si le mot de passe est déjà haché (commence par $2b$)
    let motDePasseValide = false;
    if (utilisateur.password.startsWith("$2b$")) {
      // Mot de passe haché - utiliser bcrypt.compare
      motDePasseValide = await bcrypt.compare(password, utilisateur.password);
    } else {
      // Mot de passe en texte brut (pour les anciens utilisateurs)
      motDePasseValide = utilisateur.password === password;

      // Optionnel: hacher le mot de passe maintenant pour les futures connexions
      if (motDePasseValide) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update(utilisateur.id, { password: hashedPassword });
      }
    }

    if (!motDePasseValide) {
      return res
        .status(401)
        .json({ message: "Login ou mot de passe invalide." });
    }

    const utilisateurSanitise = {
      id: utilisateur.id,
      nom: utilisateur.nom,
      email: utilisateur.email,
      login: utilisateur.login,
      role: utilisateur.role,
    };

    res.status(200).json(utilisateurSanitise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
