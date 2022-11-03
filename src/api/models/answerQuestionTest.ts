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

    static async updateTextAnswer(
        id_resposta: number,
        id_prova_usuario: number,
        id_questao: number,
        resposta: string
    ) : Promise<RespostaQuestaoProva> {
        return await prisma.respostaQuestaoProva.update({
            data:{
                idQuestaoProva: id_questao,
                idUsuarioProva: id_prova_usuario,
                resposta: resposta
            },
            where: {
                id: id_resposta
            }
        })
    }

    static async updateChoiceAnswer(
        id_resposta: number,
        id_prova_usuario: number,
        id_alternativa: number
    ) : Promise<RespostaAlternativaProva> {
        return await prisma.respostaAlternativaProva.update({
            data:{
                idUsuarioProva: id_prova_usuario,
                idAlternativaProva: id_alternativa
            },
            where: {
                id: id_resposta
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
    
    static async findChoiceAnswer(
        id_alternativa: number,
        id_prova_usuario: number
    ) : Promise<RespostaAlternativaProva | null> {
        return await prisma.respostaAlternativaProva.findFirst({
            where:{
                idAlternativaProva: id_alternativa,
                idUsuarioProva: id_prova_usuario
            }
        })
    }

    static async findTextAnswer(
        id_prova_usuario: number,
        id_questao: number 
    ) {
        return await prisma.respostaQuestaoProva.findFirst({
            where:{
                idUsuarioProva: id_prova_usuario,
                idQuestaoProva: id_questao
            }
        })
    }

}
