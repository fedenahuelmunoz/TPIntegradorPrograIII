// Este es un archivo de barril.
// El archivo de barril importa todas las rutas (de producto, de usuario, de autenticación) con un nombre y las exporta a todos los modulos. Es decir, centraliza las rutas y las exporta.

import productRoutes from "./product.routes.js"; // Importamos las rutas de /api/products
import viewRoutes from "./view.routes.js"; // Importamos las  rutas de las vistas
import authRoutes from "./auth.routes.js";//Importamos las rutas de autenticacion
//Exportamos las rutas de /api/products
export{
    productRoutes,
    viewRoutes,
    authRoutes
}