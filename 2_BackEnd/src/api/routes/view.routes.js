/*============================
Rutas de las vistas
==============================*/

import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaModificar, vistaPrincipal } from "../controllers/view.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
const router = Router();


// Vista de la pantalla principal del sitio web
router.get("/principal", requireLogin, vistaPrincipal );

// Vista consultar
router.get("/consultar", requireLogin, vistaConsultar);   

// Vista crear
router.get("/crear", requireLogin, vistaCrear);

// Vista modificar
router.get("/modificar", requireLogin, vistaModificar);

// Vista eliminar
router.get("/eliminar", requireLogin, vistaEliminar);

// Exportamos las rutas de las vistas (todas de una).
export default router;