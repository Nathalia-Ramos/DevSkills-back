import AdminService from "../../../services/Admin/AdminService"
import { Request, Response } from "express";
import AdminData from "../../../interfaces/Admin/Admin";
 
export default class UserAdminController {
    static async create(req: Request, res: Response) {
 
        let admin : AdminData = req.body
  
        const answer = await AdminService.create(admin)
 
        res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message})
 
    }
    static async auth(req: Request, res: Response) {
 
     const { login, senha } = req.body
 
     const answer = await AdminService.auth(login, senha)
 
     res.status(answer.statusCode).json(answer.error ? {error: answer.error} : {message: answer.message, type: answer.userType, token: answer.token})
 
    }
 
 }