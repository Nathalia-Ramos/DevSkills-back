import { Router } from "express";
import TestController from "../../src/api/controller/Test/TestController"

const router = Router()

router.post('/', TestController.execute)
router.post('/template', TestController.relateTestTemplate) 
router.get('/admin', TestController.findAdminTests)

export default router
