import {Request, Response} from "express"
import { prismaClient } from "../../../database/prismaClient"

import { LoginEmpresa} from "@prisma/client"
import AuthCompanyModel from "../../models/Company/AuthCompanyModel"
import { Empresa } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"


interface login { 
    id: number,
    cnpj: string,
    email: string,
    senha: string,
    idEmpresa: string
}

export default class AuthController {

   static async autentic(req: Request,res: Response)
    {

        const { senha, idEmpresa, cnpj, email, nome_fantasia} = req.body
      
       if(!senha || !idEmpresa) return res.status(500).json({Error: "Existem campos obrigatórios que não foram preenchidos!"})

        //verificando se o usuário existe
        try {
            
            const userExist = await prismaClient.loginEmpresa.findFirst ({
                
                where: {
                    OR: [
                        {
                         empresa: {
                            cnpj
                         }
                        },
                        {
                            empresa: {
                                email
                            }
                        }
                    ]
                }
                
            })
            
            if(!userExist) return res.status(400).send({error: "Usuário não encontrado"})
      

                if(await bcrypt.compare(senha, userExist.senha)){
                    const data = {
                       // nome:  userExist?.nome_fantasia,
                        idEmpresa: userExist?.idEmpresa , 
                        type: "COMPANY"
                    }
    
                    //gerando o token 
                    const token = jwt.sign({id: userExist.id}, 'secret', {expiresIn: '1d'})
                    
                  
                    return res.json({data, token})
    
                }else{
                    res.status(500).json({message: "Usuário ou senhas inválida"})
                }
            
              //  return res.json({ message: "AE"})
         }



        catch (error: any) {
            console.error(error)
            return res.status(400).json({error: "Falha na autenticação"})
        }
    }

    //recuperação de senha
    static async forgot_pass (req: Request, res: Response) {
        const { id } = req.params
        const {email} = req.body

        try {
                const userExist = await prismaClient.empresa.findFirst({
                    where: {
                        email
                    }
                })

                //gerando token aleatorio de 15 caracteres
                const token = crypto.randomBytes(15).toString("hex")

                const transporter = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "b274b37dbf36eb",
                        pass: "5bdb6259c7d9b6"
                    }
                })

                transporter.sendMail({
                    from: 'Administrador <0a4aaf5b8b-d7590b+1@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Token para recuperação de senha ',
                    text: `Olá, o seu token para recuperação de senha é: ${token}`
                })

                res.send()

        } catch (error) {
            
        }
    }

    static async ResetPassword (req: Request, res: Response) {
        const { email, senha, token} = req.body
       
        try {

            //verificando se o usuário existe
            const userExist = await prismaClient.empresa.findFirst({
                where: email.email
            })
            
            
        } catch (error) {
            console.log(error)
        }
    }

    static async auth(req: Request, res: Response) {

        const {senha, idEmpresa} =  req.body

        if(!senha.match(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$/))
           return res.status(400).json({message: "Senha inválida!"})

           const senhaHash = await bcrypt.hash(senha, 10)

        try {
            const  User = await AuthCompanyModel.execute({
               senha: senhaHash,
               idEmpresa
              })

             return res.status(201).json({ message: "Empresa cadastrada com sucesso!", User});;
 
        } catch (error: any) {
            console.log(error)

        }
    }
}

