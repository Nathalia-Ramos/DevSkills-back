import { Router } from "express";
import TestController from "../../src/api/controller/Test/TestController"

const router = Router()

router.post('/', TestController.execute)
router.get('/', TestController.search)


export default router
