import { Router } from "express";
import { methods as transactionMethods } from "../controllers/transaction.controller";

const router = Router()

//TODO Por ahora pasamos el id en los parametros, despues lo manejamos con express-session
router.post('/api/trans', transactionMethods.newTransaction) //! no funco! 
router.post('/api/addfunds', transactionMethods.addFunds) //! no funco!
router.get('/api/transaction', transactionMethods.getTransactions) //* funco

export default router