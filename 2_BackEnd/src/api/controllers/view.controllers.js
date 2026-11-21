/*============================
    Controladores de las vistas
==============================*/


//Vista principal
export const vistaPrincipal = (req, res) => {
    // Nuestra aplicación renderiza la vista en src/views/index.js
    res.render("index");
};


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