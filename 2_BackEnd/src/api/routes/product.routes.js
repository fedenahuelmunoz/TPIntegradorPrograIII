/*==============================================
Rutas producto
================================================*/

import { Router } from "express"; // Router funciona como una "mini aplicación de express".
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import connection from "../database/db.js";
const router = Router(); // Hacemos lo mismo que con const app = express(); -> Es decir, hacer como una mini-aplicación
// El router se encarga de manejar las peticiones GET, POST, etc.

// Método GET para obtener todos los productos de nuestra tienda
router.get("/", async (req, res) => {
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
router.get("/:id", validateId, async (req, res) => {
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
router.post("/", validateProduct, async (req, res) => {
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
// Aquí ya se puede hacer la BAJA LÓGICA de un producto.
router.put("/", validateProduct, async (req, res) => {
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

router.delete("/:id", validateId, async (req, res) => {
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
router.put("/api/products", async (req, res) => {
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


// Exportamos todas estas rutas de producto.
export default router;
