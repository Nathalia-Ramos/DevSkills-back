import { Router } from "express";
import GenderController from "../../src/api/controller/Gender/GenderController";

const router = Router()

router.get('/', GenderController.showAll)

export default router