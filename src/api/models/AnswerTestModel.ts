import { PrismaClient, UsuarioProva, ProvaAndamento, RespostaQuestaoProva, RespostaAlternativaProva, Usuario, QuestaoProvaTipo, QuestaoProva } from "@prisma/client";
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
    static async findBy(key: string, value: any) : Promise<ProvaAndamento | null> {
  
       return await prisma.provaAndamento.findFirst({
          where:{
           [key]: value,
          }})
  
    }

    static async findTest(id_prova: number) {
        return await prisma.provaAndamento.findFirst({
            /*where:{
                id: id_prova
            },
            include:{
                prova: {
                    include:{
                        provasTodasQuestoes: {
                            include:{
                                questaoProva: {
                                    include:{
                                        alternativaProva: true,
                                        questaoProvaTipo: true
                                    },
                                    }
                                }
                            }
                        }
                    }
                }*/
            }
        )
    }
}