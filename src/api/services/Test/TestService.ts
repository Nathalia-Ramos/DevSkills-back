import ReturnMessages from "../../../config/ReturnMessages";
import { ErrorReturn } from "../../interfaces/ReturnPattern/Returns";
import filter from "../../interfaces/Test/AdminFilter";
import correctAnswer from "../../interfaces/Test/Answer";
import TestProgress from "../../interfaces/Test/TestProgress";
import { TestData } from "../../interfaces/Test/Tests";
import TokenData from "../../interfaces/Token/Token";
import AnswerTestModel from "../../models/AnswerTestModel";
import TestModel from "../../models/Test/TestModel";
import isEmpty from "../../utils/isEmpty";
import QuestionService from "./QuestionService";
// import jwt_decode from "jwt-decode";

export default class TestService {
  static async create(test: TestData) {
    if ((test.titulo, test.descricao, test.tipo_prova)) {
      if (test.titulo.length <= 50) {
        const testType = await TestModel.findTestType(test.tipo_prova);

        if (test.tipo_prova == "TEORICA" || test.tipo_prova == "PRATICA") {
          if (testType) {
            const createTest = {
              titulo: test.titulo,
              descricao: test.descricao,
              link_repositorio: test.link_repositorio,
              id_tipo: testType.id,
              id_criador: test.id_criador,
            };

            const prova = await TestModel.createTest(createTest);
            const provaID = prova.id;

            const data_fim = new Date(test.data_fim);

            data_fim.setDate(data_fim.getDate() + 1);

            //procurando admin
            try {
              const admin = await TestModel.findAdmin(test.id_criador);
              if (test.id_criador == admin) {
                await TestModel.testAdmin(test.id_criador, provaID);
              }
            } catch (error) {}
            //verificando se é empresa ou admin para poder popular tabelas relacioanadas
            switch (test.tipo_criador) {
              case "EMPRESA":
                const testProgress = {
                  data_fim: test.data_fim,
                  data_inicio: test.data_inicio,
                  duracao: test.duracao,
                  id_empresa: test.id_criador,
                  id_prova: provaID,
                };

                TestModel.TestProgress(testProgress);
                break;
              case "ADMIN":
                TestModel.testAdmin(test.id_criador, provaID);
              default:
                break;
            }
            try {
              test.ids_habilidades.forEach(async (value) => {
                await TestModel.relateSkills(prova.id, value);
              });
            } catch (error) {
              console.log(error);
            }

            //relacionamenyo com as stacks
            try {
              test.ids_stacks.forEach(async (value) => {
                await TestModel.relateStack(prova.id, value);
              });
            } catch (error) {}

            const questions = test.questoes;

            console.log(provaID);
            console.log(prova);

            try {
              if (questions.length >= 1 && test.tipo_prova === "TEORICA") {
                questions.forEach((Questions) => {
                  return QuestionService.createQuestion(Questions, provaID);
                });
              } else if (
                questions.length <= 1 &&
                test.tipo_prova === "PRATICA"
              ) {
                QuestionService.createQuestion(questions[0], provaID);
              } else {
                return {
                  error: "Prova prática só pode conter uma questão",
                  statusCode: 400,
                };
              }
              console.log(questions);
            } catch (error: any) {
              console.error(error);
            }
            return ReturnMessages.Success;
          } else {
            return ReturnMessages.Conflict;
          }
        }
      }
    }
  }

  static async findTest(id_prova: number, tokenValidate: TokenData | ErrorReturn) {
    
    if('id' in tokenValidate) {
      
      const test = await AnswerTestModel.findTest(id_prova);
      
      if (test) {

        const userTestExist = await TestModel.findUserTest(id_prova, tokenValidate.id)

        if(userTestExist) {
          return {
            error: "Prova já respondida.",
            statusCode: 400
          }
        } else {
          return {
            data: test,
            statusCode: 200,
          };
        }

      } else {
        return {
          error: "Prova com o ID especificado não encontrada.",
          statusCode: 404,
        };
      }
    } else {
      return {
        error: tokenValidate.error,
        statusCode: tokenValidate.statusCode
      }
    }
    
  }
  
  static async listOverview(id_prova: number) {
    const test = await TestModel.findUsersAnswers(id_prova);

    if (test) {
      return {
        data: test,
        statusCode: 200,
      };
    } else {
      return {
        error: "Prova com o ID especificado não encontrada.",
        statusCode: 404,
      };
    }
  }

  static async findUserAnswers(id_prova_andamento: number, take: number) {

    if(typeof id_prova_andamento === 'number') {

      const testExist = await TestModel.findTest(id_prova_andamento)

      if(testExist) {

        const usersAnswers = await TestModel.findUsersAnswers(id_prova_andamento)

        return {
          data: {
            totalResults: usersAnswers.length - 1,
            result: usersAnswers[take]},
          statusCode: 200
        }

      } else {
          return {
            error: "Prova com o ID especificado não encontrada.",
            statusCode: 404,
          };
      }

    } else {
        return {
          error: "IDs devem ser números.",
          statusCode: 400,
        };
    }

  }

  static async findAdminTestByID(id_prova: number) {
    const test = await TestModel.findAdminTestByID(id_prova);

    if (test) {
      return {
        data: test,
        statusCode: 200,
      };
    } else {
      return {
        error: "Prova com o ID especificado não encontrada.",
        statusCode: 404,
      };
    }
  }

  static async relateTemplate(testInfo: TestProgress) {
    if (testInfo) {
      if (
        (testInfo.id_empresa,
        testInfo.id_prova,
        testInfo.data_fim,
        testInfo.data_inicio)
      ) {
        // if (validateRegex(testInfo.data_inicio, '([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))')) {

        const companyExist = await TestModel.findCompany(testInfo.id_empresa);

        if (companyExist) {
          const testExist = await TestModel.findTest(testInfo.id_prova);

          if (testExist) {
            const isTemplate = await TestModel.findAdminTest(testInfo.id_prova);

            if (isTemplate) {
              try {
                await TestModel.TestProgress(testInfo);

                return {
                  message: "Prova criada com sucesso",
                  statusCode: 200,
                };
              } catch (error) {
                return {
                  error: error,
                  statusCode: 400,
                };
              }
            } else {
              return {
                error: "Prova não foi criada por um ADMIN",
                statusCode: 400,
              };
            }
          } else {
            return {
              error: "Prova com o ID especificado não encontrada.",
              statusCode: 404,
            };
          }
        } else {
          return {
            error: ReturnMessages.UserNotFound,
            statusCode: 400,
          };
        }

        // } else {
        //     return {
        //         error: "Data de inicio deve seguir o padrão ANO/MÊS/DIA. (AAAA/MM/DD)",
        //         statusCode: 400
        //     }
        // }
      } else {
        return {
          error: ReturnMessages.MissingFields,
          statusCode: 402,
        };
      }
    } else {
      return {
        error: "Body vazio",
        statusCode: 400,
      };
    }
  }
  static async search(user: number) {
    const testExist = await TestModel.userSearch(user);

    // console.log(testExist)

    if (testExist) {
      const user = await TestModel.userSearch(testExist.idProvaTipo);
    } else {
      return "errorrrrrrrrrrrrrr";
    }
  }

  static async findAdminTests(
   userFilters: filter
  ) {

    console.log(userFilters);

    const adminTests = await TestModel.filterAdminTests(userFilters);

    if (isEmpty(adminTests)) {
      const allTests = (await TestModel.findAdminTests())?.length;
      const allPages = Math.ceil(allTests / 20);

      return {
        data: {
          page: userFilters.pagina + 1,
          totalPages: allPages,
          // totalResults: Math.floor(adminTests.length / (userFilters.pagina + 1)),
          results: adminTests,
        },
        statusCode: 200,
      };
    } else {
      return {
        error:
          "Não foram encontradas provas com as características especificadas.",
        statusCode: 404,
      };
    }
  }

  static async listUserTest(id_prova_usuario: number) {
    const test = await TestModel.findUserTestByID(id_prova_usuario);

    if (test) {
      return {
        data: test,
        statusCode: 200,
      };
    } else {
      return {
        error: "Prova com o ID especificado não encontrada.",
        statusCode: 404,
      };
    }
  }

  static async findTestNumber(take: number) {
    const result = await TestModel.testForNumber(take);

    return result;
  }

  static async correctionAnswer(correctAnswer: correctAnswer) {
    
    if (Object.keys(correctAnswer).length > 0) {

      if (correctAnswer.id_questao && correctAnswer.id_prova_usuario && correctAnswer.correta != undefined) {
        
        if (typeof correctAnswer.id_questao === "number" && typeof correctAnswer.id_prova_usuario === "number") {
          
          if (typeof correctAnswer.correta === "boolean") {
            const answerExist = await TestModel.findAnswer(
              correctAnswer.id_questao
            );

            if (answerExist) {
              try {
                const updatedAnswer = await TestModel.correctAnswer(
                  answerExist.id,
                  correctAnswer.correta
                );
                console.log(updatedAnswer);
              } catch (error) {
                return {
                  error: error,
                  statusCode: 500,
                };
              }

              return {
                message: "Resposta corrigida com sucesso!",
                statusCode: 200,
              };
            } else {
              return {
                error:
                  "Não foi encontrada uma resposta para a questão com o ID especificado. ID: " +
                  correctAnswer.id_questao,
                statusCode: 404,
              };
            }
          } else {
            return {
              error: "Correta deve ser do tipo booleana.",
              statusCode: 400,
            };
          }
        } else {
          return {
            error: "IDs devem ser números.",
            statusCode: 400,
          };
        }
      } else {
        return {
          error: ReturnMessages.MissingFields,
          statusCode: 400,
        };
      }
    } else {
      return {
        error: ReturnMessages.emptyBody,
        statusCode: 400,
      };
    }
  }

}
