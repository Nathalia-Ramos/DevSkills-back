import {Request, Response} from "express"

import { Empresa } from "@prisma/client"
import { prismaClient } from "../../database/prismaClient"

interface Data {
    cnpj: string;
    email: string;
    senha: string;
    nome_fantasia: string;
    idEndereco: number
}

export default class UserCompanyModel{
  
  static async execute({
    cnpj,
    email,
    senha,
    nome_fantasia,
    idEndereco : idEndereco
  }: Data): Promise<Empresa | boolean> {
    
    
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