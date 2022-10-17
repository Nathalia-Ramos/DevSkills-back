import { prismaClient } from "../../../database/prismaClient"
import { QuestaoProva } from "@prisma/client"
import Question from "../../interfaces/Question/Question"

export default class QuestionModel{
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

    static async findQuestion (id:number): Promise <QuestaoProva | null>{
        return await prismaClient.questaoProva.findFirst({
            where: {
                id
            }
        })
    }
}