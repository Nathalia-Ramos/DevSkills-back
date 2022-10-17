import { Request, Response } from "express"
import Question from "../../interfaces/Question/Question"
import QuestionService from "../../services/Test/QuestionService"

export default class QuestionController {
    static async execute (req: Request, res: Response) {
        const question : Question = req.body

        const questions = await QuestionService.createQuestion(question)

        return res.status(201).json(questions)
    }
}