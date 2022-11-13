import { Router } from "express";
import { methods as transactionMethods } from "../controllers/transaction.controller";

const router = Router()

//TODO Por ahora pasamos el id en los parametros, despues lo manejamos con express-session
router.post('/api/transaction/:id', transactionMethods.newTransaction) //! no funco! 
router.post('/api/transaction/addfunds', [], transactionMethods.addFunds) //! no funco!
router.get('/api/transaction', transactionMethods.getTransactions) //* funco

export default router