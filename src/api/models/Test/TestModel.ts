//import TestData from "../../../interfaces/Test/Test";
import { prismaClient } from "../../../database/prismaClient"
import { prisma, Prova, ProvaHabilidade, ProvaStack } from "@prisma/client";
import { QuestaoProva } from "@prisma/client";
import { Question, TestData } from "../../interfaces/Test/Tests";
import Test from "../../interfaces/Test/Test";

export default class TestModel {
    static async create({
        titulo,
        descricao,
        link_repositorio,
        id_tipo
   
    }: Test): Promise<Prova> {
        
        return await prismaClient.prova.create({
                data: {
                    titulo,
                    descricao,
                    idProvaTipo: id_tipo,
                    link_repositorio,
                    ativo: true
                }
            })
          
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
    static async relateSkills(
        id_prova: number,
        ids_habilidades: number,
      ) : Promise<ProvaHabilidade> {
    
          return await prismaClient.provaHabilidade.create({
            data:{
             idProva: id_prova,
             idHabilidade: ids_habilidades
            }});
    
      }
      static async relateStack(
        id_prova: number,
        ids_stacks: number,
      ): Promise <ProvaStack> {
          return await prismaClient.provaStack.create({
              data: {
                  idProva: id_prova,
                  idProvaStack: ids_stacks
              }
          })
      }
    
}