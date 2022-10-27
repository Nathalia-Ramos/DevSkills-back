import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        
        const test : TestData = req.body
        
        const tests = await TestService.create(test)
    }
    static async search(req: Request, res: Response) {

        const pesquisa = req.body
        console.log(pesquisa)

        const teste = await TestService.search(pesquisa)   

    }
}