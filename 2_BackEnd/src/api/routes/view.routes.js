/*============================
Rutas de las vistas
==============================*/

import { Router } from "express";
const router = Router();


// Vista de la pantalla principal del sitio web
router.get("/principal", (req, res) => {
    // Nuestra aplicación renderiza la vista en src/views/index.js
    res.render("index");
});

// Vista consultar
router.get("/consultar", (req, res) => {
    res.render("get");
});

// Vista crear
router.get("/crear", (req, res) => {
    res.render("post");
});

// Vista modificar
router.get("/modificar", (req, res) => {
    res.render("put");
});

// Vista eliminar
router.get("/eliminar", (req, res) => {
    res.render("delete");
});

// Exportamos las rutas de las vistas (todas de una).
export default router;