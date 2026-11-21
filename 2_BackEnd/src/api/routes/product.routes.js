/*==============================================
Rutas producto
================================================*/

import { Router } from "express"; // Router funciona como una "mini aplicación de express".
import { validateId, validateProduct } from "../middlewares/middlewares.js";
import { createProduct, deleteProduct, getAllProducts, getProductById, modifyProduct, modifyProductActive } from "../controllers/products.controllers.js";
const router = Router(); // Hacemos lo mismo que con const app = express(); -> Es decir, hacer como una mini-aplicación
// El router se encarga de manejar las peticiones GET, POST, etc.

// Método GET para obtener todos los productos de nuestra tienda
router.get("/", getAllProducts);//Importamos el controlador para traer todos los productos.

// Método Get para obtener un producto por su ID
router.get("/:id", validateId, getProductById);//Tambien importamos el controlador para obtener producto por id. 

// Método POST para crear un nuevo producto de nuestra tienda
router.post("/", validateProduct, createProduct);//Importamos el controlador createProduct.
// Método PUT para modificar un producto
// Aquí ya se puede hacer la BAJA LÓGICA de un producto.
router.put("/", validateProduct, modifyProduct);//Importamos el controlador correspondiente.

// Método DELETE para eliminar un producto

// El método DELETE serviría para realizar una BAJA FÍSICA de un producto.
// Ahora bien, las consignas del trabajo nos piden que se realicen BAJAS LÓGICAS de productos. ¿Cómo realizarlas? ¿Puede que sea con un método PUT que modifique el campo "active"?
//Por ahora dejamos la opcion de eliminar producto pero puede llegar a modificarse.
router.delete("/:id", validateId, deleteProduct);

//BAJA LÓGICA de un producto con el método PUT
router.put("/api/products", modifyProductActive);

// Exportamos todas estas rutas de producto.
export default router;

