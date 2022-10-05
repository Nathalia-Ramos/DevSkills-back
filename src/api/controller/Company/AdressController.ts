import {NextFunction, Request, Response} from "express"

import { EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../../database/prismaClient"
import AddressModel from "../../models/AddressModel"

interface IAddressRegister{ 
    bairro: string,
    cep: string,
    logradouro : string,
    numero: string,
    complemento: string,
    idCidade: number
}

export default class AddressController { 
    static async execute (req: any, res: Response){
        
        const {logradouro, numero, bairro, cep, complemento, idCidade} = req.body

        if(!logradouro || !numero || !bairro || !cep || !complemento|| !idCidade) return res.status(400).json({message: "Existem campos obrigatórios que não foram preenchidos"})



        try {
            const newAdress = await AddressModel.execute({
               bairro,
               cep,
               logradouro,
               numero,
               complemento,
               idCidade 
            })

               
            res.status(201).json({ message: "Registro cadastro com sucesso!", newAdress,});
           
            return;
              
        } catch (error : any) {
           
    }
}

}