import Question from "../../../interfaces/Test/Questio";
import { QuestaoProvaTipo } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

export default class QuestionTypeModel {
    static async create({
        tipo
    }: Question ): Promise <QuestaoProvaTipo | boolean>{
        try {
            const newQuestionType = await prismaClient.questaoProvaTipo.create({
               data: {
                tipo
               } 
            })

            prismaClient.$disconnect

            return newQuestionType
            
        } catch (error) {
            console.error(error)

            prismaClient.$disconnect

            return false
        }
    }

}