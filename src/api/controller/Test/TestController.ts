import {Request, Response} from "express"
import TestModel from "../../models/Test/TestModel"
import Test from "../../../interfaces/Test/Test"
import TestService from "../../../services/Test/TestService"


export default class TestController {

    static async execute(req: Request, res: Response){
        const teste : Test = req.body

        const tests = await TestService.create(teste)

        return res.status(201).json(tests)
    }
}