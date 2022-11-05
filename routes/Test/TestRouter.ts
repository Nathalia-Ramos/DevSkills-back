import { Router } from "express";
import TestController from "../../src/api/controller/Test/TestController"

const router = Router()

router.post('/', TestController.execute)
router.get('/tests', TestController.test)
router.post('/template', TestController.relateTestTemplate) 
router.get('/admin', TestController.findAdminTests)

export default router
