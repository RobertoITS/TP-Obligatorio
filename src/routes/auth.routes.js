import { Router } from "express";
import { methods as authMethods } from "../controllers/auth.controller";

const router = Router()

router.post('/api/auth/login', authMethods.login)

export default router