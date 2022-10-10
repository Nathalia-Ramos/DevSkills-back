import {Request, Response} from "express"
import UserCompanyModel from "../../models/Company/UserCompanyModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export default class AuthController {
    static async authetication(req: Request, res: Response){

      

        const{login, senha} = req.body

    
        const userExist = await UserCompanyModel.findEmailCompany(login)

        if(userExist != null) {
            const CompanyLogin = await UserCompanyModel.findIDLogin(userExist.empresa)
              if(CompanyLogin)
                if(await bcrypt.compare(senha, CompanyLogin.senha)){
                }
                const data = {
                    nome: userExist?.nome_fantasia,
                    empresa: userExist.empresa,
                    type: "COMPANY"
                }
                    const token = jwt.sign({id: userExist?.id}, 'secret', {expiresIn: '1d'})
                    
                    return res.json({data, token})
                }
  
    }
}