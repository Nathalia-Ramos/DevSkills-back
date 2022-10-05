import {Request, Response} from "express"
import { prismaClient } from "../../../database/prismaClient"

import { LoginEmpresa} from "@prisma/client"
import { Empresa } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"
import { type } from "os"

interface ICompanyAuth{
    login: string,
    senha?: string,
    idEmpresa: number
}

export default class AuthController {

    static async auth(req: Request, res: Response)
    {

        const { senha, cnpj, email, login} = req.body
        const { id } = req.params

        if(!login || !senha) return res.status(500).json({Error: "Existem campos obrigatórios que não foram preenchidos!"})

        //verificando se o usuário existe
        try {
            
            const userExist = await prismaClient.empresa.findUnique({
                
                where: {
                    
                    email: email.userExist,
                    cnpj: cnpj.userExist
                }
                
            })
            
            if(!userExist) return res.status(400).send({error: "Usuário não encontrado"})
      

            if(login === login?.email || login === login?.cnpj) {

                if(await bcrypt.compare(senha, login.senha)){
                    const data = {
                        nome: login.nome_fantasia,
                        idEmpresa: login.id,
                        type: "COMPANY"
                    }
    
                    //gerando o token 
                    const token = jwt.sign({id: login.id}, 'secret', {expiresIn: '1d'})
                    
                  
                    return res.json({data, token})
    
                }else{
                    res.status(500).json({message: "Usuário ou senhas inválida"})
                }
            }else{
                return res.status(400).send({error: "Usuário não encontrado"})
            }   
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
}

