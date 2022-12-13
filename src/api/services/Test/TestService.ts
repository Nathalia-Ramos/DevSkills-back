import ReturnMessages from "../../../config/ReturnMessages";
import { ErrorReturn } from "../../interfaces/ReturnPattern/Returns";
import filter from "../../interfaces/Test/AdminFilter";
import { testCorrection } from "../../interfaces/Test/Answer";
import { candidateData } from "../../interfaces/Test/TestCandidate";
import {
  skillsTest,
  stacksTest,
  testDetails,
} from "../../interfaces/Test/TestDetails";
import TestProgress from "../../interfaces/Test/TestProgress";
import { TestData } from "../../interfaces/Test/Tests";
import {
  answerData,
  questionAnswer,
  questionTest,
  testAnswers,
} from "../../interfaces/Test/TestUserAnswers";
import TokenData from "../../interfaces/Token/Token";
import AnswerTestModel from "../../models/AnswerTestModel";
import TestModel from "../../models/Test/TestModel";
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
            const provaID = prova.id

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

  static async findCandidates(id_prova_andamento: number) {

    if(typeof id_prova_andamento === 'number') {

      const candidates = await TestModel.findCandidates(id_prova_andamento)

      if(candidates) {

        let totalCandidates : candidateData[] = []

        for(let i = 0; i < candidates.length; i++) {

          const userCandidate = candidates[i]

          const currentDate = new Date()

          let userTime : string = ''

          let userPercentage : string = ''

          const userAddress = userCandidate.usuario.EnderecoUsuario[0]

          if(userCandidate.data_entrega) {

            const startDate = userCandidate.data_entrega.toISOString().split(/[\T\.]/)[0] + ' ' + userCandidate.data_entrega.toISOString().split(/[\T\.]/)[1]
            const endDate = userCandidate.data_inicio.toISOString().split(/[\T\.]/)[0] + ' ' + userCandidate.data_inicio.toISOString().split(/[\T\.]/)[1]

            const resultDiff : Object = await TestModel.getTimeDiff(startDate, endDate)
            
            const timeDiff : string = Object.values(resultDiff)[0].duracao.toISOString()
            
            // console.log(userTime)
            userTime = timeDiff.split(/[/T/.]/)[1]
            // console.log(userTime)
            
          }

          if(userCandidate.pontuacao) {
            
            const userPoints = userCandidate.pontuacao
            const totalPoints = 100

            const totalUserPoints = Math.round((userPoints * 100) / totalPoints)

            userPercentage = totalUserPoints + '%'

          }

          // console.log("finalizada: "+ userCandidate.finalizada)
          const candidateData : candidateData = { 
            id_prova_usuario: userCandidate.id,
            id_prova_andamento: userCandidate.idProvaAndamento,
            finalizada: userCandidate.finalizada,
            // duracao: '01:10:05',
            duracao: userTime ? userTime : null,
            pontuacao: userCandidate.pontuacao ? userCandidate.pontuacao : null,
            porcentagemAcertos: userPercentage ? userPercentage : null,
            // porcentagemAcertos: '20%',
            corrigida: userCandidate.pontuacao ? true : false,
            candidato: {
              id: userCandidate.idUsuario,
              nome: userCandidate.usuario.nome,
              email: userCandidate.usuario.email,
              foto_perfil: userCandidate.usuario.foto_perfil,
              idade: currentDate.getFullYear() - userCandidate.usuario.data_nascimento.getFullYear(),
              localidade:{
                estado: userAddress ? userAddress.cidade.nome : null,
                cidade: userAddress ? userAddress.cidade.estado.nome : null,
              }
            }
          }
          
            // console.log(candidateData)

            totalCandidates.push(candidateData)

        }

          return {
            data: totalCandidates,
            statusCode: 200
          }
          
      } else {
        return {
          error: "Prova com o ID especificado não encontrada.",
          statusCode: 404
        }
      }

    } else {
      return {
        error: "IDs devem ser números.",
        statusCode: 400,
      };
    }

  }

  static async findTest(id_prova: number, tokenValidate: TokenData | ErrorReturn) {
    
    if('id' in tokenValidate) {
      
      const test = await AnswerTestModel.findTest(id_prova);
      
      if (test) {

        const userTestExist = await TestModel.findUserTest(id_prova, tokenValidate.id)

        if(userTestExist){
          if(userTestExist.finalizada){
            return {
              error: "Prova já respondida.",
              statusCode: 400
            }
          }else{
            return {
              data: test,
              statusCode: 200
            }
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

  static async listTestDetails(id_prova_andamento: number) {
    
      const testExist = await TestModel.findDetails(id_prova_andamento);
      
      if (testExist) {

        const totalCandidates = await TestModel.findCandidates(id_prova_andamento)

        const testData = {
          titulo: testExist.prova.titulo,
          descricao: testExist.prova.descricao,
          duracao: testExist.duracao || null,
          totalCandidatos: totalCandidates.length,
          dataFim: testExist.data_fim.toISOString().split('T')[0],
          tipo: testExist.prova.provaTipo.tipo,
          empresa: {
            id: testExist.empresa.id,
            logo: testExist.empresa.logo,
            nome: testExist.empresa.nome_fantasia,
          },
          tecnologias: testExist.prova.provaHabilidade,
          stacks: testExist.prova.provaStack,
          
        }

        return {
            data: testData,
            statusCode: 200,
        };

      } else {
        return {
          error: "Prova com o ID especificado não encontrada.",
          statusCode: 404,
        };
      }

    
  }

  static async listTestInfo(id_prova_andamento: number) {
    
      const testExist = await TestModel.findDetails(id_prova_andamento);
      
      if (testExist) {

        const totalCandidates = await TestModel.findCandidates(id_prova_andamento)

        let skillsTest : skillsTest[] = []
        let stacksTest : stacksTest[] = []

        testExist.prova.provaHabilidade.forEach((skill) => {

          const skillData = {
            id: skill.habilidade.id,
            nome: skill.habilidade.nome,
            icone: skill.habilidade.icone
          }

          skillsTest.push(skillData)

        })

        testExist.prova.provaStack.forEach((stack) => {

          const stackData = {
            id: stack.stack.id,
            nome: stack.stack.nome
          }

          stacksTest.push(stackData)

        })

        const testData : testDetails = {
          id: id_prova_andamento, 
          titulo: testExist.prova.titulo,
          descricao: testExist.prova.descricao,
          totalCandidatos: totalCandidates.length,
          provaStacks: stacksTest,
          provaHabilidades: skillsTest
        }

        return {
            data: testData,
            statusCode: 200,
        };

      } else {
        return {
          error: "Prova com o ID especificado não encontrada.",
          statusCode: 404,
        };
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

      const testExist = await TestModel.findTestProgress(id_prova_andamento)

      if(testExist) {

        const questionData : questionTest[] = []
        const userData : testAnswers[] = []
        
        const usersAnswers = await TestModel.findUsersAnswers(id_prova_andamento)

        if(usersAnswers) {
          
          // console.log(usersAnswers)
          const userAnswer = usersAnswers[take - 1]

          if(!userAnswer) {
            return {
              error: "Candidato não encontrado.",
              statusCode: 404
            }
          }

          // console.log(userAnswer)

          const userInfo = userAnswer.usuario.usuarioProva

            const allQuestions = userInfo[0].provaAndamento.prova.provasTodasQuestoes

            const optionAnswers = userInfo[0]?.respostaAlternativaProva
            
            const textAnswers = userInfo[0]?.respostaQuestaoProva
            
            const textQuestionIDS = textAnswers.map((value) => value.idQuestaoProva)
  
            for(let i = 0; i < allQuestions.length; i++) {
            
              const userQuestion = allQuestions[i]

              if(userQuestion.questaoProva.questaoProvaTipo.tipo === 'DISSERTATIVA') {
      
                if(textQuestionIDS.includes(userQuestion.idQuestaoProva)) {
                  
                  const userAnswer = textAnswers.find((value) => value.idQuestaoProva == userQuestion.idQuestaoProva)

                  if(userAnswer) {
                    const question = {
                      id: (userQuestion.id + 1),
                      enunciado: userQuestion.questaoProva.enunciado,
                      tipo: userQuestion.questaoProva.questaoProvaTipo.tipo,
                      foto: userQuestion.questaoProva.foto,
                      resposta: {
                        id: userAnswer.id,
                        texto: userAnswer.resposta
                      }
                    }
                    
                    questionData.push(question)
                    // console.log('adicionou'+ question.id)
                  }

                }
    
              } else {
    
                const options : questionAnswer[] = []
                const optionQuestions = userQuestion.questaoProva.alternativaProva
                let correctAnswer = false
                
                optionQuestions.forEach((value: any) =>{
                  let selected = false
                  
                    if(value.idQuestaoProva == userQuestion.idQuestaoProva) {
                      
                      if(value.correta) {
                        correctAnswer = true
                      } else {
                        correctAnswer = false
                      }

                      if(optionAnswers.find((choice) => { if(choice.idAlternativaProva == value.id) return choice })) selected = true
  
                      options.push({
                        id: value.id,
                        texto: value.opcao,
                        correta: correctAnswer,
                        selecionada: selected
                      })
                    }                  

                  
                })
  
                  const question = {
                    id: (userQuestion.id + 1),
                    enunciado: userQuestion.questaoProva.enunciado,
                    tipo: userQuestion.questaoProva.questaoProvaTipo.tipo,
                    foto: userQuestion.questaoProva.foto,
                    acertou: correctAnswer,
                    alternativas: options
                  }
  
                  questionData.push(question)
                  // console.log('adicionou'+ question.id)
                
              }

            }

              // allQuestions.forEach((userQuestion: any) => {
              
              //   if(userQuestion.questaoProva.questaoProvaTipo.tipo === 'DISSERTATIVA') {
      
              //     if(textQuestionIDS.includes(userQuestion.idQuestaoProva)) {
                    
              //       const userAnswer = textAnswers.find((value) => value.idQuestaoProva == userQuestion.idQuestaoProva)
  
              //       if(userAnswer) {
              //         const question = {
              //           id: (userQuestion.id + 1),
              //           enunciado: userQuestion.questaoProva.enunciado,
              //           tipo: userQuestion.questaoProva.questaoProvaTipo.tipo,
              //           foto: userQuestion.questaoProva.foto,
              //           resposta: {
              //             id: userAnswer.id,
              //             texto: userAnswer.resposta
              //           }
              //         }
                      
              //         questionData.push(question)
              //         // console.log('adicionou'+ question.id)
              //       }
  
              //     }
      
              //   } else {
      
              //     const options : questionAnswer[] = []
      
              //     optionAnswers.forEach((value: any) =>{
                      
              //         options.push({
              //           id: value.id,
              //           texto: value.alternativaProva.opcao,
              //           correta: value.alternativaProva.correta,
              //           selecionada: value.alternativaProva.idQuestaoProva === userQuestion.idQuestaoProva ? true : false
              //         })
                    
              //     })
    
              //       const question = {
              //         id: (userQuestion.id + 1),
              //         enunciado: userQuestion.questaoProva.enunciado,
              //         tipo: userQuestion.questaoProva.questaoProvaTipo.tipo,
              //         foto: userQuestion.questaoProva.foto,
              //         acertou: userQuestion.questaoProva.alternativaProva.correta,
              //         alternativas: options
              //       }
    
              //       questionData.push(question)
              //       // console.log('adicionou'+ question.id)
                  
              //   }
                
              // })
              // console.log(questionData)
            
              const userTest = userAnswer.usuario.usuarioProva[0]
              const user = userAnswer.usuario
    
              let userPercentage : number = 0
              
              // const totalQuestions = allQuestions.length
              if(userTest.pontuacao) {

                const totalPoints = 100

                const userPoints = userTest.pontuacao

                userPercentage = Math.round((userPoints * 100) / totalPoints)

              }

              let userTime : string = ''

              if(userTest.data_entrega) {

                const startDate = userTest.data_entrega.toISOString().split(/[\T\.]/)[0] + ' ' + userTest.data_entrega.toISOString().split(/[\T\.]/)[1]
                const endDate = userTest.data_inicio.toISOString().split(/[\T\.]/)[0] + ' ' + userTest.data_inicio.toISOString().split(/[\T\.]/)[1]

                console.log('entrega ' + startDate)
                console.log('inicio ' + endDate)

                const resultDiff : Object = await TestModel.getTimeDiff(startDate, endDate)
                
                const timeDiff : string = Object.values(resultDiff)[0].duracao.toISOString()

                userTime = timeDiff.split(/[/T/.]/)[1]

              }

              const userInfos = {
                id: user.id,
                idProvaUsuario: userTest.id,
                nome: user.nome,
                tempo: userTime,

                corrigida: userTest.pontuacao ? true : false,
                pontuacao: userTest.pontuacao,
                porcentagemAcertos: userPercentage,
                questoes: questionData
              }
    
            userData.push(userInfos)
            
            const answerData : answerData = {
              idProvaAndamento: id_prova_andamento,
              candidato: userData
            }
    
            return {
              data: {
                totalResults: usersAnswers.length,
                result: answerData
              },
                statusCode: 200
            }

        } else {
          return {
            error: "Não foram encontradas respostas para a prova especificada.",
            statusCode: 404
          }
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
   filters: filter
  ) {

    const totalResults = await TestModel.filterAdminTests(filters);

    if (totalResults) {

      const startIndex = 20 * filters.pagina
      const endIndex = 20 * (filters.pagina + 1)

      const totalPages = Math.ceil(totalResults?.length / 20)

      if(totalPages < (filters.pagina + 1)) {
        return {
          error: "Essa página não existe.",
          statusCode: 404
        }
      }

      const result = totalResults.slice(startIndex, endIndex)

      return {
          data: {
              totalPages: totalPages,
              totalResult: totalResults?.length,
              page: filters.pagina + 1,
              results: result
          },
          statusCode: 200
      }
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

      if(test.provaAndamento.duracao) {

        const candidateHours = {
          hours: '00',
          minutes: '00',
          seconds: '00'
        }
  
        const testDuration = test.provaAndamento.duracao?.split(':')
        // const userDate = test.data_inicio.toISOString().split(/[\-\:\.\T\Z]/)
        const userDate = test.data_inicio
  
        const diffMilliseconds = Math.abs(new Date().getTime() - userDate.getTime())
  
        const totalSecondsDiff = Math.floor(diffMilliseconds / 1000)
        const minutesDiff = Math.floor(totalSecondsDiff / 60)
        
        const secondsDiff = Math.floor(totalSecondsDiff % 60)
        candidateHours.seconds = secondsDiff.toString().padStart(2, '0')
        
        if (minutesDiff > 60) {
          const hoursDiff = Math.floor(minutesDiff / 60)
  
          candidateHours.hours = hoursDiff.toString().padStart(2, '0')
          
          candidateHours.minutes = (Math.floor(minutesDiff % 60)).toString().padStart(2, '0')
        } else {
          candidateHours.minutes = minutesDiff.toString().padStart(2, '0')
        }

        // if(candidateHours.hours > testDuration[0]) {
        //   return {
        //     error: "Não é mais possível realizar essa prova pois o tempo limite de resposta foi ultrapassado.",
        //     statusCode: 400
        //   }
        // }

        const hoursLeft =  parseInt(testDuration[0]) - parseInt(candidateHours.hours)
        const minutesLeft = parseInt(testDuration[1]) - parseInt(candidateHours.minutes)
        const secondsLeft = parseInt(testDuration[2]) - parseInt(candidateHours.hours)

        if(hoursLeft < 0 && minutesLeft < 0 && secondsLeft < 0) {
          return {
                error: "Não é mais possível realizar essa prova pois o tempo limite de resposta foi ultrapassado.",
                statusCode: 400
              }
        } else {
          test.provaAndamento.duracao = hoursLeft + ':' + minutesLeft + ':' + secondsLeft
        }

      }

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

  static async correctionAnswer(correctTest: testCorrection, id_prova_andamento: number) {
    
    if (Object.keys(correctTest).length > 0) {

      const testExist = await TestModel.findTestProgress(id_prova_andamento)

      if(testExist) {

        const userTestExist = await TestModel.findUserTestByID(correctTest.id_prova_usuario)

        if(userTestExist) {
          if(!userTestExist.finalizada) {
            return {
              error: "Não é possível corrigir uma prova que ainda não foi finalizada.",
              statusCode: 400
            }
          }
        } else {
          return {
            error: "Prova usuário com o ID especificado não encontrada. ID: " + correctTest.id_prova_usuario,
            statusCode: 404
          }
        }

        const correctAnswer = correctTest.questoesCorrigidas
        
        const allTextQuestions = await TestModel.findTextQuestions(testExist.idProva)

        if(allTextQuestions.length != correctAnswer.length) {
          return {
            error: "Faltam questões para serem corrigidas.",
            statusCode: 400
          }
        }

        if(userTestExist.pontuacao) {
          return {
            error: "Prova já corrigida.",
            statusCode: 400
          }
        }

        for(let i = 0; i < correctAnswer.length; i++) {
          
          const correctQuestion = correctAnswer[i]

          if (correctQuestion.id_questao && correctQuestion.correta != undefined) {
            
            if (typeof correctQuestion.id_questao === "number") {
              
              if (typeof correctQuestion.correta === "boolean") {
                const answerExist = await TestModel.findAnswer(correctQuestion.id_questao, userTestExist.id);
    
                if (!answerExist) {
                  return {
                    error: "Não foi encontrada uma resposta para uma questão DISSERTATIVA com o ID especificado. ID: " + correctQuestion.id_questao,
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
        }

        for (let i = 0; i < correctAnswer.length; i++) {

          const correctQuestion = correctAnswer[i]

          const answerExist = await TestModel.findAnswer(correctQuestion.id_questao, userTestExist.id);

          if (answerExist) {
            try {
              const updatedAnswer = await TestModel.correctAnswer(
                answerExist.id,
                correctQuestion.correta);

              console.log(updatedAnswer);
              
            } catch (error) {
              return {
                error: error,
                statusCode: 500,
              };
            }

          }       
        }
        
        const allQuestions = await TestModel.findAllQuestions(testExist.idProva)

        const totalPoints = 100
        const questionPoints = Math.floor(totalPoints / allQuestions.length)
        let totalChecks : number = 0

        console.log("cada questao vale: " + questionPoints)

        // definindo pontuacao como 0
        await TestModel.updateTestPoint(userTestExist.id, 0)
        
        allQuestions.forEach(async question => {
          
          const questionType = question.questaoProva.questaoProvaTipo.tipo

          if(questionType == 'DISSERTATIVA') {
            
            const userAnswer = await TestModel.findTextAnswer(question.idQuestaoProva, userTestExist.id)

            if(userAnswer) {
              if(userAnswer?.correta) {
                
                const updatePoints = await TestModel.updateUserPoints(
                userTestExist.id,
                questionPoints)

                totalChecks++
                
                console.log(totalChecks)
                console.log('corrigiu a ' + question.idQuestaoProva);
                
              }
            }

          } else if (questionType == 'UNICA_ESCOLHA') {

            const userAnswer = await TestModel.findChoiceAnswer(
              question.idQuestaoProva,
              userTestExist.id)

            if(userAnswer) {
              if(userAnswer[0].alternativaProva.correta) {
                
                const updatePoints = await TestModel.updateUserPoints(
                  userTestExist.id,
                  questionPoints)
                  
                  totalChecks++
                  console.log('corrigiu a ' + question.idQuestaoProva);
                  
                }
              }
              
            } else {
              
              const userAnswer = await TestModel.findChoiceAnswer(
                question.idQuestaoProva,
                userTestExist.id)
                
                userAnswer.forEach(async answer => {
                  
                  if(answer.alternativaProva.correta) {
                    
                    const updatePoints = await TestModel.updateUserPoints(
                      userTestExist.id,
                      questionPoints)
                      
                    totalChecks++
                    console.log('corrigiu a ' + question.idQuestaoProva);
              
                }
              });

          }

          if(totalChecks == allQuestions.length) {
            await TestModel.updateTestPoint(userTestExist.id, 100)
          }

        })

        try {
          const userPoints = totalChecks * questionPoints
          await TestModel.updateUserPoints(userTestExist.idUsuario, userPoints)
        } catch (error) {
            return {
              error: error,
              statusCode: 500
            }                                                   
        }

        // console.log(await TestModel.findUserTestByID(userTestExist.id))

        return {
          message: "Respostas corrigidas com sucesso!",
          statusCode: 200,
        };
        
      } else {
        return {
          error: "Prova com o ID especificado não encontrada.",
          statusCode: 404,
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
