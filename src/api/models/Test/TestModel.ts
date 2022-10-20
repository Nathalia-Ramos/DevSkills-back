//import TestData from "../../../interfaces/Test/Test";
import { prismaClient } from "../../../database/prismaClient"
import { Prova } from "@prisma/client";
import Test from "../../interfaces/Test/Test";
import Question from "../../interfaces/Question/Question";
import { QuestaoProva } from "@prisma/client";


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
                    idProvaTipo: id_tipo,
                    link_repositorio,
                    ativo: true
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
    static async createTestQuestion({
        enunciado,
        img_url,
        id_tipo
    }: Question ) : Promise<QuestaoProva | boolean> {
        try {
            const newQuestion = await prismaClient.questaoProva.create({
                data: {
                    enunciado,
                    foto: img_url,
                    idQuestaoProvaTipo: id_tipo
                }
            })

            prismaClient.$disconnect

            return newQuestion
            
        } catch (error) {
            
            prismaClient.$disconnect

            return false
        }
    }
}