import { Router } from "express";
import UserCompany from "../../src/api/controller/Company/UserCompanyController";

const router = Router();

router.post("/", UserCompany.execute);
router.get("/allCompany", UserCompany.getCompany);
router.get("/search/:pesquisa", UserCompany.companySearch);
router.get("/tests", UserCompany.listTestCompany);
router.get('/listCompany', UserCompany.listCompany)
router.put('/updatePerfil', UserCompany.update)
router.get('/getProfileCompany/:id', UserCompany.getProfileCompany)
router.post('/photos/', UserCompany.createPhotoCompany)
router.delete('/photos/:idEmpresa', UserCompany.deletePhotos)



export default router