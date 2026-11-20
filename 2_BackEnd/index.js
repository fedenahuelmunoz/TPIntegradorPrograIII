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

//Middleware de ruta para filtrar ids no válidos
const validateId = (req, res, next) => {
    const id = Number (req.params.id); // Convierto a número el valor pasado por parametro
    
    // Analizamos si el id enviado en la request es un entero o si es menor o igual a 0.
    if(!Number.isInteger(id) || id <=0){
        return res.status(400).json({
            message: "El id debe ser un número entero positivo"
        });
    }

    req.id = id;
    next(); // Con esta linea damos al siguiente middleware o a la respuesta
};

// Middleware de ruta para validar los datos de un formulario
const validateProduct = (req, res, next) => {
    const categoriasValidas = ["notebook", "cellphone"];
    const errores = []; // Array vacio de errores

    // Recogemos los datos del body
    const { name, image, price, category } = req.body;

    // Verificamos los datos de entrada
    if (!name || !image || !price || !category ) {
        errores.push("Faltan campos requeridos");
    }

    // Verificamos el campo name
    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos dos caracteres");
    }

    // Verificamos el campo price
    if (typeof price !== "number" || price <= 0) {
        errores.push("El precio debe ser un número mayor a cero");
    }

    // El campo image no lo verificamos ya que después aplicaremos Multer

    // Verificamos el campo category
    if (!categoriasValidas.includes(category)) {
        errores.push("Categoria inválida");
    }


    // Si existe algún error en nuestro array, devolveremos esa clase de errores con un código 404.

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos inválidos",
            listaErrores: errores
        })
    }

    next(); // Si no pongo next este middleware nunca pasa al siguiente middleware o a la response HTTP. Por ende, queda colgado.
} 


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
    // Optimizacion 1: Manejo de errores con try ...catch
    try{
        // Extraigo SOLO los resultados de la consulta, no la info de las tablas
        const [rows] = await connection.query("SELECT * FROM products");
        // console.log(rows); Los productos llegan correctamente

        // Optimización 2: Devolvemos un código 404 si no se encuentran productos.
        if (rows.length === 0) {
            // Gracias al return, termina la logica del endpoint aca (no continuamos ejecutando el codigo de abajo)
            return res.status(404).json({
                message: "No se encontraton productos"
            });
        }
    
        res.status(200).json({
            payload: rows,
            total: rows.length // Opcional, es metadata util para el FrontEnd
        })
        
    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al obtener productos"
        });
    }
});

// Método Get para obtener un producto por su ID
app.get("/api/products/:id", validateId, async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch
    // Optimización 2: Filtro ids no válidos en el middleware validateId
    try {
        // Optimización 3: uso de placeholders
        // Los placeholders "?" evitan ataques de inyección SQL. Por ende, es una forma de hacer consultas SQL más seguras.
        const sql = `SELECT * FROM products WHERE products.id = ?`
    
        const [rows] = await connection.query(sql, [req.id]);

        // Optimización 4: Devolvemos un código 404 si no se encontró un producto con ese id.
        if (rows.length === 0) {
            // Gracias al return, termina la logica del endpoint aca (no continuamos ejecutando el codigo de abajo)
            return res.status(404).json({
                message: `No se encontró un producto con id ${req.id}`
            });
        }
    
        // console.log(rows);
        res.status(200).json({
            payload: rows
        })

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al obtener productos"
        });
    }

});


// Método POST para crear un nuevo producto de nuestra tienda
app.post("/api/products", validateProduct, async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch

    try{
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
    
        // Aca ya directamente recibimos un objeto
        const {category, image, name, price} = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP
    
        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
    
        const [result] = await connection.query(sql, [name, image, category, price]);

        console.log(result);
    
        res.status(201).json({
            message: "Producto creado exitosamente",
            productId: result.insertId // Devolvemos el id que se le asigno al nuevo producto.
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al obtener productos"
        });
    }
});

// Método PUT para modificar un producto
app.put("/api/products", validateProduct, async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch
    
    try {
        // TO DO: incorporar modificación de status para hacer la BAJA LÓGICA  de un producto.
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
       const {id, name, image, price, category, active} = req.body;
   
       const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";
   
       const [result] = await connection.query(sql, [name, image, price, category, active, id]);

       console.log(result);

       // Optimización 2: Verificamos si realmente se actualizó algún campo del producto con respecto a la información que había previamente.

       if (result.changedRows === 0) {
            return res.status(404).json({
                message: "No se actualizó el producto"
            })
       }
   
       res.status(200).json({
            message: "Producto actualizado exitosamente"
       });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al modificar productos"
        });
    }
});

// Método DELETE para eliminar un producto

// El método DELETE serviría para realizar una BAJA FÍSICA de un producto.
// Ahora bien, las consignas del trabajo nos piden que se realicen BAJAS LÓGICAS de productos. ¿Cómo realizarlas? ¿Puede que sea con un método PUT que modifique el campo "active"?

app.delete("/api/products/:id", validateId, async (req, res) => {
    // Optimización 2: Filtro ids no válidos en el middleware validateId
    
    // Optimizacion 1: Manejo de errores con try ...catch

    try {

        // Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras
        const sql = "DELETE FROM products WHERE id = ?";
        await connection.query(sql, [req.id]);
    
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al obtener productos",
        });
    }

});


//BAJA LÓGICA de un producto con el método PUT
app.put("/api/products", async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch

    try {

        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
        const {id} = req.body;
    
        const sql = "UPDATE products SET active = 0 WHERE id = ?";
    
        await connection.query(sql, [id]);
    
        res.status(200).json({
            message: "Producto pasado a inactivo exitosamente"
        });

    } catch (error) {
         console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al obtener productos",
        });
    }

});





// Ponemos en funcionamiento nuestro servidor express
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de comprobación para la consola
});

