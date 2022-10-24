import { prismaClient } from "../../../database/prismaClient"
import { QuestaoProva, AlternativaProva } from "@prisma/client"
import {Question, Option }  from "../../interfaces/Test/Tests";

export default class QuestionModel{
    static async createTestQuestion({
        enunciado,
        img_url,
        id_tipo
    }: Question ) : Promise<QuestaoProva> {
        return await prismaClient.questaoProva.create({
                data: {
                    enunciado,
                    foto: img_url,
                    idQuestaoProvaTipo: id_tipo
                }
            })
    }
    static async createTestOption(
        correta: boolean,
        texto: string,
        id_questao: number
    ) : Promise<AlternativaProva> {
    
            return await prismaClient.alternativaProva.create({
                data: {
                    correta,
                    opcao: texto,
                    questaoProva:{
                        connect:{
                            id: id_questao
                        }
                    }
                }
            })

    }
    static async findQuestion (id:number): Promise <QuestaoProva | null>{
        return await prismaClient.questaoProva.findFirst({
            where: {
                id
            }
        })
    }
}