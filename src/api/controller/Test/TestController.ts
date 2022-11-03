import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import TestProgress from "../../interfaces/Test/TestProgress"
import filter from "../../interfaces/Test/AdminFilter"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        
        const teste : TestData = req.body
        console.log(teste)
        
        const tests = await TestService.create(teste)

    }

    static async findAdminTests(req: Request, res: Response) {

        const data : filter = req.body
        console.log(data)

        const answer = await TestService.findAdminTests(data)

        return res.status(answer.statusCode).json(answer.error ? { error: answer.error } : { data: answer.data })

    }

    static async relateTestTemplate(req: Request, res: Response){
        
        const body : TestProgress = req.body

        const answer = await TestService.relateTemplate(body)

        return res.status(answer?.statusCode).json(
            answer.error ? { 'error': answer.error } : { 'message': answer.message }
        )

    }
}