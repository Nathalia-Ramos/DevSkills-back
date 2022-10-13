import { prismaClient } from "../../../database/prismaClient"
import { QuestaoProva } from "@prisma/client"
import Question from "../../../interfaces/Test/Questio"

export default class QuestionModel{
    static async createTestQuestion({
        enunciado,
        foto,
        id_tipo
    }: Question ) : Promise<QuestaoProva | boolean> {
        try {
            const newQuestion = await prismaClient.questaoProva.create({
                data: {
                    enunciado,
                    foto,
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