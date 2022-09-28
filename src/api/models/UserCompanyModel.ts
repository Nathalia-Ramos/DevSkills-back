import {Request, Response} from "express"

import { Empresa } from "@prisma/client"
import { prismaClient } from "../../database/prismaClient"

interface data {
    cnpj: number;
    email: string;
    senha: string;
    nome_fantasia: string;
    logo: string;
    idEndereco: number
}

export default class UserCompanyModel{

    static async execute({
        cnpj,
        email,
        senha,
        nome_fantasia,
        logo,
        idEndereco
      }: data): Promise<Empresa | false> {

        // Tentando criar um Livro
        try {
          const newCompany = await prismaClient.empresa.create({
            data: {
                cnpj,
                email,
                senha,
                nome_fantasia,
                ativo: true,
                idEndereco
            },
          });
    
          prismaClient.$disconnect;
    
          return newCompany;
          
        } catch (error) {
          console.error(error);
    
          prismaClient.$disconnect;
    
          return false;
        }
      }
    }