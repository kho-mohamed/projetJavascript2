import JSONArrayDatabase from "../JSONArrayDatabase.js";

const usersDB = new JSONArrayDatabase("users.json");

export default class User {
  //on configure la méthode create pour créer un utilisateur
  static async create(userDonnee) {
    // On check si les données sont valides en vérifiant si l'email existe déja ou pas
    const userExist = await usersDB.findByEmail(userDonnee.email);
    if (userExist) {
      // si il existe, on retourne une erreur
      throw new Error("Ce courriel est déja utilisé");
    }
    // on insert l'utilisateur dans la base de données
    return usersDB.insert(userDonnee);
  }
  // on crée une méthode statique pour trouver un utilisateur par son email
  static async findByEmail(email) {
    return usersDB.findByEmail(email);
  }

  // on crée une méthode statique pour créer un utilisateur
  static async update(id, updates) {
    // on vérifie si l'utilisateur existe via son email
    if (updates.email) {
      const userExist = await usersDB.findByEmail(updates.email);
      if (userExist && userExist.id !== id) {
        // si l'email existe déjà et que ce n'est pas le même utilisateur, on lance une erreur
        throw new Error(
          "cette Email est déja utilisé par un autre utilisateur"
        );
      }
    }
    // on met à jour l'utilisateur
    return usersDB.update(id, updates);
  }

  // on crée une méthode statique pour supprimer un utilisateur
  static async delete(id) {
    return usersDB.delete(id);
  }
  // on crée une méthode statique pour trouver un utilisateur par son ID
  static async findById(id) {
    return usersDB.findById(id);
  }
  // on crée une méthode statique pour trouver tous les utilisateurs
  static async findAll() {
    return usersDB.findAll();
  }
}
