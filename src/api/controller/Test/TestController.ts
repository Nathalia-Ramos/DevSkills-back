import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import TestProgress from "../../interfaces/Test/TestProgress"
import filter from "../../interfaces/Test/AdminFilter"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"
import { updateUserTest, userAnswer, userTest } from "../../interfaces/Test/AnswerTest"
import AnswerTestService from "../../services/Test/AnswerTestService"

export default class TestController {

    static async execute(req: Request, res: Response){
        
        const test : TestData = req.body
        
        const tests = await TestService.create(test)
        
        return res.status(201).json({message: "Prova inserida com sucesso!"})

    }

    static async findAdminTestByID(req: Request, res: Response) {

        const { id } = req.params

        const answer = await TestService.findAdminTestByID(parseInt(id))

        return res.status(answer.statusCode).json(answer.error ? { error: answer.error } : { data: answer.data })

    }

    static async findAdminTests(req: Request, res: Response) {

        const { ids_habilidades, ids_stacks, tipo, pagina } : any = req.query

        const answer = await TestService.findAdminTests(pagina, ids_habilidades, ids_stacks, tipo)

        return res.status(answer.statusCode).json(answer.error ? { error: answer.error } : { data: answer.data })

    }
    static async relateTestTemplate(req: Request, res: Response){
        
        const body : TestProgress = req.body

        const answer = await TestService.relateTemplate(body)

        return res.status(answer?.statusCode).json(
            answer.error ? { 'error': answer.error } : { 'message': answer.message }
        )
    }
    static async test(req: Request, res: Response) {
    
        try { 
            const test = await TestModel.allTest()
            
            return res.status(200).json({message: "Provas", data: test})
        } catch (error) {
            
        }

    }
    static async listTest(req: Request, res: Response){
   
        const result = await TestService.findTestNumber()
  
        return res.status(200).json({data: result})
       }

    static async createUserTest(req: Request, res: Response) {

        const data : userTest = req.body

        const answer = await AnswerTestService.createUserTest(data)

        return res.status(answer?.statusCode).json(answer?.error ? { error: answer.error } : { message: answer.message, data: answer?.data })

    }

    static async updateUserTest(req: Request, res: Response) {

        const data : updateUserTest = req.body

        const answer = await AnswerTestService.updateUserTest(data)

        return res.status(answer?.statusCode).json(answer?.error? {error: answer.error} : { message: answer.message, data: answer.data })

    }

    static async createAnswer(req: Request, res: Response) {

        const data : userAnswer = req.body

        const answer = await AnswerTestService.createAnswer(data)

        return res.status(answer?.statusCode).json(answer?.error ? { error: answer.error } : { message: answer?.message })

    }

    static async findTest(req: Request, res: Response) {

        const { id  } = req.params

        const answer = await TestService.findTest(parseInt(id))

        res.status(answer.statusCode).json(answer.error ? { error: answer.error } : { data: answer.data })

    }

    static async findUserTest(req: Request, res: Response) {

        const { id } = req.params

        const answer = await TestService.listUserTest(parseInt(id))

        res.status(answer.statusCode).json(answer.error ? { error: answer.error } : { data: answer.data })

    }

    static async updateAnswer(req: Request, res: Response) {

        const data : userAnswer = req.body

        const answer = await AnswerTestService.updateAnswer(data)

        return res.status(answer?.statusCode).json(answer?.error ? { error: answer.error } : { message: answer?.message })

    }
  
}