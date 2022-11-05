import { Router } from "express";
import UserCompany from "../../src/api/controller/Company/UserCompanyController"

const router = Router()

router.post('/', UserCompany.execute)
router.get('/allCompany', UserCompany.getCompany)
router.get('/stacks/:pesquisa', UserCompany.getCompanyStack)
router.get('/skill/:search', UserCompany.getCompanySkill)
router.get('/getCompanyTittle/:search', UserCompany.getCompanyTest)


export default router