import {Request, Response} from "express"
import ReturnMessages from "../../../config/ReturnMessages"
import {TestData} from "../../interfaces/Test/Tests"
import TestModel from "../../models/Test/TestModel"
import TestService from "../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        
        const test : TestData = req.body
        
        const tests = await TestService.create(test)

        return res.status(201).json({message: "Prova inserida com sucesso!"})
    }
  
}