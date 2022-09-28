import {NextFunction, Request, Response} from "express"

import { EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../../database/prismaClient"

export default class AddressController { 
    static async create(req: any, res: Response, next: NextFunction) : Promise <any >{
        
        const {logradouro, numero, bairro, cep, complemento, idCidade} : EnderecoEmpresa = req.body

        try {
            const newAdress = await prismaClient.enderecoEmpresa.findFirst()
           
              req.address = newAdress
              next()
              
              
        } catch (error : any) {
           
    }
}

}