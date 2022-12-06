import { Router } from "express";
import GrupoController from "../../src/api/controller/Group/GroupController"

const router = Router()

router.post('/createGroup', GrupoController.groupController)
router.post('/respostaUsuarioConvite', GrupoController.resposta)


export default router
