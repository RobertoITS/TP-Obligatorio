//! En este archivo manejaremos las rutas dedicadas a los usuarios
import {Router} from "express";

import { methods as usersController} from
"../controllers/user.controller";
//! Validamos los campos
import { check } from "express-validator";
import { validator } from "../middlewares/fields.validator";
//!La funcion para validar el token:
import { jwtValidator } from "../middlewares/jwt.validator";


//! Creamos un enrutador para manejar las rutas
const router = Router();

//! Definimos las rutas
//* Creamos un nuevo usuario 
router.post("/api/accounts", [
    //Validamos el ingreso de la informacion del usuario
    check('username', 'El nombre de usuario es requerido').not().isEmpty(),
    check('pass', 'La contraseña es requerida').not().isEmpty(),
    check('email', 'Email no valido').isEmail(),
    validator.fieldValidator
],usersController.registerUser)
//* Borramos el usuario
router.delete("/api/accounts/:id", usersController.deleteUser)
//* Obtenemos un usuario especifico
router.get("/api/accounts/:id", usersController.getUser)
//* Obtenemos todos los usuarios
router.get("/api/accounts", jwtValidator.validateJWT, usersController.getUsers) //!Veamos si funciona:
//* Editamos ciertos campos de los usuarios
router.put("/api/accounts/:id", usersController.editUser)
export default router;