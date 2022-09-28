import {Request, Response} from "express"
import UserCompanyModel from "../../models/UserCompanyModel"
import AddresController from "../../controller/Company/AdressController"


import { Empresa, EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../../database/prismaClient"

interface ICompanyRegister {
    cnpj: number;
    email: string;
    senha: string;
    nome_fantasia: string;
    idEndereco: number
}

export default class UserCompanyController{
    static async execute(req: any, res: Response){
        
        const  endereco : any = req.address

        if(typeof endereco === "boolean")
        return res.send("Deu ruim")

        const {cnpj, email, senha, nome_fantasia, logo} =  req.body


      try {
            const newUser = await UserCompanyModel.execute({
                 cnpj,
                 email, 
                 senha,
                 nome_fantasia,
                 idEndereco : endereco.id
            })
            res.status(201).json({ message: "Empresa cadastrada com sucesso!", newUser,});
           
            return;

        } catch (error : any) {
            return res.send("Não foi possivel inserir!!!")
        }
    }
}