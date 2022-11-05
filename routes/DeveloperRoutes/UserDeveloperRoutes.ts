import { Router } from "express";
import UserDeveloperController from "../../src/api/controller/Developer/UserDeveloperController";

import AnswerTestController from "../../src/api/controller/AnswerTestController";

const router = Router()

router.post('/', UserDeveloperController.create)
router.post('/login', UserDeveloperController.auth)
router.post('/forgotPassword', UserDeveloperController.sendPassMail)
router.post('/test_answer', AnswerTestController.create)
router.get('/test/:id', AnswerTestController.findTest)
router.get('/:search', UserDeveloperController.stackSearch)
router.get('/skill/:pesquisa', UserDeveloperController.skillsSearch)
router.get('/tests/test', UserDeveloperController.test)

export default router
