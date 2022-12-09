import { Router } from "express";

import GrupoController from "../../src/api/controller/Group/GroupController"

const router = Router()

router.post('/createGroup', GrupoController.groupController)
router.post('/respostaUsuarioConvite', GrupoController.resposta)
router.get('/groupsCompany/:id', GrupoController.getCompanyGroups)
router.get('/groupsUsers/:id', GrupoController.getUsersGroups)



export default router
