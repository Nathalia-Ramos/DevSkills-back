import {Request, Response} from "express"

import { EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../database/prismaClient"

interface Data {
    bairro: string,
    cep : string,
    logradouro : string,
    numero : string,
    complemento: string,
    idCidade: number
}

export default class AddressModel{
  
  static async execute({
    bairro,
    cep,
    logradouro,
    numero,
    complemento,
    idCidade 
  }: Data): Promise<EnderecoEmpresa | boolean> {
    
    
        try {
          const newCompany = await prismaClient.enderecoEmpresa.create({
            data: {
                bairro,
                cep,
                logradouro,
                numero,
                complemento,
                idCidade 
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