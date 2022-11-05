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

    static async getCompany(req: Request, res: Response){
        try {
            const company = await UserCompanyModel.allCompany()

            return res.status(200).json({company})
        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static async getCompanyStack(req: Request, res: Response){
        const {pesquisa} = req.params

        const result = await CompanyService.stack(pesquisa)
        console.log(result)

        return res.status(200).json({data: result})

    }
    static async getCompanySkill(req: Request, res: Response){
        const {search} = req.params

        const resultado = await CompanyService.skill(search)
        console.log(resultado)

        return res.status(200).json( {data: resultado})

    }
    static async getCompanyTest(req: Request, res: Response){
        const { search } = req.params

        const result = await CompanyService.testTitlle(search)

        return res.status(200).json({data: result})
    }

}
