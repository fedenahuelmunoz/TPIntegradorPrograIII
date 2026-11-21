//Este archivo es para trabajar con los archivos y las rutas del proyecto

//Necesitamos crear una variable que apunte a la carpeta raiz del servidor, para poder apuntar a src/views(las vistas) y src/public(archivos)
import {join} from "path"; // Nos permite unir segmentos de rutas.
//Construimos a mano _dirname que apunta a la raiz del servidor(ESM no incluye _dirname, commonjs si)
//import.meta.dirname apunta a ESTE directorio.
const _dirname = join(import.meta.dirname, "../../../"); //NO VAN A PREGUNTAR SOBRE QUE HACE ESTO.
//Creamos la variable que apunta a la raiz del servidor

export{
    _dirname,
    join
}