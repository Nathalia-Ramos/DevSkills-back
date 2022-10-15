import { PrismaClient, RespostaQuestaoProva, RespostaAlternativaProva, QuestaoProvaTipo, QuestaoProva } from "@prisma/client";
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
    ) : Promise<QuestaoProva | null> {
        return await prisma.questaoProva.findFirst({
            where:{
                id: id_questao
            },
            include:{
                questaoProvaTipo:{
                    select:{
                        tipo: true,
                        id: true
                    }
                }
            }
            // select:{
            //     enunciado: true,
            //     id: true,
            //     foto: true,
            //     idQuestaoProvaTipo: true,
            //     questaoProvaTipo:{
            //         select:{
            //             tipo: true,
            //         }
            //     }
            // }
        })
    }
}
