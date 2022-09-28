import {Request, Response} from "express"
import UserCompanyModel from "../models/UserCompanyModel"

import { Empresa } from "@prisma/client"
import { prismaClient } from "../../database/prismaClient"

interface ICompanyRegister {
    cnpj: number;
    email: string;
    senha: string;
    nome_fantasia: string;
    logo: string;
    idEndereco: number
}

export default class UserCompanyController{
    static async execute(req: Request, res: Response){

        const {cnpj, email, senha, nome_fantasia, ativo , biografia, logo, idEndereco} = req.body


      try {
            const newUser = await UserCompanyModel.execute({
                 cnpj,
                 email, 
                 senha,
                 nome_fantasia,
                 logo,
                 idEndereco
            })
            res.status(201).json({message: "Registro criado com sucesso!", newUser})
        } catch (error : any) {
            res.status(500).json({message: "Não foi possível criar registro"})
        }
    }
}