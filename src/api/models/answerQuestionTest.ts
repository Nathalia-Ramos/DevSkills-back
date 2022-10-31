import { PrismaClient, RespostaQuestaoProva, RespostaAlternativaProva, QuestaoProvaTipo, QuestaoProva, AlternativaProva } from "@prisma/client";
import { userAnswer, userTest } from "../../interfaces/AnswerTest";

const prisma = new PrismaClient();

export default class answerQuestionTest {
    static async relateChoiceAnswer(
        id_prova: number,
        id_alternativa: number) : Promise<RespostaAlternativaProva> {
        return await prisma.respostaAlternativaProva.create({
            data:{
                idAlternativaProva: id_alternativa,
                idUsuarioProva: id_prova
            }
        })
    }

    static async relateTextAnswer(
        idProva: number,
        idQuestao: number,
        resposta: string
    ) : Promise<RespostaQuestaoProva> {
        return await prisma.respostaQuestaoProva.create({
            data:{
                questaoProva: {
                    connect:{
                        id: idQuestao
                    }
                },
                usuarioProva:{
                    connect: {
                        id: idProva
                    }
                },
                resposta: resposta
            }
        })
    }

    static async findQuestion(
        id_questao: number
    ) : Promise<QuestaoProva | null> {
        return await prisma.questaoProva.findFirst({
                where:{
                    id: id_questao
                },
                include:{
                    questaoProvaTipo: true
                }
            })
    }

    static async findQuestionTypeByID(
        id_tipo: number
    ) : Promise<QuestaoProvaTipo | null> {
        return await prisma.questaoProvaTipo.findFirst({
                where:{
                    id: id_tipo
                }
            })
    }

    static async findQuestionTypeByQuestion(
        id_questao: number) : Promise<QuestaoProvaTipo | null> {
        return await prisma.questaoProvaTipo.findFirst({
            where:{
                questaoProva:{
                    some:{
                        id: id_questao
                    }
                }
            }
        })
    }

    static async findChoice(
        id_alternativa: number,
        id_questao: number) : Promise<AlternativaProva | null> { 
            return await prisma.alternativaProva.findFirst({
                where:{
                    idQuestaoProva: id_questao,
                    id: id_alternativa
                }
            })
        }

}
