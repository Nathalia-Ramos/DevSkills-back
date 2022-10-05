import { Router } from "express";
import StackController from "../../src/api/controller/Stacks/StackController"
import ShowStacksController from "../../src/api/controller/Stacks/ShowStacksController";

const router = Router()

router.post('/', StackController.execute)
router.get('/', ShowStacksController.select)

export default router