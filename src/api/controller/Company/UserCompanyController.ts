import {Request, Response} from "express"
import UserCompanyModel from "../../models/UserCompanyModel"

import { Empresa, EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../../database/prismaClient"
import bcrypt, { compare } from "bcrypt";

interface ICompanyRegister{
    cnpj: number;
    email: string;
    senha: string;
    nome_fantasia: string;
    idEndereco: number
}

export default class UserCompanyController{
    static async execute(req: Request, res: Response){
        
       
        const {cnpj, email, senha, nome_fantasia, idEndereco} =  req.body

        if(!cnpj || !email || !senha || !nome_fantasia|| !idEndereco ) 
          res.status(500).json({message: "Existem campos obrigatórios que não foram preenchidos!"})
            


         //valida o tamanho do cnpj
        if (cnpj.length > 14 || cnpj.length < 14) return res.status(400).json({message: "CNPJ inválido"})



        
        if(!senha.match(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,15}$/))
           return res.status(400).json({message: "Senha inválida!"})

      
        else{
            try {

                  const senhaHash = await bcrypt.hash(senha, 10)
                  
                  const newUser = await UserCompanyModel.execute({
                      cnpj,
                      email,
                      senha: senhaHash,
                      nome_fantasia,
                      idEndereco 
                      })

                  return res.status(201).json({ message: "Empresa cadastrada com sucesso!", newUser});;
      
              } catch (error: any ) {
                  return res.send("Não foi possivel inserir!!!")
              }
        }
    }
}
