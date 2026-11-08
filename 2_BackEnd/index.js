/*=============================================
Importaciones iniciales
===============================================*/

import express from "express"; // Importamos la libreria express de NodeJS
import environments from "./src/api/config/environments.js"; // Traigo el puerto del .env
import connection from "./src/api/database/db.js";
import cors from "cors";

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

// Middleware logger para analizar por consola todas las solicitudes
app.use((req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // Damos paso al siguiente middleware o a procesar la response
});


/*====================================================
Configuración de ENDPOINTS.
Cada endpoint  es una dirección específica (generalmente una URL) dentro de una API a la que un programa envía una solicitud para obtener, crear, modificar o eliminar datos.
======================================================*/
// Método GET para obtener la raíz de nuestro servidor
app.get("/", (req, res) => {
    res.send("Hola a la página a la raíz de nuestro servidor");
});


// Método GET para obtener todos los productos de nuestra tienda
app.get("/api/products", async (req, res) => {
    // Extraigo SOLO los resultados de la consulta, no la info de las tablas
    const [rows] = await connection.query("SELECT * FROM products");
    // console.log(rows); Los productos llegan correctamente

    res.status(200).json({
        payload: rows
    })
});

// Método Get para obtener un producto por su ID
app.get("/api/products/:id", async (req, res) => {

    // Gracias al objeto req, extraigo el valor numero de la url
    const id = req.params.id;

    const [rows] = await connection.query(`SELECT * FROM products WHERE products.id = ${id}`);

    // console.log(rows);
    res.status(200).json({
        payload: rows
    })
});

// Método POST para crear un nuevo producto de nuestra tienda
app.post("/api/products", async (req, res) => {
    // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS

    // Aca ya directamente recibimos un objeto
    const {category, image, name, price} = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP

    const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

    await connection.query(sql, [name, image, category, price]);

    res.status(201).json({
        message: "Producto creado exitosamente"
    });
});

// Método PUT para modificar un producto
app.put("/api/products", async (req, res) => {

    // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
    const {id, name, image, price, category} = req.body;

    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ? WHERE id = ?";

    await connection.query(sql, [name, image, price, category, id]);

    res.status(200).json({
        message: "Producto actualizado exitosamente"
    });
});

// Método DELETE para eliminar un producto

// El método DELETE serviría para realizar una BAJA FÍSICA de un producto.
// Ahora bien, las consignas del trabajo nos piden que se realicen BAJAS LÓGICAS de productos. ¿Cómo realizarlas? ¿Puede que sea con un método PUT que modifique el campo "active"?

// app.delete("/api/products/:id", async (req, res) => {
//     const id = req.params.id;

//     // Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras
//     const sql = "DELETE FROM products WHERE id = ?";
//     await connection.query(sql, [id]);

//     res.status(200).json({
//         message: `Producto con id ${id} eliminado exitosamente`
//     });
// });

//BAJA LÓGICA de un producto con el método PUT
app.put("/api/products", async (req, res) => {

    // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
    const {id} = req.body;

    const sql = "UPDATE products SET active = 0 WHERE id = ?";

    await connection.query(sql, [id]);

    res.status(200).json({
        message: "Producto pasado a inactivo exitosamente"
    });
});







// Ponemos en funcionamiento nuestro servidor express
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de comprobación para la consola
});

