import {Request, Response} from "express"

import { EnderecoEmpresa } from "@prisma/client"
import { prismaClient } from "../../database/prismaClient"

export default class EnderecoController { 
    static async create(req: Request, res: Response){
        
        const {logradouro, numero, bairro, cep, complemento, idCidade} : EnderecoEmpresa = req.body

        try {
            const newAdress = await prismaClient.enderecoEmpresa.create({
                data: {
                    logradouro,
                    numero,
                    bairro,
                    cep,
                    complemento,
                    idCidade
                }
            })
            res.status(201).json({newAdress})
        } catch (error : any) {
            res.status(500).json({message: "Não foi possivel criar registro"})
    }
}

}