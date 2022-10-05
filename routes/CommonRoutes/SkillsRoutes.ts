import { Router } from "express";
import SkillController from "../../src/api/controller/Skills/SkillController"
import ShowSkillController from "../../src/api/controller/Skills/ShowSkillsController"
import SkillTypeController from "../../src/api/controller/Skills/SkillTypeController"

const router = Router()

router.post('/', SkillController.execute)
router.post('/type', SkillTypeController.execute)
router.get('/', ShowSkillController.select)

export default router