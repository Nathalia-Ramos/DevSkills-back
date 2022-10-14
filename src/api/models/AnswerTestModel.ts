import { PrismaClient, UsuarioProva, RespostaQuestaoProva, RespostaAlternativaProva, Usuario, QuestaoProvaTipo, QuestaoProva } from "@prisma/client";
import { userAnswer, userTest } from "../../interfaces/AnswerTest";

const prisma = new PrismaClient();

export default class AnswerTestModel {
    static async createUserTest({
        id_usuario,
        id_prova_andamento,
        finalizada,
        data_entrega
    } : userTest) : Promise<UsuarioProva> {
        return await prisma.usuarioProva.create({
            data:{
                idUsuario: id_usuario,
                idProvaAndamento: id_prova_andamento,
                finalizada,
                data_entrega
            }
        })
    }

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
        id_prova: number,
        id_questao: number,
        resposta: string
    ) : Promise<RespostaQuestaoProva> {
        return await prisma.respostaQuestaoProva.create({
            data:{
                idQuestaoProva: id_questao,
                idUsuarioProva: id_prova,
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