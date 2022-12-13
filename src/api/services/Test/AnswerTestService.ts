import { userAnswer, userTest, testAnswer } from "../../interfaces/Test/AnswerTest";
import AnswerTestModel from "../../models/Test/TestModel";
import TestModel from "../../models/Test/TestModel";
import ReturnMessage from "../../../config/ReturnMessages"
import validateRegex from "../../utils/RegexValidate";
import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";
import QuestionModel from "../../models/Questions/QuestionsModel";
import isString from "../../utils/isString";

export default class AnswerTestService {

    static async createAnswerTest(testAnswer: testAnswer) {
        if (Object.keys(testAnswer).length > 0) {

            if (testAnswer.data_entrega, testAnswer.id_prova_usuario, testAnswer.finalizada != undefined, testAnswer.respostas) {

                if(typeof testAnswer.id_prova_usuario === 'number') {

                    if(typeof testAnswer.finalizada === 'boolean') {

                            if(!testAnswer.finalizada) {
                                return {
                                    error: "Não é possível cadastrar a resposta pois o campo finalizada consta como FALSO.",
                                    statusCode: 400
                                }
                            }

                            const userTestExist = await TestModel.findUserTestByID(testAnswer.id_prova_usuario)

                            if (userTestExist) {

                                if(userTestExist.finalizada) {
                                    return {
                                        error: "Prova já respondida.",
                                        statusCode: 400
                                    }
                                }

                                if (testAnswer.respostas) {

                                    if (Array.isArray(testAnswer.respostas)) {

                                        const userAnswers  = testAnswer.respostas

                                        if (userAnswers.length > 0) {

                                            const allQuestions = await TestModel.findAllQuestions(userTestExist.provaAndamento.prova.id)

                                            if(allQuestions.length != userAnswers.length) {
                                                return {
                                                    error: "A prova consta como finalizada, porém, o usuário não respondeu todas as " + allQuestions + " questões.",
                                                    statusCode: 400
                                                }
                                            }

                                            for (let i = 0; i < userAnswers.length; i++) {

                                                if (userAnswers[i].id_questao) {

                                                    const questionExist = await TestModel.findQuestion(userAnswers[i].id_questao)
                                                    
                                                    if(questionExist) {
                                                        
                                                        const questionType = questionExist?.questaoProvaTipo.tipo

                                                        if(questionType == "DISSERTATIVA") {

                                                            if(userAnswers[i].resposta) {

                                                                if (isString(userAnswers[i].resposta)) {

                                                                    if (!userAnswers[i].resposta) {
                                                                        return {
                                                                            error: "Campo resposta não pode estar vazio.",
                                                                            statusCode: 400
                                                                        } 
                                                                    }

                                                                } else {
                                                                    return {
                                                                        error: "Campo resposta deve ser do tipo string",
                                                                        statusCode: 400
                                                                    }
                                                                }

                                                            } else {
                                                                return {
                                                                    error: "Resposta da questão dissertativa " + userAnswers[i].id_questao + " não informada.",
                                                                    statusCode: 400
                                                                }
                                                            }

                                                        } else if (questionType == "UNICA_ESCOLHA") {

                                                            const choiceAnswers = userAnswers[i]

                                                            if(choiceAnswers.id_alternativa) {
                                                                if(typeof choiceAnswers.id_alternativa === 'number') {

                                                                    const optionExist = await TestModel.findOption(choiceAnswers.id_alternativa, choiceAnswers.id_questao)

                                                                    if (!optionExist) {
                                                                        return {
                                                                            error: "Não foram encontradas alternativas com esse ID: " + choiceAnswers.id_alternativa,
                                                                            statusCode: 404
                                                                        }
                                                                    }

                                                                } else {
                                                                    return {
                                                                        error: "Alternativa de uma questão UNICA ESCOLHA deve ser um número.",
                                                                        statusCode: 400
                                                                    }
                                                                }
                                                                } else {
                                                                    return {
                                                                        error: "É necessário informar um ID Alternativa para a questão: " + choiceAnswers.id_questao,
                                                                        statusCode: 400
                                                                    }
                                                                }

                                                            } else if (questionType == "MULTIPLA_ESCOLHA" ) {

                                                                const choiceAnswers = userAnswers[i]

                                                                if(choiceAnswers.id_alternativa) {

                                                                    if (Array.isArray(choiceAnswers.id_alternativa)) {

                                                                        const optionsUser = choiceAnswers.id_alternativa

                                                                        for (let i = 0; i < optionsUser.length; i++) {

                                                                            const optionExist = await TestModel.findOption(optionsUser[i], choiceAnswers.id_questao)

                                                                            if(!optionExist) 
                                                                                return {
                                                                                    error: "Não foram encontradas alternativas com esse ID: " + choiceAnswers.id_alternativa,
                                                                                    statusCode: 404
                                                                                }

                                                                        }

                                                                    } else {
                                                                        return {
                                                                            error: "Alternativa de uma questão MULTIPLA ESCOLHA deve ser um array de números.",
                                                                            statusCode: 400
                                                                        }
                                                                    }

                                                                } else {
                                                                    return {
                                                                        error: "É necessário informar um ID Alternativa para a questão: " + choiceAnswers.id_questao,
                                                                        statusCode: 400
                                                                    }
                                                                }

                                                            } else {
                                                                return {
                                                                    error: "Ocorreu um erro ao procurar o tipo de questão da questão: " + userAnswers[i].id_questao,
                                                                    statusCode: 500
                                                                }
                                                            }

                                                    } else {
                                                        return {
                                                            error: "Não foram encontradas questões com esse ID: " + userAnswers[i].id_questao,
                                                            statusCode: 404
                                                        }
                                                    }

                                                } else {
                                                    return {
                                                        error: "ID Questão não informado.",
                                                        statusCode: 400
                                                    }
                                                }
                                            }

                                            try {

                                                const userTest = await TestModel.updateUserTest(
                                                    testAnswer.data_entrega,
                                                    testAnswer.finalizada,
                                                    testAnswer.id_prova_usuario
                                                )

                                                console.log(userTest)

                                                for (let i = 0; i < userAnswers.length; i++) {

                                                    const answer = userAnswers[i]

                                                    const question = await TestModel.findQuestion(answer.id_questao)

                                                    const questionType = question?.questaoProvaTipo.tipo

                                                    if (questionType == 'DISSERTATIVA') {

                                                        if(answer.resposta) {
                                                            const textAnswer = await TestModel.relateTextAnswer(
                                                                userTest.id,
                                                                answer.id_questao,
                                                                answer.resposta
                                                            )
                                                            console.log('QUESTAO DISSERTATIVA CADASTRADA: ' + textAnswer)
                                                        }

                                                    } else if(questionType == 'MULTIPLA_ESCOLHA') {

                                                        if (Array.isArray(answer.id_alternativa)) {

                                                            const optionsUser = answer.id_alternativa

                                                            for (let i = 0; i < optionsUser.length; i++) {

                                                                const optionID = optionsUser[i]

                                                                    const choiceUser = await TestModel.relateChoiceAnswer(userTest.id, optionID)
                                                                    console.log("MULTIPLA ESCOLHA CADASTRADAS: " + choiceUser)
                                                            }

                                                        }

                                                    } else if(questionType == 'UNICA_ESCOLHA') {

                                                        if (typeof answer.id_alternativa === 'number') {
                                                            
                                                            const choiceUser = await TestModel.relateChoiceAnswer(userTest.id, answer.id_alternativa)
                                                            console.log('UNICA ESCOLHA CADASTRADA' + choiceUser)
                                                        
                                                        }
                                                    }
                                                }

                                            } catch (error) {
                                                return {
                                                    error: "Ocorreu um erro interno. INFOS: " + error,
                                                    statusCode: 500
                                                }
                                            }

                                            for(let i = 0; i < allQuestions.length; i++){

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
                                                        
                                                        const updatePoints = await TestModel.updateTestPoints(
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
                                                        
                                                        const updatePoints = await TestModel.updateTestPoints(
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
                                                            
                                                            const updatePoints = await TestModel.updateTestPoints(
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

                                                  try {
                                                        const userPoints = totalChecks * questionPoints
                                                        await TestModel.updateUserPoints(userTestExist.idUsuario, userPoints)
                                                  } catch (error) {
                                                        return {
                                                            error: error,
                                                            statusCode: 500
                                                        }                                                   
                                                  }

                                                })
                                            }

                                            return {
                                                message: "Respostas cadastradas com sucesso!",
                                                statusCode: 200
                                            }

                                        } else {
                                            return {
                                                error: "Objeto de respostas está vazio.",
                                                statusCode: 400
                                            }
                                        }

                                    } else {
                                        return {
                                            error: "Campo resposta deve ser um Object.",
                                            statusCode: 400
                                        }
                                    }

                                } else {
                                    return {
                                        error: "É necessário enviar o campo de Respostas.",
                                        statusCode: 400
                                    }
                                }

                            } else {
                                return {
                                    error: "Prova usuário não encontrada.",
                                    statusCode: 404
                                }
                            }

                            } else {
                                return {
                                    error: "Campo finalizada deve ser booleano.",
                                    statusCode: 400
                                }
                            }

                    } else {
                        return {
                            error: "Os tipos de dados dos IDs devem ser números.",
                            statusCode: 400
                        }
                    }

                } else {
                    return {
                        error: ReturnMessage.MissingFields,
                        statusCode: 400
                    }
                }

            } else {
                return {
                    error: ReturnMessage.emptyBody,
                    statusCode: 400,
                }
            }
        }
        

    static async createUserTest(testAnswer : userTest) {
        if(Object.keys(testAnswer).length > 0) {

            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, testAnswer.data_inicio, testAnswer.finalizada != undefined) {
            
                if(typeof testAnswer.id_prova_andamento === 'number' && typeof testAnswer.id_usuario === 'number') {

                    if(testAnswer.finalizada) {
                        return {
                            error: "Campo finalizada deve ser FALSE.",
                            statusCode: 400
                        }
                    }
            
                    const testExist = await AnswerTestModel.findTestProgress(testAnswer.id_prova_andamento)

                    if(testExist) {

                        const userExist = await UserDeveloperModel.findBy('id', testAnswer.id_usuario)

                        if(userExist) {

                            const userTestExist = await TestModel.findUserTest(testAnswer.id_prova_andamento, testAnswer.id_usuario)

                            if(userTestExist) {

                                return {
                                    error: "Essa prova já está sendo ou foi respondida. ID da Prova Usuário: " + userTestExist.id,
                                    statusCode: 400
                                }

                            } else {

                                const testData = {
                                    id_usuario: testAnswer.id_usuario,
                                    id_prova_andamento: testAnswer.id_prova_andamento,
                                    finalizada: testAnswer.finalizada,
                                    data_inicio: testAnswer.data_inicio
                                }

                                    const userTest = await TestModel.createUserTest(testData)

                                    return {
                                        message: "Prova usuário cadastrada com sucesso.",
                                        data: userTest,
                                        statusCode: 201
                                    }
                                
                            }

                        } else {
                            return {
                                error: "Não foi encontrado um usuário com o ID especificado.",
                                statusCode: 404
                            }
                        }

                    } else {
                        return {
                            error: "Não foram encontradas provas em andamento com o ID especificado.",
                            statusCode: 404
                        }
                    }
                    
                } else {
                    return {
                        error: "IDs devem ser números.",
                        statusCode: 400
                    }
                }
            
            } else {
                return {
                    error: ReturnMessage.MissingFields,
                    statusCode: 400
                }
            }

        } else {
            return {
                error: ReturnMessage.emptyBody,
                statusCode: 400
            }
        }

    }
    
    // static async updateUserTest(testInfo: updateUserTest) {

    //     if(Object.keys(testInfo).length > 0) {

    //         if(testInfo.id_prova_usuario, testInfo.data_entrega, testInfo.finalizada != null) {

    //             if(typeof testInfo.id_prova_usuario === 'number') {

    //                 if(typeof testInfo.finalizada === 'boolean') {

    //                     if(testInfo.finalizada) {

    //                         const userTestExist = await TestModel.findUserTestByID(testInfo.id_prova_usuario)

    //                         if(userTestExist) {

    //                             const userTest = {
    //                                 data_entrega: testInfo.data_entrega,
    //                                 finalizada: testInfo.finalizada,
    //                                 id_prova_usuario: testInfo.id_prova_usuario
    //                             }

    //                             try {
                                 
    //                                 const updatedUserTest = await TestModel.updateUserTest(userTest)
                                    
    //                                 return {
    //                                     message: "Prova usuário finalizada com sucesso.",
    //                                     data: updatedUserTest,
    //                                     statusCode: 201
    //                                 }

    //                             } catch (error) {
    //                                 return {
    //                                     error: error,
    //                                     statusCode: 500
    //                                 }
    //                             }

    //                             // const userAnswers = await QuestionModel.findAllAnswers(testInfo.id_prova_usuario)
    
    //                             // if (userAnswers) {
                                    
    //                             //     // const testID = userTestExist.provaAndamento.prova.id
        
    //                             //     // const totalQuestions = await QuestionModel.findAllQuestions(testID)
                                    
    //                             //     // const totalChoiceAnswers = userAnswers?._count.respostaAlternativaProva
    //                             //     // const totalTextAnswers = userAnswers?._count.respostaQuestaoProva
    
    //                             //     // const totalAnswers = totalTextAnswers + totalChoiceAnswers

    //                             // } else {
    //                             //     return {
    //                             //         error: "Prova não pode ser finalizada sem respostas cadastradas.",
    //                             //         statusCode: 400
    //                             //     }
    //                             // }
    
    //                         } else {
    //                             return {
    //                                 error: "Prova usuário com o ID especificado não foi encontrada.",
    //                                 statusCode: 404
    //                             }
    //                         }

    //                     } else {
    //                         return {
    //                             error: "Campo finalizada deve ser true para completar a finalização.",
    //                             statusCode: 400
    //                         }
    //                     }

    //                 } else {
    //                     return {
    //                         error: "Campo finalizada deve ser booleano.",
    //                         statusCode: 400
    //                     }
    //                 }

    //             } else {
    //                 return {
    //                     error: "IDs devem ser números.",
    //                     statusCode: 400
    //                 }
    //             }

    //         } else {
    //             return {
    //                 error: ReturnMessage.MissingFields,
    //                 statusCode: 400
    //             }
    //         }

    //     } else {
    //         return {
    //             error: ReturnMessage.emptyBody,
    //             statusCode: 400
    //         }
    //     }

    // }

    // static async createAnswer(userAnswer : userAnswer) {
    //     if(Object.keys(userAnswer).length > 0) {

    //         if(userAnswer.id_questao && userAnswer.id_prova_usuario) {

    //             if(typeof userAnswer.id_questao === 'number' && typeof userAnswer.id_prova_usuario == 'number') {
                    
    //                 const userTestExist = await TestModel.findUserTestByID(userAnswer.id_prova_usuario)

    //                 if(userTestExist) {

    //                     const questionExist = await QuestionModel.findQuestion(userAnswer.id_questao)

    //                     if(questionExist) {
                            
    //                         const questionType = await QuestionModel.findQuestionTypeByID(questionExist.idQuestaoProvaTipo)
    
    //                         if (questionType?.tipo === 'DISSERTATIVA') {

    //                             const answerExist = await QuestionModel.findTextAnswer(userTestExist.id, questionExist.id)

    //                             if(answerExist) {
    //                                 return {
    //                                     error: "Essa questão já foi respondida!",
    //                                     statusCode: 400
    //                                 }
    //                             }
                                
    //                             if(userAnswer.resposta) {
    
    //                                 if(isString(userAnswer.resposta)) {
    
    //                                     const newAnswer = await QuestionModel.relateTextAnswer(
    //                                         userAnswer.id_prova_usuario,
    //                                         userAnswer.id_questao,
    //                                         userAnswer.resposta
    //                                     )
                                        
    //                                     console.log(newAnswer)
                                        
    //                                     return {
    //                                         message: "Resposta cadastrada com sucesso!",
    //                                         statusCode: 200
    //                                     }
    
    //                                 } else {
    //                                     return {
    //                                         error: "Campo resposta deve ser STRING.",
    //                                         statusCode: 400
    //                                     }
    //                                 }
    
    //                             } else {
    //                                 return {
    //                                     error: "A questão " + questionExist.id + " é do tipo DISSERTATIVA. Informe uma resposta.",
    //                                     statusCode: 400
    //                                 }
    //                             }
                                
    //                         } else if(questionType?.tipo === 'MULTIPLA_ESCOLHA') {

    //                             if(userAnswer.id_alternativa) {

    //                                 if (Array.isArray(userAnswer.id_alternativa)) {
                                    
    //                                     const userChoices = userAnswer.id_alternativa
                                    
    //                                     // for de validacao
    //                                     for (let i = 0; i < userChoices.length; i++) {
                                            
    //                                         const optionExist = await QuestionModel.findChoice(
    //                                             userChoices[i],
    //                                             userAnswer.id_questao
    //                                         )

    //                                         const answerExist = await QuestionModel.findOptionAnswer(userTestExist.id, userChoices[i])
                                
    //                                         if(answerExist) {
    //                                             return {
    //                                                 error: "Essa questão já foi respondida!",
    //                                                 statusCode: 400
    //                                             }
    //                                         }

    //                                         if(!optionExist) {
    //                                             return {
    //                                                 error: "Não foram encontradas alternativas na questão especificada com esse ID: " + userAnswer.id_alternativa,
    //                                                 statusCode: 404
    //                                             }
    //                                         }

    //                                     }

    //                                     //for de cadastro
    //                                     userChoices.forEach(async optionID => {
    //                                         const newAnswer = await QuestionModel.relateChoiceAnswer(
    //                                             userTestExist.id,
    //                                             optionID
    //                                         )

    //                                         console.log(newAnswer)
    //                                     })

    //                                     return {
    //                                         message: "Resposta cadastrada com sucesso!",
    //                                         statusCode: 200
    //                                     }
                                    
    //                                 } else {
    //                                     return {
    //                                         error: "Questões de MULTIPLA ESCOLHA devem conter o campo id_alternativa como NUMERO[].",
    //                                         statusCode: 400
    //                                     }
    //                                 }

    //                             } else {
    //                                 return {
    //                                     error: "É necessário informar ID alternativa para questões de Múltipla Escolha.",
    //                                     statusCode: 400
    //                                 }
    //                             }

    //                         } else if(questionType?.tipo === 'UNICA_ESCOLHA') {
    
    //                             const answerExist = await QuestionModel.findChoiceAnswer(userTestExist.id, questionExist.id)

    //                             if(answerExist) {
    //                                 return {
    //                                     error: "Essa questão já foi respondida!",
    //                                     statusCode: 400
    //                                 }
    //                             }

    //                             if(userAnswer.id_alternativa) {

    //                                 if(typeof userAnswer.id_alternativa == 'number') {

    //                                     const optionExist = await QuestionModel.findChoice(
    //                                         userAnswer.id_alternativa,
    //                                         questionExist.id
    //                                     )

    //                                     if(optionExist) {

    //                                         const newAnswer = await QuestionModel.relateChoiceAnswer(
    //                                             userTestExist.id,
    //                                             userAnswer.id_alternativa
    //                                         )

    //                                         console.log(newAnswer)

    //                                         return {
    //                                             message: "Resposta cadastrada com sucesso!",
    //                                             statusCode: 200
    //                                         }

    //                                     } else {
    //                                         return {
    //                                             error: "Não foi encontrado alternativa com o ID informado. ID: " + userAnswer.id_alternativa,
    //                                             statusCode: 404
    //                                         }
    //                                     }

    //                                 } else {
    //                                     return {
    //                                         error: "Questões de UNICA ESCOLHA devem conter o campo id_alternativa como NUMERO.",
    //                                         statusCode: 400
    //                                     }
    //                                 }

    //                             } else {
    //                                 return {
    //                                     error: "É necessário informar ID alternativa para questões de Única Escolha.",
    //                                     statusCode: 400
    //                                 }
    //                             }

    //                         } else {
    //                             return {
    //                                 error: "Ocorreu um erro no servidor ao procurar o tipo da questão " + questionExist.id,
    //                                 statusCode: 500
    //                             }
    //                         }
    
    //                     } else {
    //                         return {
    //                             error: "Não foi encontrado uma questão com o ID especificado. ID: " + userAnswer.id_questao,
    //                             statusCode: 404
    //                         }
    //                     }

    //                 } else {
    //                     return {
    //                         error: "Não foi encontrada uma prova usuário com o ID especificado. ID: " + userAnswer.id_prova_usuario,
    //                         statusCode: 404
    //                     }
    //                 }

    //             } else {
    //                 return {
    //                     error: "IDs devem ser números.",
    //                     statusCode: 400
    //                 }
    //             }

    //         } else {
    //             return {
    //                 error: ReturnMessage.MissingFields,
    //                 statusCode: 400
    //             }
    //         }

    //     } else {
    //         return {
    //             error: ReturnMessage.emptyBody,
    //             statusCode: 400
    //         }
    //     }
    // }

    // static async updateAnswer(userAnswer: userAnswer) {
    //     if(Object.keys(userAnswer).length > 0) {
        
    //         if(userAnswer.id_questao && userAnswer.id_prova_usuario) {

    //             if(typeof userAnswer.id_questao === 'number' && typeof userAnswer.id_prova_usuario == 'number') {
                    
    //                 const userTestExist = await TestModel.findUserTestByID(userAnswer.id_prova_usuario)

    //                 if(userTestExist) {

    //                     const questionExist = await QuestionModel.findQuestion(userAnswer.id_questao)

    //                     if(questionExist) {
                            
    //                         const questionType = await QuestionModel.findQuestionTypeByID(questionExist.idQuestaoProvaTipo)
    
    //                         if (questionType?.tipo === 'DISSERTATIVA') {

    //                             const answerExist = await QuestionModel.findTextAnswer(
    //                                 userTestExist.id,
    //                                 userAnswer.id_questao
    //                             )

    //                             if(answerExist) {

    //                                 if(userAnswer.resposta) {
    
    //                                     if(isString(userAnswer.resposta)) {
        
    //                                         const updatedAnswer = await QuestionModel.updateTextAnswer(
    //                                             answerExist.id,
    //                                             userAnswer.resposta
    //                                         )
                                            
    //                                         console.log(updatedAnswer)
                                            
    //                                         return {
    //                                             message: "Resposta atualizada com sucesso!",
    //                                             statusCode: 200
    //                                         }
        
    //                                     } else {
    //                                         return {
    //                                             error: "Campo resposta deve ser STRING.",
    //                                             statusCode: 400
    //                                         }
    //                                     }
        
    //                                 } else {
    //                                     return {
    //                                         error: "A questão " + questionExist.id + " é do tipo DISSERTATIVA. Informe uma resposta.",
    //                                         statusCode: 400
    //                                     }
    //                                 }

    //                             } else {
    //                                 return {
    //                                     error: "Não é possível atualizar uma resposta que não existe. ID Questão não respondida: " + questionExist.id,
    //                                     statusCode: 404
    //                                 }
    //                             }
                                
    //                         } else if(questionType?.tipo === 'MULTIPLA_ESCOLHA') {

    //                             const answerExist = await QuestionModel.findUserChoices(
    //                                 userTestExist.id,
    //                                 userAnswer.id_questao
    //                             )

    //                             if(answerExist) {

    //                                 if(userAnswer.id_alternativa) {

    //                                     if (Array.isArray(userAnswer.id_alternativa)) {

    //                                         const userChoices = userAnswer.id_alternativa
                                            
    //                                         // for de validacao
    //                                         for (let i = 0; i < userChoices.length; i++) {
                                                
    //                                             const optionExist = await QuestionModel.findChoice(
    //                                                 userChoices[i],
    //                                                 userAnswer.id_questao
    //                                             )
                                                    
    //                                             if(!optionExist) {
    //                                                 return {
    //                                                     error: "Não foram encontradas alternativas na questão especificada com esse ID: " + userAnswer.id_alternativa,
    //                                                     statusCode: 404
    //                                                 }
    //                                             }
                                                    
    //                                         }
                                                
    //                                         await QuestionModel.deleteUserChoices(userAnswer.id_questao)

    //                                         //for pra atualizar todas
    //                                         userChoices.forEach(async (answer) => {
    //                                             const newAnswer = await QuestionModel.relateChoiceAnswer(
    //                                                 userTestExist.id,
    //                                                 answer
    //                                             )   
    //                                             console.log(newAnswer)
    //                                         })                                                
    
    //                                         return {
    //                                             message: "Resposta cadastrada com sucesso!",
    //                                             statusCode: 200
    //                                         }
                                        
    //                                     } else {
    //                                         return {
    //                                             error: "Questões de MULTIPLA ESCOLHA devem conter o campo id_alternativa como NUMERO[].",
    //                                             statusCode: 400
    //                                         }
    //                                     }
    
    //                                 } else {
    //                                     return {
    //                                         error: "É necessário informar ID alternativa para questões de Múltipla Escolha.",
    //                                         statusCode: 400
    //                                     }
    //                                 }

    //                             } else {
    //                                 return {
    //                                     error: "Não é possível atualizar uma resposta que não existe. ID Questão não respondida: " + questionExist.id,
    //                                     statusCode: 404
    //                                 }
    //                             } 

    //                         } else if(questionType?.tipo === 'UNICA_ESCOLHA') {

    //                             const answerExist = await QuestionModel.findChoiceAnswer(
    //                                 userTestExist.id,
    //                                 questionExist.id
    //                             )

    //                             if(answerExist) {

    //                                 if(userAnswer.id_alternativa) {

    //                                     if(typeof userAnswer.id_alternativa == 'number') {
    
    //                                         const optionExist = await QuestionModel.findChoice(
    //                                             userAnswer.id_alternativa,
    //                                             questionExist.id
    //                                         )
    
    //                                         if(optionExist) {
    
    //                                             const newAnswer = await QuestionModel.updateChoiceAnswer(
    //                                                 answerExist.id,
    //                                                 userAnswer.id_alternativa
    //                                             )
    
    //                                             console.log(newAnswer)
    
    //                                             return {
    //                                                 message: "Resposta atualizada com sucesso!",
    //                                                 statusCode: 200
    //                                             }
    
    //                                         } else {
    //                                             return {
    //                                                 error: "Não foi encontrado alternativa com o ID informado. ID: " + userAnswer.id_alternativa,
    //                                                 statusCode: 404
    //                                             }
    //                                         }
    
    //                                     } else {
    //                                         return {
    //                                             error: "Questões de UNICA ESCOLHA devem conter o campo id_alternativa como NUMERO.",
    //                                             statusCode: 400
    //                                         }
    //                                     }
    
    //                                 } else {
    //                                     return {
    //                                         error: "É necessário informar ID alternativa para questões de Única Escolha.",
    //                                         statusCode: 400
    //                                     }
    //                                 }

    //                             } else {
    //                                 return {
    //                                     error: "Não é possível atualizar uma resposta que não existe. ID Questão não respondida: " + questionExist.id,
    //                                     statusCode: 404
    //                                 }
    //                             }

    //                         } else {
    //                             return {
    //                                 error: "Ocorreu um erro no servidor ao procurar o tipo da questão " + questionExist.id,
    //                                 statusCode: 500
    //                             }
    //                         }
    
    //                     } else {
    //                         return {
    //                             error: "Não foi encontrado uma questão com o ID especificado. ID: " + userAnswer.id_questao,
    //                             statusCode: 404
    //                         }
    //                     }

    //                 } else {
    //                     return {
    //                         error: "Não foi encontrada uma prova usuário com o ID especificado. ID: " + userAnswer.id_prova_usuario,
    //                         statusCode: 404
    //                     }
    //                 }

    //             } else {
    //                 return {
    //                     error: "IDs devem ser números.",
    //                     statusCode: 400
    //                 }
    //             }

    //         } else {
    //             return {
    //                 error: ReturnMessage.MissingFields,
    //                 statusCode: 400
    //             }
    //         }
        
    //     } else {
    //         return {
    //             error: ReturnMessage.emptyBody,
    //             statusCode: 400
    //         }
    //     }
    // }

    static async listAnswers(id: number) {

        if (typeof id == 'number') {
    
          const userTest = await AnswerTestModel.findUserTestByID(id)
    
          if(userTest) {
    
            try {
              const allAnswers = await AnswerTestModel.listUserAnswers(userTest.id)
              
              return {
                data: allAnswers,
                statusCode: 200
              }
    
            } catch (error) {
              return {
                error: error,
                statusCode: 500
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

}
    
