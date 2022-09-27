import { Router } from "express";

import StateController from "../src/api/controller/StateController";

const router = Router()

router.post('/', StateController.create)

export default router

