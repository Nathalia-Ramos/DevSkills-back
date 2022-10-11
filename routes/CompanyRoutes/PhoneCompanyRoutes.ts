import { Router } from "express";

import PhoneCompanyController from "../../src/api/controller/Company/PhoneCompanyController";

const router = Router()

router.post('/', PhoneCompanyController.phone)

export default router