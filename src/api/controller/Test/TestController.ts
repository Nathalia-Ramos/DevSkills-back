import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        
        const teste : TestData = req.body
        console.log(teste)
        
        const tests = await TestService.create(teste)

        

    }
}