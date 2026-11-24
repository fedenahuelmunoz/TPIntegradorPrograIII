/*==============================================
Rutas producto
================================================*/

import { Router } from "express"; // Router funciona como una "mini aplicación de express".
import { createSale } from "../controllers/sales.controllers.js";

const router = Router(); // Hacemos lo mismo que con const app = express(); -> Es decir, hacer como una mini-aplicación
// El router se encarga de manejar las peticiones GET, POST, etc.

// Método POST para registrar una nueva venta

router.post("/", createSale); // Importamos el controlador createSale

// Exportamos todas estas rutas de ventas.
export default router;