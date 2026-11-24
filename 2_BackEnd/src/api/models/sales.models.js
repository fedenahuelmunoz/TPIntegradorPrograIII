/*==================================
Modelos de ventas
====================================*/

import connection from "../database/db.js";

/*============================================*/
// Creamos un nuevo registro de una nueva venta en la tabla sales.
const insertNewSale = (date, total_price, user_name) => {
    const sql = "INSERT INTO sales (date, total_price, user_name) VALUES (?, ?, ?)";
    return connection.query(sql, [date, total_price, user_name]);
}

// Cremos un nuevo registro en la tabla product_sales
const insertNewProduct_Sale = (product_id, sale_id) => {
    const sql = "INSERT INTO product_sales (product_id, sale_id) VALUES (?, ?)";
    return connection.query(sql, [product_id, sale_id]);
}

// Exportamos estas conexiones para registrar las ventas y que productos se vendieron en cada venta

export default{
    insertNewSale,
    insertNewProduct_Sale
}