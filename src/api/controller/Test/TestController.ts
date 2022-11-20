import { Request, Response } from "express";
import correctAnswer from "../../interfaces/Test/Answer";
import { testAnswer, userTest } from "../../interfaces/Test/AnswerTest";
import TestProgress from "../../interfaces/Test/TestProgress";
import { TestData } from "../../interfaces/Test/Tests";
import TestModel from "../../models/Test/TestModel";
import AnswerTestService from "../../services/Test/AnswerTestService";
import TestService from "../../services/Test/TestService";
import queryTestFilter from "./../../utils/queryTestFilter";

export default class TestController {
  static async execute(req: Request, res: Response) {
    const test: TestData = req.body;

    const tests = await TestService.create(test);

    return res.status(201).json({ message: "Prova inserida com sucesso!" });
  }

  static async findUserAnswers(req: Request, res: Response) {
    const { id } = req.params;

    const result = await TestService.findUserAnswers(parseInt(id));

    return res
      .status(result.statusCode)
      .json(result.error ? { error: result.error } : { data: result.data });
  }

  static async findAdminTestByID(req: Request, res: Response) {
    const { id } = req.params;

    const answer = await TestService.findAdminTestByID(parseInt(id));

    return res
      .status(answer.statusCode)
      .json(answer.error ? { error: answer.error } : { data: answer.data });
  }

  static async findAdminTests(req: Request, res: Response) {
    // const { ids_habilidades, ids_stacks, tipo, pagina } : any = req.query
    const userFiltersData = queryTestFilter(req);

    const answer = await TestService.findAdminTests(userFiltersData);

    return res
      .status(answer.statusCode)
      .json(answer.error ? { error: answer.error } : { data: answer.data });
  }
  static async relateTestTemplate(req: Request, res: Response) {
    const body: TestProgress = req.body;

    const answer = await TestService.relateTemplate(body);

    return res
      .status(answer?.statusCode)
      .json(
        answer.error ? { error: answer.error } : { message: answer.message }
      );
  }
  static async test(req: Request, res: Response) {
    try {
      const test = await TestModel.allTest();

      return res.status(200).json({ message: "Provas", data: test });
    } catch (error) {}
  }
  static async listTest(req: Request, res: Response) {
    const { take }: any = req.query;

    const result = await TestService.findTestNumber(parseInt(take));

    return res.status(200).json({ data: result });
  }

  static async createUserTest(req: Request, res: Response) {
    const data: userTest = req.body;

    console.log("createUserTest:", req.body);


    const answer = await AnswerTestService.createUserTest(data);

    return res
      .status(answer?.statusCode)
      .json(
        answer?.error
          ? { error: answer.error }
          : { message: answer.message, data: answer.data }
      );
  }

  // static async updateUserTest(req: Request, res: Response) {

  //     const data : updateUserTest = req.body

  //     const answer = await AnswerTestService.updateUserTest(data)

  //     return res.status(answer?.statusCode).json(answer?.error? {error: answer.error} : { message: answer.message, data: answer.data })

  // }

  static async createUserAnswer(req: Request, res: Response) {
    const data: testAnswer = req.body;


    const answer = await AnswerTestService.createAnswerTest(data);

    return res
      .status(answer?.statusCode)
      .json(
        answer?.error ? { error: answer.error } : { message: answer?.message }
      );
  }

  static async findTest(req: Request, res: Response) {
    const { id } = req.params;
    console.log(new Date().toLocaleTimeString());

    const answer = await TestService.findTest(parseInt(id));

    res
      .status(answer.statusCode)
      .json(answer.error ? { error: answer.error } : { data: answer.data });
  }

  static async findUserTest(req: Request, res: Response) {
    const { id } = req.params;

    const answer = await TestService.listUserTest(parseInt(id));

    res
      .status(answer.statusCode)
      .json(answer.error ? { error: answer.error } : { data: answer.data });
  }

  // static async updateAnswer(req: Request, res: Response) {

  //     const data : userAnswer = req.body

  //     const answer = await AnswerTestService.updateAnswer(data)

  //     return res.status(answer?.statusCode).json(answer?.error ? { error: answer.error } : { message: answer?.message })

  // }

  static async updateCorrectAnswer(req: Request, res: Response) {
    const data: correctAnswer = req.body;

    const answer = await TestService.correctionAnswer(data);

    return res
      .status(answer.statusCode)
      .json(
        answer.error ? { error: answer.error } : { message: answer.message }
      );
  }

  static async listUserAnswers(req: Request, res: Response) {
    const { id } = req.params;

    const answer = await AnswerTestService.listAnswers(parseInt(id));

    res
      .status(answer.statusCode)
      .json(answer.error ? { error: answer.error } : { data: answer.data });
  }
}
