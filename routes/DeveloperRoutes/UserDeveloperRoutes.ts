import { Router } from "express";
import UserDeveloperController from "../../src/api/controller/Developer/UserDeveloperController";

const router = Router()

router.post('/', UserDeveloperController.create)
router.post('/login', UserDeveloperController.auth)
router.post('/forgotPassword', UserDeveloperController.sendPassMail)

export default router
