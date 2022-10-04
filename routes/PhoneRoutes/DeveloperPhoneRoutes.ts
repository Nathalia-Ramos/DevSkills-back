import { Router } from "express";
import PhoneType from "../../src/api/controller/Phone/PhoneTypeController";

const router = Router()

router.post('/', PhoneType.execute)

export default router