import TestService from "../../services/answerTestService";
import { Request, Response } from "express";
import { userTest } from "../../interfaces/AnswerTest";

export default class AnswerTestController {
    static async create(req: Request, res: Response) {

        const data : userTest = req.body

        const answer = await TestService.create(data)

        res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message})

    }

    static async findTest(req: Request, res: Response) {

        const { id  } = req.params

        const answer = await TestService.findTest(parseInt(id))

        res.status(200).json(answer)

    }
}