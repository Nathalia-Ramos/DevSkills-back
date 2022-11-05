import { PrismaClient, UsuarioProva, ProvaAndamento, RespostaQuestaoProva, RespostaAlternativaProva, Usuario, QuestaoProvaTipo, QuestaoProva } from "@prisma/client";
import { userAnswer, userTest } from "../../interfaces/AnswerTest";

const prisma = new PrismaClient();

export default class AnswerTestModel {
    static async createUserTest(
        id_usuario: number,
        id_prova_andamento: number,
        finalizada: boolean,
        data_entrega: string,
        data_inicio: string
    ) : Promise<UsuarioProva> {
        return await prisma.usuarioProva.create({
            data:{
                idUsuario: id_usuario,
                idProvaAndamento: id_prova_andamento,
                finalizada,
                data_entrega,
                data_inicio
            }
        })
    }
    
    static async findBy(key: string, value: any) : Promise<ProvaAndamento | null> {
  
       return await prisma.provaAndamento.findFirst({
          where:{
           [key]: value,
          }})
  
    }

    static async findTest(id_prova: number) {
        return await prisma.provaAndamento.findFirst({
            where:{
                id: id_prova
            },
            include:{
                prova: {
                    include:{
                        provasTodasQuestoes: {
                            select:{
                                questaoProva: {
                                    select: {
                                        alternativaProva: {
                                            select:{
                                                id: true,
                                                opcao: true
                                            }
                                        },
                                        id: true,
                                        enunciado: true,
                                        foto: true,
                                        questaoProvaTipo:{
                                            select:{
                                                tipo: true,
                                                id: true
                                            }
                                        }
                                    // }
                                    // include:{
                                    //     alternativaProva: {
                                    //         select: {
                                    //             opcao: true,
                                    //             idQuestaoProva: true
                                    //         }
                                    //     },
                                    //     questaoProvaTipo: true
                                    // },
                                    // }
                                }
                            }
                        }
                    }
                }
                }
            }
         } )
    }

    static async findAllQuestions(
        id_prova: number) {
            return await prisma.provasTodasQuestoes.findMany({
                where:{
                    idProva: id_prova
                }
            })
        }

    static async findUserTest(
        id_usuario: number,
        id_prova: number) {
            return await prisma.usuarioProva.findFirst({
                where:{
                    idProvaAndamento: id_prova,
                    idUsuario: id_usuario
                }
            })
        } 
}