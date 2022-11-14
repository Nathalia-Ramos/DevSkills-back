import { Router } from "express";
import UserCompany from "../../src/api/controller/Company/UserCompanyController";

const router = Router();

router.post("/", UserCompany.execute);
router.get("/allCompany", UserCompany.getCompany);
router.get("/search/:pesquisa", UserCompany.companySearch);
router.get("/tests", UserCompany.listTestCompany);
router.get('/listCompany', UserCompany.listCompany)
router.get('/listCompanyPerfil', UserCompany.perfilCompany)

export default router