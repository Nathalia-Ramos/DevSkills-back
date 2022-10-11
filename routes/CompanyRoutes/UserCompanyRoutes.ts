import { Router } from "express";
import UserCompany from "../../src/api/controller/Company/UserCompanyController"

const router = Router()

router.post('/', UserCompany.execute)

export default router