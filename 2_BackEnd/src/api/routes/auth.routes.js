/*=============================================
Rutas de autenticacion
===============================================*/
import { Router } from "express";
import { login, loginOut, loginPost } from "../controllers/auth.controllers.js";
const router = Router();

//Vistas de login
router.get("/login",login);
//Endpoints que atendera las peticiones POST a /login
router.post("/login",loginPost);
//Endpoint para destruir session
router.post("/logout", loginOut);


//Exportamos las rutas 
export default router;