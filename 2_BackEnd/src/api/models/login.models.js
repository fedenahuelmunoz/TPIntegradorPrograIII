import connection from "../database/db.js";

const loginPost = (email, password) => {
    const sql = "SELECT * FROM users where email = ? AND password = ?"        
    return connection.query (sql,[email, password ]);
};
export default {
    loginPost
};