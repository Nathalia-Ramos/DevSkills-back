import {Request, Response} from "express"
import UserCompanyModel from "../../models/Company/UserCompanyModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export default class AuthController {
    static async authetication(req: Request, res: Response){

      

        const{login, senha} = req.body

      //  console.log(req.body)

        const userExist = await UserCompanyModel.findByEmail(login)
        console.log(userExist)
        
        if(userExist != null) {
            const CompanyLogin = await UserCompanyModel.findLoginByID(userExist.id)
            console.log(CompanyLogin)
            if (CompanyLogin != null) {
                    if(await bcrypt.compare(senha, CompanyLogin.senha)){
                        const data = {
                            nome: userExist?.nome_fantasia,
                            idEmpresa: userExist.id,
                            type: "COMPANY"
                        }
                            const token = jwt.sign({id: userExist?.id}, 'secret', {expiresIn: '1d'})
                            
                            return res.json({data, token})
                        }            
                    }
            }

  
    }
}