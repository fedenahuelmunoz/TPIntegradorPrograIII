/*============================
Rutas de las vistas
==============================*/

import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaModificar, vistaPrincipal } from "../controllers/view.controllers.js";
const router = Router();


// Vista de la pantalla principal del sitio web
router.get("/principal", vistaPrincipal);

// Vista consultar
router.get("/consultar", vistaConsultar);   

// Vista crear
router.get("/crear", vistaCrear);

// Vista modificar
router.get("/modificar",vistaModificar);

// Vista eliminar
router.get("/eliminar", vistaEliminar);

// Exportamos las rutas de las vistas (todas de una).
export default router;