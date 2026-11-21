/*============================
    Controladores de las vistas
==============================*/

import productsModels from "../models/products.models.js";


//Vista principal
export const vistaPrincipal = async (req, res) => {
    // Nuestra aplicación renderiza la vista en src/views/index.js
    try{
        //Le pedimos al modelo de productos que nos devuelva todos los productos.
        const [rows] = await productsModels.selectAllProducts();
        res.render("index", {
            ListaProductos: rows
        });
    } catch (error) {
        console.log("Error obteniendo productos: ", error);

        // 500 si falló la conexión a la BBDD
        res.status(500).json ({
            message: "Error interno al obtener productos"
        });
    }  
}


//Vista consultar
export const vistaConsultar = (req, res) => {
    res.render("get");
};


//Vista crear
export const vistaCrear = (req, res) => {
    res.render("post");
};


//Vista modificar
export const vistaModificar = (req, res) => {
    res.render("put");
};


//Vista eliminar 
export const vistaEliminar = (req, res) => {
    res.render("delete");
};