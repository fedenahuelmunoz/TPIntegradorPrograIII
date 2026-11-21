/*=============================================
Importaciones iniciales
===============================================*/

import express from "express"; // Importamos la libreria express de NodeJS
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join} from "./src/api/utils/index.js"


/*==============================================
Config
================================================*/
// Creamos una instancia de una aplicacion de express.
// Esto nos permitirá acceder a los métodos y funcionalidades para crear un servidor express
const app = express(); 
const PORT = environments.port;


app.set("view engine", "ejs"); // Configuramos EJS (Embeded JavaScript) como motor de plantillas
app.set("views", join(__dirname, "src/views")); // le indicamos donde se encuentran las vista EJS -> src/views



/*==============================================
Manejo de Middlewares
Los middlewares son funciones que se ejecutan entre la peticion y la respuesta, lo que nos permite hacer validaciones, autenticar usuarios, etc
================================================*/
// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Ahora decimos que los archivos estaticos están en la carpeta public.

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

// Redirijo todas las peticiones a /dashboard a viewRoutes.js
app.use("/dashboard", viewRoutes);

// Ponemos en funcionamiento nuestro servidor express
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de comprobación para la consola
});