import { Router } from "express";
import TestController from "../../src/api/controller/Test/TestController"

const router = Router()

router.post('/', TestController.execute)


export default router