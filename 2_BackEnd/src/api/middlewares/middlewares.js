/*================================
Modulo de middlewares
==================================*/

// Middleware logger para analizar por consola todas las solicitudes
const loggerUrl = (req, res, next) => {
    const fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    next(); // Damos paso al siguiente middleware o a procesar la response
};

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
//Middleware para proteger las rutas(las vistas del dashboard)
const requireLogin = (req,res, next) =>{
    //Si no existe un usuario en la sesion, redigirigimos a la pantalla login
    if (!req.session.user){
        return res.redirect("/login")
    }
    next();
}

// Hay que exportar los middlewares para exportarlos a otros archivos.
export {
    loggerUrl,
    validateId,
    validateProduct,
    requireLogin
}