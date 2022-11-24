//import TestData from "../../../interfaces/Test/Test";
import {
    AdministradorProvas,
    Prova,
    ProvaAndamento,
    ProvaHabilidade,
    ProvaStack,
    ProvasTodasQuestoes,
    ProvaTipo,
    QuestaoProva,
    QuestaoProvaTipo,
    RespostaQuestaoProva,
    UsuarioProva,
    AlternativaProva,
    RespostaAlternativaProva,
    Usuario
} from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { userTest } from "../../interfaces/Test/AnswerTest";
import filter from "../../interfaces/Test/AdminFilter";
// import { updateUserTest } from "../../interfaces/Test/AnswerTest";
import Test from "../../interfaces/Test/Test";
import TestProgress from "../../interfaces/Test/TestProgress";
import { Question } from "../../interfaces/Test/Tests";

export default class TestModel {
  static async createTest({
    titulo,
    descricao,
    link_repositorio,
    id_tipo,
  }: Test): Promise<Prova> {
    return await prismaClient.prova.create({
      data: {
        titulo,
        descricao,
        idProvaTipo: id_tipo,
        link_repositorio,
        ativo: true,
      },
    });
  }
  static async createUserTest({
    id_usuario,
    id_prova_andamento,
    finalizada,
    data_inicio
  }: userTest): Promise<UsuarioProva> {
    return await prismaClient.usuarioProva.create({
      data: {
        idUsuario: id_usuario,
        idProvaAndamento: id_prova_andamento,
        finalizada,
        data_inicio: new Date(data_inicio)
      },
    });
  }

  static async findAllQuestions(
        id_prova: number) {
            return await prismaClient.provasTodasQuestoes.findMany({
                where:{
                    idProva: id_prova
                },
                include:{
                  questaoProva: {
                    include:{
                      questaoProvaTipo: true
                    }
                  }
                }
            })
  }

  static async findTextQuestions(id_prova: number) {
    return await prismaClient.provasTodasQuestoes.findMany({
      where:{
        idProva: id_prova,
        questaoProva:{
          questaoProvaTipo:{
            tipo: "DISSERTATIVA"
          }
        }
      }
    })
  }

  static async findQuestion (id: number) {
    return await prismaClient.questaoProva.findFirst({
        where: {
            id
        },
        include:{
          questaoProvaTipo: true
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

    static async findOption(
      id_alternativa: number,
      id_questao: number) : Promise<AlternativaProva | null> { 
          return await prismaClient.alternativaProva.findFirst({
              where:{
                  idQuestaoProva: id_questao,
                  id: id_alternativa
              }
          })
  }
  
  // static async findOverview(
  //   id_prova_andamento: number) { 
  //       return await prismaClient.usuarioProva.findMany({
  //         where:{
  //           idProvaAndamento: id_prova_andamento,
  //           finalizada: true
  //         },
  //         select:{
  //           usuario:{
  //             select:{
  //               _count:{
  //                 select:{
  //                   usuarioProva: true
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       })
  // }

  static async findUsersAnswers(
    id: number
  ) {
    return await prismaClient.usuarioProva.findMany({
      where:{
        idProvaAndamento: id,
        finalizada: {
          equals: true
        }
      },
      select:{ 
        usuario:{
          select :{
            nome: true,
            id: true,
            usuarioProva:{
              where:{
                idProvaAndamento: id
              },
              select:{
                id: true,
                pontuacao: true,
                data_entrega: true,
                data_inicio: true,
                provaAndamento: {
                  select: {
                    id: true,
                    prova: {
                      include: {
                        provasTodasQuestoes: {
                          include: {
                            questaoProva: {
                              include:{
                                questaoProvaTipo: true,
                                alternativaProva: true,
                                respostaQuestaoProva: true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                respostaAlternativaProva: {
                  include:{
                    alternativaProva:{
                      select:{
                        opcao: true,
                        correta: true,
                        idQuestaoProva: true
                      }
                    }
                  }
                },
                respostaQuestaoProva: true,
              }
            }
          }
          }
          }
    })
  }

  static async findTestProgress(
    id_prova_andamento: number
  ) : Promise<ProvaAndamento | null> {
    return prismaClient.provaAndamento.findFirst({
      where: {
        id: id_prova_andamento
      }
    })    
  }

  static async findDetails(
    id_prova_andamento: number
  ) {
    return prismaClient.provaAndamento.findFirst({
      where: {
        id: id_prova_andamento
      },
      include:{
        empresa:{
          select:{
            nome_fantasia: true,
            logo: true,
            id: true
          }
        },
        prova:{
          select:{
            titulo: true,
            descricao: true,
            link_repositorio: true,
            provaHabilidade: {
              select:{
                habilidade:{
                  select:{
                    id: true,
                    icone: true,
                    nome: true,
                  }
                }
              }
            },
            provaStack:{
              select:{
                stack:{
                  select:{
                    id: true,
                    nome: true,
                  }
                }
              }
            }
          }
        }
      }
    })    
  }

  static async updateUserTest(
    data_entrega: string,
    finalizada: boolean,
    id_prova_usuario: number,
  ) {
    return await prismaClient.usuarioProva.update({
      data: {
        data_entrega: new Date(data_entrega),
        finalizada,
      },
      where: {
        id: id_prova_usuario,
      },
    });
  }

  static async findTest(id: number): Promise<Prova | null> {
    return await prismaClient.prova.findFirst({
      where: {
        id,
      },
    });
  }

  static async findUserTest(
    id_prova_andamento: number,
    id_usuario: number
  ): Promise<UsuarioProva | null> {
    return await prismaClient.usuarioProva.findFirst({
      where: {
        idProvaAndamento: id_prova_andamento,
        idUsuario: id_usuario,
      },
    });
  }

  static async findUserTestByID(id_prova_usuario: number) {
    return await prismaClient.usuarioProva.findFirst({
      where: {
        id: id_prova_usuario,
      },
      include: {
        respostaAlternativaProva: {
          select:{
            alternativaProva: {
              select:{
                idQuestaoProva: true
              }
            },
            idAlternativaProva: true,
            idUsuarioProva: true,
            id: true
          }
        },
        respostaQuestaoProva: true,
        provaAndamento: {
          include: {
            prova: {
              include: {
                provasTodasQuestoes: {
                  include: {
                    questaoProva: {
                      include: {
                        alternativaProva: true,
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
  

  static async findCompany(id: number): Promise<any> {
    return await prismaClient.empresa.findFirst({
      where: {
        id: Number(id),
      },
    });
  }
  static async findAdmin(id: number): Promise<any> {
    return await prismaClient.administrador.findFirst({
      where: {
        id: Number(id),
      },
    });
  }
  static async createTestQuestion({
    enunciado,
    img_url,
    id_tipo,
  }: Question): Promise<QuestaoProva | boolean> {
    try {
      const newQuestion = await prismaClient.questaoProva.create({
        data: {
          enunciado,
          foto: img_url,
          idQuestaoProvaTipo: id_tipo,
        },
      });

      prismaClient.$disconnect;

      return newQuestion;
    } catch (error) {
      prismaClient.$disconnect;

      return false;
    }
  }
  static async relateSkills(
    id_prova: number,
    ids_habilidades: number
  ): Promise<ProvaHabilidade> {
    return await prismaClient.provaHabilidade.create({
      data: {
        idProva: id_prova,
        idHabilidade: ids_habilidades,
      },
    });
  }
  static async relateStack(
    id_prova: number,
    ids_stacks: number
  ): Promise<ProvaStack> {
    return await prismaClient.provaStack.create({
      data: {
        idProva: id_prova,
        idProvaStack: ids_stacks,
      },
    });
  }
  static async relateTestQuestion(
    id_prova: number,
    id_questao_prova: number
  ): Promise<ProvasTodasQuestoes> {
    return await prismaClient.provasTodasQuestoes.create({
      data: {
        idProva: id_prova,
        idQuestaoProva: id_questao_prova,
      },
    });
  }
  static async TestProgress({
    data_inicio,
    data_fim,
    duracao,
    id_empresa,
    id_prova,
  }: TestProgress): Promise<ProvaAndamento> {
    return await prismaClient.provaAndamento.create({
      data: {
        data_fim: new Date(data_fim),
        data_inicio: new Date(data_inicio),
        duracao,
        idEmpresa: id_empresa,
        idProva: id_prova,
      },
    });
  }
  static async testAdmin(
    id_admin: number,
    id_prova: number
  ): Promise<AdministradorProvas> {
    return await prismaClient.administradorProvas.create({
      data: {
        idAdministrador: id_admin,
        idProva: id_prova,
      },
    });
  }
  static async findTypeQuestion(
    id_tipo: number
  ): Promise<QuestaoProvaTipo | null> {
    return await prismaClient.questaoProvaTipo.findFirst({
      where: {
        id: id_tipo,
      }
    });
  }

  static async findAnswer(id_questao: number, id_prova_usuario: number): Promise<RespostaQuestaoProva | null> {
    return await prismaClient.respostaQuestaoProva.findFirst({
      where: {
        idQuestaoProva: id_questao,
        idUsuarioProva: id_prova_usuario
      },
    });
  }

  static async findTestType(tipo: string): Promise<ProvaTipo | null> {
    return await prismaClient.provaTipo.findFirst({
      where: {
        tipo: tipo,
      },
    });
  }
  static async userSearch(empresa: any): Promise<ProvaAndamento | any> {
    return await prismaClient.empresa.findMany({
      where: {
        provaAndamento: {
          every: {
            empresa,
          },
        },
      },
    });
  }
  static async allTest() {
    try {
      const testAll = await prismaClient.provaAndamento.findMany({
        select:{
          id: true,
          prova:{
            select:{
              titulo: true,
              descricao: true,
              ativo: true,
              provaHabilidade: {
                select:{
                  habilidade:{
                    select:{
                      id: true,
                      nome: true,
                      icone: true,
                    }
                  }
                }
              },
              provaStack:{
                select:{
                  stack:{
                    select:{
                      id: true,
                      nome: true,
                    }
                  }
                }
              },
              provaTipo: {
                select:{
                  tipo: true,
                }
              }
            }
          }
        }
      });

      prismaClient.$disconnect;

      return { testAll };
    } catch (error) {
      prismaClient.$disconnect;

      return error;
    }
  }


  static async correctAnswer(id: number, correta: boolean) {
    return await prismaClient.respostaQuestaoProva.update({
      where: {
        id: id,
      },
      data: {
        correta: correta,
      },
    });
  }

  static async findAdminTest(
    id_prova: number
  ): Promise<AdministradorProvas | null> {
    return await prismaClient.administradorProvas.findFirst({
      where: {
        idProva: id_prova,
      },
    });
  }
  static async findAdminTests(): Promise<AdministradorProvas[]> {
    return await prismaClient.administradorProvas.findMany();
  }
  static async filterAdminTests({
    tipo,
    ids_stacks,
    ids_habilidades,
    pagina,
  }: filter) {
    return await prismaClient.administradorProvas.findMany({
      where: {
        provas: {
          provaTipo: {
            tipo: {
              equals: tipo,
            },
          },
          provaHabilidade: {
            some: {
              idHabilidade: {
                in: ids_habilidades,
              },
            },
          },
          provaStack: {
            some: {
              idProvaStack: {
                in: ids_stacks,
              },
            },
          },
        },
      },
      select: {
        provas: {
          select: {
            id: true,
            titulo: true,
            descricao: true,
            provaTipo: {
              select: {
                tipo: true,
              },
            },
            provaHabilidade: {
              select: {
                habilidade: {
                  select: {
                    id: true,
                    nome: true,
                    icone: true,
                  },
                },
              },
            },
            provaStack: {
              select: {
                stack: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
      }
    });
  }

  static async findAdminTestByID(id_prova: number) {
    return await prismaClient.administradorProvas.findFirst({
      where: {
        id: id_prova,
      },
      include: {
        provas: {
          include: {
            provaAndamento: true,
            provaHabilidade: {
                select: {
                    habilidade: {
                        select: {
                            icone: true,
                            id: true,
                            nome: true
                        }
                    }
                }

            },
            provaStack: {
                select: {
                    stack: {
                        select: {
                            nome: true
                        }
                    }
                }
            },
            provasTodasQuestoes: {
              include: {
                questaoProva: {
                  include: {
                    alternativaProva: true,
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
  static async testForNumber(take: number) {
    return await prismaClient.provaAndamento.findMany({
      select: {
        prova: {
          select:{
            id: true,
            ativo: true,
            titulo: true,
            descricao: true,
            provaAndamento:{
              select:{
              empresa:{
                select:{
                  logo : true,
                  id: true,
                  nome_fantasia: true
                }
              }
            }},
            
                
            provaHabilidade:{
              select: {
                habilidade:{
                  select:{
                    nome:  true
                  }
                }
              }
            }
          }
        },
        id: true,
        
                 
      },
      take: take ? take : 3,
    });
  }

  static async listUserAnswers(
    id_prova_usuario: number) {
      return await prismaClient.usuarioProva.findFirst({
        where: {
          id: id_prova_usuario
        },
        include:{
          respostaAlternativaProva: true,
          respostaQuestaoProva: true
        }
      })
  }
}   
