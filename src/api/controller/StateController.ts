import {Request, Response} from "express"

import { Estado } from "@prisma/client"
import { prismaClient } from "../../database/prismaClient"


export default class StateController{
    static async create(req: Request, res: Response){
        
        const {nome} : Estado = req.body

        try {
            const newState = await prismaClient.estado.create({
                data: {
                    nome
                }
            })
            res.status(201).json(newState)
        } catch (error: any) {
            res.status(500).json({message: "Error"})
        }
    }
}