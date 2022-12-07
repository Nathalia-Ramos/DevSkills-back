import {
  PrismaClient,
  UsuarioProva,
  ProvaAndamento,
  RespostaQuestaoProva,
  RespostaAlternativaProva,
  Usuario,
  QuestaoProvaTipo,
  QuestaoProva,
} from "@prisma/client";
import { userAnswer, userTest } from "../../interfaces/AnswerTest";

const prisma = new PrismaClient();

export default class AnswerTestModel {
  static async createUserTest(
    id_usuario: number,
    id_prova_andamento: number,
    finalizada: boolean,
    data_entrega: string,
    data_inicio: string
  ): Promise<UsuarioProva> {
    return await prisma.usuarioProva.create({
      data: {
        idUsuario: id_usuario,
        idProvaAndamento: id_prova_andamento,
        finalizada,
        data_entrega,
        data_inicio,
      },
    });
  }

  static async findBy(key: string, value: any): Promise<ProvaAndamento | null> {
    return await prisma.provaAndamento.findFirst({
      where: {
        [key]: value,
      },
    });
  }

  static async findUserTestByID(id_prova_usuario: number) {
    return await prisma.usuarioProva.findFirst({
      where: {
        id: id_prova_usuario,
      },
      include: {
        provaAndamento: {
          include: {
            prova: {
              include: {
                provasTodasQuestoes: {
                  include: {
                    questaoProva: {
                      include: {
                        questaoProvaTipo: {
                          select:{
                            id: true,
                            tipo: true
                          }
                        },
                        alternativaProva: {
                            select: {
                                correta: false,
                                id: true,
                                idQuestaoProva: true,
                                opcao: true,
                                questaoProva: false,
                                respostaAlternativaProva: false,
                            }
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }


  static async findTest(id_prova: number) {
    return await prisma.provaAndamento.findFirst({
      where: {
        id: id_prova,
      },
      include: {
        prova: {
          include: {
            provasTodasQuestoes: {
              include: {
                questaoProva: {
                  include: {
                    alternativaProva: {
                        select: {
                            correta: false,
                            id: true,
                            idQuestaoProva: true,
                            opcao: true,
                            questaoProva: false,
                            respostaAlternativaProva: false,
                        }
                    },
                    questaoProvaTipo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  static async findAllQuestions(id_prova: number) {
    return await prisma.provasTodasQuestoes.findMany({
      where: {
        idProva: id_prova,
      },
    });
  }

  static async findUserTest(id_usuario: number, id_prova: number) {
    return await prisma.usuarioProva.findFirst({
      where: {
        idProvaAndamento: id_prova,
        idUsuario: id_usuario,
      },
    });
  }
}
