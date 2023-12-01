import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, registro y confirmacion de usuarios
router.post("/", registrar); //crea un nuevo usuario
router.post("/login", autenticar); //autenticar usuario
router.get("/confirmar/:token", confirmar); //confirmar JWT
router.post("/olvide-password", olvidePassword);

//router.get("/olvide-password/:token", comprobarToken);
//router.post("/olvide-password/:token", nuevoPassword);

//cuando los endpoint apuntas a donde mismo, pero son diferentes tipos, get, post, put, etc, se puede simplificar
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//checkAuth contiene el codigo para proteger, para comprobar que el token sea valido que el usuario sea correcto, que no haya expirado. Si todo esta bien, se va al siguiente midleware, osea, perfil
router.get("/perfil", checkAuth, perfil);

export default router;
