
/** 
 * Las rutas de la autenticacion 
 * Contiene los endpoints para el logeo del usuario
*/

import { Router } from "express";
import { methods as authMethods } from "../controllers/auth.controller";

const router = Router()

router.post('/api/auth/login', authMethods.login)

export default router