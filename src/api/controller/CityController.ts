import {Request, Response} from "express";

import { Cidade } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

export default class CityController {
    static async create(req: Request, res: Response){ 

        const {nome, idEstado} : Cidade = req.body

        try {
            const newCity = await prismaClient.cidade.create({
                data: {
                    nome,
                    idEstado
                }
            })
            res.status(201).json(newCity)
        } catch (error) {
            res.status(500).json({message: "Não foi possivel criar registro"})
        }
    }
}