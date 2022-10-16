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

    static async findType(
        id_questao: number
    ) : Promise<QuestaoProvaTipo | null> {
        return await prisma.questaoProvaTipo.findFirst({
                where:{
                    questaoProva:{
                        every:{
                            id: id_questao
                        }
                    }
                },
                select:{
                    tipo: true,
                    id:true
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
