import DeveloperService from "../../services/developer/DeveloperService"
import { Request, Response } from "express";
import RegisterDeveloperData from "../../interfaces/Developer/RegisterDeveloper";
import tokenVerify from "../../../middlewares/auth"
import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";
import { prismaClient } from "../../../database/prismaClient";
import { ProvaAndamento } from "@prisma/client";
 
export default class UserDeveloperController {
   static async create(req: Request, res: Response) {
       
       let user : RegisterDeveloperData = req.body

       const answer = await DeveloperService.create(user)

       res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message})

   }
   static async auth(req: Request, res: Response) {

    const { login, senha } = req.body

    const answer = await DeveloperService.auth(login, senha)

    res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message, type: answer.userType, token: answer.token, userInfo: answer.userInfo})

   }
   static async sendPassMail(req: Request, res: Response) {
    
    const { email } = req.body
    
    const answer = await DeveloperService.sendMail(email)
    
    res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message})

   }
   static async userSearch(req: Request, res: Response){
       const {search} = req.params

       const result  = await DeveloperService.stack(search)

       return res.status(200).json({data: result})

   }
   static async userTest(req: Request, res: Response){
    const {search} = req.params

    const result = await DeveloperService.testListUser(search)

    return res.status(200).json({data: result})
   }

   static async userInfo(req: Request, res: Response) {

    const tokenValidate = await tokenVerify(req)

    const answer = await DeveloperService.listUserProfile(tokenValidate)

    return res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {data: answer.data})

   } 
   static async getAllUsers(req: Request,res: Response){
    
        const users = await DeveloperService.getUsers()
        console.log(users)

        return res.status(200).json({data: users})
 
   }
  
}
