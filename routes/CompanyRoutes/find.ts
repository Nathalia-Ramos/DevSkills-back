import { Router } from "express";
import UserCompanyController from "../../src/api/controller/Company/UserCompanyController";

const router = Router()

router.post('/', UserCompanyController.execute)

export default router