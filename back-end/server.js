// Import des modules NPM utilisés par le serveur
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Import des modules natifs
// Utilisé pour gérer les chemins de fichiers
import path from "path";
import { fileURLToPath } from "url";

// Import des routes de l'application créer localement
import router from "./routes/index.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5252;

app.use(morgan("short"));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () =>
  console.log(`Serveur en ligne sur  http://localhost:${PORT}`)
);
