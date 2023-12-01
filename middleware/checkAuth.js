import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

//next nos permite ir al siguiente middleware, por ejemplo, en usuarioRoutes tenemos

const checkAuth = async (req, res, next) => {
  //console.log("desde checkAuth.js");
  //console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //para que no traiga la palabra Bearer y solo traiga el token
      //console.log(token);
      //en caso de que expire el jsonwebtoken verify se encarga de validar
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decoded);
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      );
      //console.log(req.usuario);
      //para que vaya al siguiente midleware
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Hubo un error." });
    }
    //Si esta autotizado y existe un bearer token
  }
  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  //router.get("/perfil", checkAuth, perfil), entraria a checkAuth y despues a perfil, todo esto, al agregar el next
  next();
};

export default checkAuth;
