//import TestData from "../../../interfaces/Test/Test";
import { prismaClient } from "../../../database/prismaClient"
import { Prova } from "@prisma/client";
import Test from "../../../interfaces/Test/Tests";

export default class TestModel {
    static async create({
        titulo,
        descricao,
        link_repositorio,
        id_tipo
    }: Test): Promise<Prova | boolean> {
        
        try {
            const newTest = await prismaClient.prova.create({
                data: {
                    titulo,
                    descricao,
                    link_repositorio,
                    ativo: true,
                    idProvaTipo: id_tipo
                }
            })
             
            prismaClient.$disconnect;
    
            return newTest

        }catch (error) {
           console.error(error);
    
           prismaClient.$disconnect;
    
           return false;
        }
    } 
    static async findTest(id: number) : Promise<Prova | null>{
        return await prismaClient.prova.findFirst({
            where: {
                id
            }
        })
    }
}