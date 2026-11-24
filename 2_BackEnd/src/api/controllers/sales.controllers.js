/*============================================
    Controladores de ventas
=============================================*/
//Gracias a esto empezamos a gestionar la logica(peticiones y respuestas )para quedar mas ordenada en "product.routes.js".
import salesModels from "../models/sales.models.js";


// Controlador encargado de crear una nueva venta

export const createSale = async (req, res) => {
    // Optimización: manejamos errores con el bloque try-catch
    try {
        // Gracias al middleware app.use(express.json()) el JSON recibido ya viene transformado en objeto JS    
        // Aca ya directamente recibimos un objeto

        const {date, total_price, user_name, products} = req.body; // Extraemos los valores parseados del cuerpo de la peticion HTTP
        // Mensajes de prueba
        console.log("Productos recibidos:", products);
        console.log("¿Es un array?:", Array.isArray(products));
        console.log("Cantidad de productos:", products.length);
        
        // Aca registramos la venta en la tabla sales
        const [result] = await salesModels.insertNewSale(date, total_price, user_name);
        
        console.log(result);

        // Ahora podemos obtener el id de la venta registrada en la tabla sales
        const sale_id = result.insertId;

        // Registramos cada producto asociado a cada venta en la tabla product_sales
        for (const product_id of products) {
            // Mensajes de prueba
            console.log("Insertando producto:", product_id);
            console.log("ID de la venta:", sale_id);
            await salesModels.insertNewProduct_Sale(product_id, sale_id);
        }

        res.status(201).json({
            message: "Venta registrada exitosamente",
            saleId: sale_id
        });

    } catch (error) {
        console.log("Error registrando venta: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al registrar la venta"
        });
    }

}