import {Request, Response} from "express"

import { LoginEmpresa } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient"

interface Data {
    senha: string,
    idEmpresa: number
}

export default class AuthModel{
  
  static async execute({
    senha: string,
    idEmpresa: number
    
  }: Data): Promise<LoginEmpresa | boolean> {
    
    
        try {
          const Auth = await prismaClient.loginEmpresa.create({
            data: {
                senha: string,
                idEmpresa: number
            },
          });
    
          prismaClient.$disconnect;
    
          return Auth;
          
        } catch (error) {
          console.error(error);
    
          prismaClient.$disconnect;
    
          return false;
        }

        
      }
    }