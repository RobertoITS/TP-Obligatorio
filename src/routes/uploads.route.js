import { Router } from 'express'
import { check } from 'express-validator'
import { methods as uploadMethods } from '../controllers/upload.controller'

const router = Router()


router.post('/upload', uploadMethods.uploadFile)

export default router