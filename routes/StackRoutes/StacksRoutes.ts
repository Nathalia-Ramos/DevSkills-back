import { Router } from "express";
import StackController from "../../src/api/controller/Stacks/StackController"

const router = Router()

router.post('/', StackController.create)
router.get('/', StackController.showAll)

export default router