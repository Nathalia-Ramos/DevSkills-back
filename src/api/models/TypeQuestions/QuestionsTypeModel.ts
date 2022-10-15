import { QuestaoProvaTipo } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import Test from "../../interfaces/Test/Tests"
import Question from "../../interfaces/Question/Question";

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