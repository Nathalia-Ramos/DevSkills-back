import { Router } from "express";
import UserCompany from "../../src/api/controller/Company/UserCompanyController"
import AddressController from "../../src/api/controller/Company/AdressController"

const router = Router()

router.post('/', AddressController.create, UserCompany.execute)

export default router