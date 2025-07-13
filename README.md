# Smartphooool - Projet E-commerce JavaScript

**Auteur** : KHOUDOU Mohamed  
**Établissement** : Collège Maisonneuve  

## Licence

Ce projet est développé à des fins éducatives dans le cadre du programme de Techniques de l'informatique du Collège Maisonneuve.

---

## Description

Smartphooool est une application e-commerce complète développée en JavaScript avec Node.js pour le backend et Vite pour le frontend. Le projet implémente un système complet de gestion de produits et d'utilisateurs avec authentification sécurisée.

## Fonctionnalités

### Gestion des utilisateurs
- Inscription des nouveaux utilisateurs
- Authentification sécurisée avec bcrypt
- Gestion des rôles (admin, opérateur, utilisateur)
- Profils utilisateur personnalisés

### Gestion des produits
- Catalogue de produits dynamique
- Ajout/modification/suppression de produits (admin)
- Recherche et filtrage
- Panier d'achat interactif

### Sécurité
- Mots de passe hachés avec bcrypt
- Validation des données côté client et serveur
- Protection contre les injections
- Gestion des sessions utilisateur

## Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **bcrypt** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin
- **UUID** - Génération d'identifiants uniques
- **Morgan** - Logging des requêtes HTTP

### Frontend
- **Vite** - Build tool et serveur de développement
- **Vanilla JavaScript** - ES6+ modules
- **SCSS** - Préprocesseur CSS
- **HTML5** - Structure moderne

## Structure du projet

- back-end/
  - controllers/ (Contrôleurs métier)
  - database/ (Modèles et base de données)
  - data/ (Fichiers de données JSON)
  - middlewares/ (Middlewares Express)
  - routes/ (Routes API)
  - server.js (Point d'entrée du serveur)
- Front-end/
  - src/
    - components/ (Composants réutilisables)
    - connect/ (Pages de connexion/inscription)
    - form/ (Formulaires)
    - panier/ (Panier d'achat)
    - produit/ (Pages produits)
    - assets/ (Ressources CSS, images)
  - config/ (Configuration frontend)
  - vite.config.js (Configuration Vite)
- README.md

## Installation et démarrage

### Prérequis
- Node.js
- npm

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/smartphooool-ecommerce.git
cd smartphooool-ecommerce
```

### 2. Installation du backend
```bash
cd back-end
npm install
npm start
```
Le serveur backend sera disponible sur : `http://localhost:5252`

### 3. Installation du frontend
```bash
cd Front-end
npm install
npm run dev
```
L'interface frontend sera disponible sur : `http://localhost:5173`

## Comptes de test

| Email | Mot de passe | Rôle | Description |
| `moh@mail.com` | `0102` | admin | Administrateur principal |
| `bounou@mol.com` | `0102` | operateur | Opérateur système |
| `bart@simpson.com` | `010203ab-` | admin | Administrateur secondaire |
| `admin4@gmail.com` | `010203ab-` | utilisateur | Utilisateur standard |

## Pages disponibles

- **Accueil** : `http://localhost:5173/index.html`
- **Connexion** : `http://localhost:5173/connect/authentication.html`
- **Inscription** : `http://localhost:5173/connect/connection.html`
- **Produits** : `http://localhost:5173/produit/produit.html`
- **Panier** : `http://localhost:5173/panier/panier.html`
- **Ajouter produit** : `http://localhost:5173/form/form.html`

## API Endpoints

### Utilisateurs
- `POST /utilisateur` - Créer un utilisateur
- `POST /utilisateur/authentification` - Authentifier un utilisateur
- `GET /utilisateur` - Lister tous les utilisateurs
- `GET /utilisateur/:id` - Obtenir un utilisateur par ID
- `PUT /utilisateur/:id` - Mettre à jour un utilisateur
- `DELETE /utilisateur/:id` - Supprimer un utilisateur

### Produits
- `GET /produit` - Lister tous les produits
- `POST /produit` - Créer un produit
- `GET /produit/:id` - Obtenir un produit par ID
- `PUT /produit/:id` - Mettre à jour un produit
- `DELETE /produit/:id` - Supprimer un produit


## Notes de développement

### Corrections récentes
- Problème d'authentification avec bcrypt résolu
- Migration automatique des anciens mots de passe
- Gestion hybride des mots de passe (rétrocompatibilité)
- Amélioration de la gestion des erreurs
- Logs de débogage ajoutés

**Développé par KHOUDOU Mohamed**
