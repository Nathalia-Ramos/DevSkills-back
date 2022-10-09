import { Router } from "express";
import UserAdminController from "../../src/api/controller/Admin/UserAdminController";

const router = Router()

router.post('/', UserAdminController.create)
router.post('/login', UserAdminController.auth)

export default router
