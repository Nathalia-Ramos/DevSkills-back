import { Router } from "express";
import TestController from "../../src/api/controller/Test/TestController";

const router = Router();

router.post("/", TestController.execute);
router.get("/allTest", TestController.test);
router.post("/template/admin", TestController.relateTestTemplate);
router.get("/admin", TestController.findAdminTests);
router.get("/list/get", TestController.listTest);
router.get("/admin/:id", TestController.findAdminTestByID);
router.get("/:id", TestController.findTest);
router.put("/:id/correction", TestController.updateCorrectAnswer);
router.get("/:id/candidates", TestController.findCandidates);
router.get("/:id/answers/:take", TestController.findUserAnswers);
router.get("/:id/overview", TestController.listOverview);
router.get("/:id/geral", TestController.listTestInfo);
router.get("/:id/details", TestController.listTestDetails);

// router.get('/:id', TestController.findTest)

export default router;
