import { Router } from "express";

import AuthController from "../../src/api/controller/Company/AuthController";

const router = Router()

router.post('/', AuthController.auth)

export default router
