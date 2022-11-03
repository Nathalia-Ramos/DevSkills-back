import { Router } from "express";
import UserDeveloperController from "../../src/api/controller/Developer/UserDeveloperController";

import AnswerTestController from "../../src/api/controller/AnswerTestController";

const router = Router()

router.post('/', UserDeveloperController.create)
router.post('/login', UserDeveloperController.auth)
router.post('/forgotPassword', UserDeveloperController.sendPassMail)
router.post('/test_answer', AnswerTestController.create)
router.put('/test_answer', AnswerTestController.updateTest)
router.get('/test/:id', AnswerTestController.findTest)

export default router
