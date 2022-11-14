import { prismaClient } from "../../../database/prismaClient"
import { QuestaoProva, QuestaoProvaTipo, AlternativaProva, RespostaQuestaoProva, RespostaAlternativaProva, ProvasTodasQuestoes } from "@prisma/client"
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

    static async findQuestion(
        id_questao: number
    ) : Promise<QuestaoProva | null> {
        return await prismaClient.questaoProva.findFirst({
                where:{
                    id: id_questao
                },
                include:{
                    questaoProvaTipo: true
                }
            })
    }

    static async findChoice(
        id_alternativa: number,
        id_questao: number) : Promise<AlternativaProva | null> { 
            return await prismaClient.alternativaProva.findFirst({
                where:{
                    idQuestaoProva: id_questao,
                    id: id_alternativa
                }
            })
    }

    static async relateChoiceAnswer(
        id_prova: number,
        id_alternativa: number) : Promise<RespostaAlternativaProva> {
        return await prismaClient.respostaAlternativaProva.create({
            data:{
                idAlternativaProva: id_alternativa,
                idUsuarioProva: id_prova
            }
        })
    }

    static async findQuestionTypeByID(
        id_tipo: number
    ) : Promise<QuestaoProvaTipo | null> {
        return await prismaClient.questaoProvaTipo.findFirst({
                where:{
                    id: id_tipo
                }
            })
    }

    static async relateTextAnswer(
        id_prova_usuario: number,
        id_questao: number,
        resposta: string
    ) : Promise<RespostaQuestaoProva> {
        return await prismaClient.respostaQuestaoProva.create({
            data:{
                questaoProva: {
                    connect:{
                        id: id_questao
                    }
                },
                usuarioProva:{
                    connect: {
                        id: id_prova_usuario
                    }
                },
                resposta: resposta
            }
        })
    }

    static async findAllQuestions(
        id_prova: number
    ) : Promise<ProvasTodasQuestoes[]> {
        return await prismaClient.provasTodasQuestoes.findMany({
            where:{
                idProva: id_prova
            }
        })
    }

    static async findAllAnswers(
        id_prova_usuario: number
    ) {
        return await prismaClient.usuarioProva.findFirst({
            where: {
                id: id_prova_usuario
            },
            select:{
                _count:{
                    select:{
                        respostaAlternativaProva: true,
                        respostaQuestaoProva: true
                    }
                }
            }                
        })
    }

    static async findTextAnswer(
        id_prova_usuario: number,
        id_questao: number
    ) : Promise<RespostaQuestaoProva | null> {
        return await prismaClient.respostaQuestaoProva.findFirst({
            where:{
                idUsuarioProva: id_prova_usuario,
                idQuestaoProva: id_questao
            }
        })
    } 

    static async findChoiceAnswer(
        id_prova_usuario: number,
        id_questao: number
    ) : Promise<RespostaAlternativaProva | null> {
        return await prismaClient.respostaAlternativaProva.findFirst({
            where:{
                idUsuarioProva: id_prova_usuario,
                alternativaProva:{
                    idQuestaoProva: id_questao
                }
            }
        })
    }

    static async findOptionAnswer(
        id_prova_usuario: number,
        id_alternativa: number
    ) {
        return await prismaClient.respostaAlternativaProva.findFirst({
            where:{
                idAlternativaProva: id_alternativa,
                idUsuarioProva: id_prova_usuario
            }
        })
    }

    static async findUserChoices(
        id_prova_usuario: number,
        id_questao: number
    )  {
        return await prismaClient.respostaAlternativaProva.findMany({
            where:{
                idUsuarioProva: id_prova_usuario,
                alternativaProva:{
                    idQuestaoProva: id_questao
                }
            }
        })
    }

    static async deleteUserChoices(
        id_questao: number
    ) {
        return await prismaClient.respostaAlternativaProva.deleteMany({
            where:{
                alternativaProva:{
                    idQuestaoProva: id_questao
                }
            }
        })
    }

    static async updateTextAnswer(
        id: number,
        resposta: string
    ) : Promise<RespostaQuestaoProva | null> {
        return await prismaClient.respostaQuestaoProva.update({
            where: {
                id
            },
            data:{
                resposta: resposta
            }
        })
    }

    static async updateChoiceAnswer(
        id: number,
        id_alternativa: number
    ) {
        return await prismaClient.respostaAlternativaProva.update({
            where:{
                id
            },
            data:{
                idAlternativaProva: id_alternativa
            }
        })
    }

    static async deleteChoiceAnswer(
        id: number
    ) {
        return await prismaClient.respostaAlternativaProva.delete({
            where:{
                id
            }
        })
    }

}