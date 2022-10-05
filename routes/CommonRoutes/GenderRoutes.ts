import { Router } from "express";
import GenderController from "../../src/api/controller/Gender/GenderController"
import ShowGenderController from "../../src/api/controller/Gender/ShowGendersController"

const router = Router()

router.post('/', GenderController.execute)
router.get('/', ShowGenderController.select)

export default router