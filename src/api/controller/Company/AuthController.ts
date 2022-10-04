import {Request, Response} from "express"

import UserCompanyController from "./UserCompanyController"
import UserCompanyModel from "../../models/UserCompanyModel"
import { prismaClient } from "../../../database/prismaClient"

import { Empresa } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"

interface ICompanyAuth{
    email: string,
    senha?: string
}

export default class AuthController {
    static async auth(req: Request, res: Response){

        const { email, senha } = req.body

        if(!email || !senha) res.status(500).json({message: "Existem campos obrigatórios que não foram preenchidos!"})

        //verificando se o usuário existe
        try {
            const userExist = await prismaClient.empresa.findFirst({
                where: {
                    email
                }
            })

            if(!userExist) return res.status(400).send({error: "Usuário não encontrado"})
            
            if(await bcrypt.compare(senha, userExist?.senha)){
                const data = {
                    nome : userExist?.nome_fantasia,
                    cnpj: userExist?.cnpj,
                    email: userExist?.email
                }
                const token = jwt.sign({id: userExist?.id}, 'secret', {expiresIn: '1d'})
           
             

                res.json({userExist, token})
            }else{
                res.status(500).json({message: "Usuário ou senhas inválida"})
            }
        }   

        catch (error: any) {
            res.status(404).json({message: "Falha na autenticação"})
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

                
                //tempo de expiração do token
                const now = new Date()
                now.setHours(now.getHours() + 1)


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
            
            //if(token !== userExis)
            
        } catch (error) {
            console.log(error)
        }
    }
}

