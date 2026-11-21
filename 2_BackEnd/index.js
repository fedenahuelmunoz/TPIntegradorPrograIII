/*=============================================
Importaciones iniciales
===============================================*/

import express from "express"; // Importamos la libreria express de NodeJS
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import connection from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";

// Creamos una instancia de una aplicacion de express.
// Esto nos permitirá acceder a los métodos y funcionalidades para crear un servidor express
const app = express(); 
const PORT = environments.port;


/*==============================================
Manejo de Middlewares
Los middlewares son funciones que se ejecutan entre la peticion y la respuesta, lo que nos permite hacer validaciones, autenticar usuarios, etc
================================================*/
// Previamente a ejecutar el proyecto hay que instalar el modulo cors
app.use(cors()); // Middleware CORS basico para permitir todas las solicitudes

app.use(express.json()); // Cuando enviamos informacion en el cuerpo del body de la request (POST y PUT) este middleware parseara el JSON recibido y lo recibiremos en el endpoint ya como un objeto

app.use(loggerUrl);



/*====================================================
Configuración de ENDPOINTS.
Cada endpoint  es una dirección específica (generalmente una URL) dentro de una API a la que un programa envía una solicitud para obtener, crear, modificar o eliminar datos.
======================================================*/
// Método GET para obtener la raíz de nuestro servidor
app.get("/", (req, res) => {
    res.send("Hola a la página a la raíz de nuestro servidor");
});

// Se redireccionan todas las peticiones a /api/products al modulo product.routes.js
app.use("/api/products", productRoutes);

// app.get("/dashboard", viewRoutes);

// Opción sin modularizar las rutas del dashboard del Back Office
// app.get("/dashboard/principal", vistaPrincipal);
// app.get("/dashboard/consultar", consultar);
// app.get("/dashboard/crear", vistaCrear);
// app.get("/dashboard/modificar", vistaModificar);
// app.get("/dashboard/eliminar", vistaEliminar);



// Ponemos en funcionamiento nuestro servidor express
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de comprobación para la consola
});
