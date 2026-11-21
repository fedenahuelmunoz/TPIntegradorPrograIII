// Este archivo tiene la lógica para trabajar con los archivos y las rutas del proyecto -> CUIDADO: Esta funcionalidad sirve para versiones de Node posteriores a la 22

// Necesitamos crear una variable que apunte a la carpeta raiz del servidor, para poder apuntar a src/views (las vistas) y src/public(archivos estáticos)
// Tenemos que construir las rutas a esas carpetas que nos proporcionan las vistas y los archivos estáticos

import {join} from "path"; // Nos permite unir segmentos de rutas.

//Construimos a mano _dirname que apunta a la raiz del servidor (ESM no incluye _dirname, commonjs sí)
//import.meta.dirname apunta a este directorio concreto: src/api7utils.
const __dirname = join(import.meta.dirname, "../../../"); //NO VAN A PREGUNTAR SOBRE QUE HACE ESTO.
// Creamos la variable que apunta a la raiz del servidor

export{
    __dirname,
    join
}