import { Router } from "express";
import PhoneController from "../../src/api/controller/Phone/PhoneController";

const router = Router()

router.get('/type', PhoneController.showTypes)

export default router