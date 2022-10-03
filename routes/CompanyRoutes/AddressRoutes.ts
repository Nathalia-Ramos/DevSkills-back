import { Router } from "express";
import AddressController from "../../src/api/controller/Company/AdressController";

const router = Router()

router.post('/', AddressController.execute)

export default router
