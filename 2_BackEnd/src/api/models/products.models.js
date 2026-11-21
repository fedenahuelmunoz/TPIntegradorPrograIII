/*==============================================
Modelos de productos
¿?modularizacion restante la de modificar el producto en su estado active
================================================*/
//Se encarga de hacer las llamadas(peticiones) a la base de datos, relacionado a los productos.

import connection from "../database/db.js";

/*====================================================================*/
//Obtenemos todos los productos
const selectAllProducts = () =>{
    return connection.query("SELECT * FROM products");//Con esto RETORNAMOS(realizamos) la conexion. No usamos el await.   
}


/*====================================================================*/
//Seleccionamos un producto por id.
const selectById = (id) =>{//En est
    // Optimización 3: uso de placeholders
    // Los placeholders "?" evitan ataques de inyección SQL. Por ende, es una forma de hacer consultas SQL más seguras.
    const sql = `SELECT * FROM products WHERE products.id = ?`
    return connection.query(sql, [id]);
}


/*====================================================================*/
//Creamos un producto
const insertNewProduct = (name, image, category, price)=>{
// Aca ya directamente recibimos un objeto    
        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";
        return connection.query(sql, [name, image, category, price]);//RETORNAMOS directamente sin crear una constante
}


/*====================================================================*/
//Modificamos un producto
const updateProduct = (name, image, price, category, active, id) => {
    const sql = "UPDATE products SET name = ?, image = ?, price = ?, category = ?, active = ? WHERE id = ?";
    return connection.query(sql, [name, image, price, category, active, id]);
}


/*====================================================================*/
//Eliminamos un producto
const deleteProduct = (id) =>{
    // Los placeholders -> "?" nos ayudan a evitar los ataques de inyeccion SQL. Es nuestra manera de hacer consultas SQL mas seguras.
    const sql = "DELETE FROM products WHERE id = ?";
    return connection.query(sql, [id]);
}


/*====================================================================*/
//obtenemos todos los productos activos.
const selectActiveProducts = () =>{
    const sql = "SELECT  * FROM PRODUCTS WHERE products.active = ? ";
    return connection.query(sql,[1]);
}
// Exportamos todas estas llamadas de los productos.
export default{
    selectAllProducts,
    selectById,
    insertNewProduct,
    updateProduct,
    deleteProduct,
    selectActiveProducts
}