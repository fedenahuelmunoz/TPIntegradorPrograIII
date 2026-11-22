import loginModels from "../models/login.models.js"

export const login = (req,res) =>{
    res.render("login",{
        title: "Login usuario",
        about: "Login de usuario admin"
    });
};
export const loginPost = async (req,res) => {
    try{

        //Extraemos los datos que vienen en el cuerpo de la peticion POST
        const {email, password} = req.body;
        //chequeamos que vengan todos los datos
        if (!email || !password){
            // Renderizo la vista del login.ejs pasandole un string de error
            return res.render("login",{
                title: "Login usuario",
                about: "Login de usuario admin",
                error : "Todos los campos son obligatorios"
            });
        }
        const [rows] = await loginModels.loginPost(email,password);
        //chequeamos que exista nuestro usuario
        if (rows.length === 0){
            return res.render("login",{
                title: "Login usuario",
                about: "Login de usuario admin",
                error : "Credenciales incorrectas"
            })
        }
        const user = rows[0];

        //Guardamos la sesion 
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }
        
        //Creada la sesion redirigimos a la vista del dashboard
        res.redirect("/dashboard/principal");
    }catch(error){
        console.log("Error en el login", error)
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};   
export const loginOut = (req,res) => {
    req.session.destroy((err) => {
        
        //Si salta algun error
        if (err){
            console.log("Error al destruir la sesion", err);

            return res.status(500).json({
                message:"Error al cerrar la sesion"
            });
        }
        //Al terminar de destruir  la sesion (exitosamente), redigirimos a login
        res.redirect("/login");

    })
};