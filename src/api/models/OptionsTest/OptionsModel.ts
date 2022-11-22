import { prismaClient } from "../../../database/prismaClient"
import { AlternativaProva } from "@prisma/client"
import {Option}  from "../../interfaces/Test/Tests";


export default class OptionsModel {
    static async createOptions ({
        texto
    } : Option) : Promise <AlternativaProva | boolean>{
        try {
            const newOption = await prismaClient.alternativaProva.create({
                data: {
                  opcao: texto,
                  correta: true
                }
            })

            prismaClient.$disconnect;
    
            return newOption

        } catch (error) {
            prismaClient.$disconnect;

            return false
        }
    }
}