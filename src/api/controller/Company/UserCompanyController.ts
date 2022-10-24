import {Request, Response} from "express"
import UserCompanyModel from "../../models/Company/UserCompanyModel"
import bcrypt, { compare } from "bcrypt";
import CompanyData from "../../interfaces/Company/Company"
import CompanyService from "../../services/Company/CompanyServices";

export default class UserCompanyController{

    static async execute(req: Request, res: Response){
        
       const user :  CompanyData = req.body

       const users = await CompanyService.createCompany(user)

       return res.status(201).json({message: "Usuário criado com sucesso!"})
      
    } 

    static async sendPassMail(req: Request, res: Response) {
    
        const { email } = req.body
        
        const resposta = await CompanyService.sendMail(email)

        return res.status(200).json({resposta })

    }

}
