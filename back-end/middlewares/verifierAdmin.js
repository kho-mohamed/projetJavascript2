export function verifierAdmin(req, res, next) {
  const utilisateur = req.body.utilisateur || req.headers.utilisateur;

  try {
    const utilisateurParse =
      typeof utilisateur === "string" ? JSON.parse(utilisateur) : utilisateur;

    if (!utilisateurParse || utilisateurParse.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Accès refusé. Réservé aux administrateurs." });
    }

    // Ajoute l'utilisateur au `req` si besoin plus tard
    req.utilisateur = utilisateurParse;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Erreur de validation du rôle utilisateur." });
  }
}
