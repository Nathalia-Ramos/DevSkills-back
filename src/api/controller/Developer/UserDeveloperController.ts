import DeveloperService from "../../../services/developer/DeveloperService"
import CPFValidator from "../../../helpers/CPFValidator"
import { Request, Response } from "express";
import RegisterDeveloperData from "../../../interfaces/RegisterDeveloper";
 
export default class UserDeveloperController {
   static async create(req: Request, res: Response) {
 
       let user : RegisterDeveloperData = req.body
 
       const answer = await DeveloperService.create(user)

       res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message})

   }

   static async auth(req: Request, res: Response) {

    const login = req.body

    const answer = await DeveloperService.auth(login)

    res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message})

   }
}
