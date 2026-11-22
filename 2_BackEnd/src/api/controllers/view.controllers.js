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
            title: "Principal",//Personalizacion del nombre con la variable title
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
    res.render("get",{
        title: "Obtener",//Personalizacion del nombre con la variable title
    });
}


//Vista crear
export const vistaCrear = (req, res) => {
    res.render("post",{
        title: "Crear",//Personalizacion del nombre con la variable title;
});
}

//Vista modificar
export const vistaModificar = (req, res) => {
    res.render("put",{
        title: "Modificar",//Personalizacion del nombre con la variable title;
});
}

//Vista eliminar 
export const vistaEliminar = (req, res) => {
    res.render("delete",{
        title: "Eliminar",//Personalizacion del nombre con la variable title);
});
}