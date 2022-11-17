
/**
 * Las rutas de las transacciones
 */

import { Router } from "express";
import { methods as transactionMethods } from "../controllers/transaction.controller";

const router = Router()

router.post('/api/trans', transactionMethods.newTransaction) //* Nueva transaccion
router.post('/api/addfunds', transactionMethods.addFunds) //* Agregar fondos a una cuenta sin ellos
router.get('/api/transaction', transactionMethods.getTransactions) //* Obtener todos los fondos

export default router