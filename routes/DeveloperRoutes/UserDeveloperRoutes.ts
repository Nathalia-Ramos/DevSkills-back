import { Router } from "express";

import UserDeveloperController from "../../src/api/controller/Developer/UserDeveloperController";

import TestController from "../../src/api/controller/Test/TestController";

const router = Router();

router.get("/getAllUsers", UserDeveloperController.getAllUsers);
router.get("/getRanking", UserDeveloperController.getRanking);
router.post("/", UserDeveloperController.create);
router.get("/:id", UserDeveloperController.userInfo);
router.put("/", UserDeveloperController.updateProfile);
router.post("/login", UserDeveloperController.auth);
router.post("/forgotPassword", UserDeveloperController.sendPassMail);
router.post("/userTest", TestController.createUserTest);
router.post("/answerTest", TestController.createUserAnswer);
router.get("/recommendedTest/getAll", UserDeveloperController.filterTest);
// router.put('/userTest', TestController.updateUserTest)
router.get("/userTest/:id", TestController.findUserTest);
// router.post('/userTest/question', TestController.createAnswer)
// router.put('/userTest/question', TestController.updateAnswer)
router.get("/userTest/:id/answers", TestController.listUserAnswers);
// router.post('/userTest', TestController)
// router.put('/test_answer', AnswerTestController.updateTest)
router.get("/testSearch/:search", UserDeveloperController.userSearch);
router.get("/testList/:search", UserDeveloperController.userSearch);


export default router
