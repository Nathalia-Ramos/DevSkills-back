import { Router } from "express";
import TestController from "../../src/api/controller/Test/TestController"

const router = Router()

router.post('/', TestController.execute)
router.get('/allTest', TestController.test)
router.post('/template', TestController.relateTestTemplate) 
router.get('/admin', TestController.findAdminTests)
router.get('/listTest', TestController.listTest)
router.put('/correctAnswer', TestController.updateCorrectAnswer)

// router.get('/:id', TestController.findTest)

export default router
