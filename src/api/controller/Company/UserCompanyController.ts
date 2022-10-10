import {Request, Response} from "express"
import UserCompanyModel from "../../models/Company/UserCompanyModel"
import bcrypt, { compare } from "bcrypt";
import CompanyData from "../../../interfaces/Company/Company"
import CompanyService from "../../../services/CompanyService/CompanyServices";



export default class UserCompanyController{

    static async execute(req: Request, res: Response){
        
       const user :  CompanyData = req.body


       const users = await CompanyService.createCompany(user)

       return res.status(201).json(users)
    } 

}
