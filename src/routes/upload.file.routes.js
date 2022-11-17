
/**
 * Las rutas para la carga de archivos
 */

import { Router } from "express";
import { check } from "express-validator";
import { collections, collections as collectionsValidator } from "../middlewares/collection.validator";
import { methods as filesMethods, methods } from "../controllers/upload.file.controller";

const router = Router()

//* Cargamos una imagen
router.post('/api/uploads/:id', filesMethods.uploadFile)
//* Actualizamos una imagen
router.put('/api/uploads/:collection/:id', [
    check('collection').custom(c => collections.allowedCollection(c, ['users'])) //* Chequeamos las colecciones
], methods.updateFile)
//* Obtenemos la imagen
router.get('/api/uploads/:collection/:id', [
    check('collection').custom(c => collections.allowedCollection(c, ['users']))
], methods.getFile)

export default router