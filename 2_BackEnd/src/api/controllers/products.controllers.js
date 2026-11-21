/*============================================
    Controladores de productos
=============================================*/
//Gracias a esto empezamos a gestionar la logica(peticiones y respuestas )para quedar mas ordenada en "product.routes.js".
import connection from "../database/db.js";
import productsModels from "../models/products.models.js";


//Este es el controlador que se encarga de traer todos los productos.
export const getAllProducts = async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch
    try{
        // Extraigo SOLO los resultados de la consulta, no la info de las tablas
        const [rows] = await productsModels.selectAllProducts();//En esta linea ESPERAMOS que la promesa se resuelva exitosamente.
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
};
// Método Get para obtener un producto por su ID
export const getProductById = async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch
    // Optimización 2: Filtro ids no válidos en el middleware validateId
    try {
        
        const [rows] = await productsModels.selectById(req.id);

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

};

// Método POST para crear un nuevo producto de nuestra tienda
export const createProduct = async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch

    try{
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS    
        // Aca ya directamente recibimos un objeto
        const {category, image, name, price} = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP
    
        const [result] = await productsModels.insertNewProducts(name, image, category, price);

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
};

// Método PUT para modificar un producto
export const modifyProduct = async (req, res) => {
    // Optimizacion 1: Manejo de errores con try ...catch
    
    try {
        // TO DO: incorporar modificación de status para hacer la BAJA LÓGICA  de un producto.
        // Gracias al middleware app.use(express.json()) el JSON recibido del formulario ya viene transformado en objeto JS
       const {id, name, image, price, category, active} = req.body;
   
       const [result] = await productsModels.updateProduct(name, image, price, category, active, id);

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
};
// Método DELETE para eliminar un producto
export const deleteProduct = async (req, res) => {
    // Optimización 2: Filtro ids no válidos en el middleware validateId
    
    // Optimizacion 1: Manejo de errores con try ...catch

    try {
        await productsModels.deleteProduct(req.id);
    
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

};

export const modifyProductActive = async (req, res) => {
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

};

