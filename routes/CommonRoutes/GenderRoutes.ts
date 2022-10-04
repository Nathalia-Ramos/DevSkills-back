import { Router } from "express";
import GenderController from "../../src/api/controller/Gender/GenderController"

const router = Router()

router.post('/', GenderController.execute)

export default router