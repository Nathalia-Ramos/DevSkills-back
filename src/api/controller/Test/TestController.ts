import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import TestProgress from "../../interfaces/Test/TestProgress"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        
        const teste : TestData = req.body
        
        const tests = await TestService.create(teste)
        // console.log(tests)
        // console.log(teste)

        return res.status(201).json(tests)
    }

    static async relateTestTemplate(req: Request, res: Response){
        
        const body : TestProgress = req.body

        const answer = await TestService.relateTemplate(body)

        return res.status(answer?.statusCode).json(
            answer.error ? { 'error': answer.error } : { 'message': answer.message }
        )

    }
}