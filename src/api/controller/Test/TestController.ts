import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import TestProgress from "../../interfaces/Test/TestProgress"
import filter from "../../interfaces/Test/AdminFilter"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        
        const test : TestData = req.body
        
        const tests = await TestService.create(test)
        
        return res.status(201).json({message: "Prova inserida com sucesso!"})

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
    static async test(req: Request, res: Response) {
    
        try { 
            const test = await TestModel.allTest()
            
            return res.status(200).json({message: "Provas", data: test})
        } catch (error) {
            
        }
       }
  
}