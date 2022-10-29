import { userAnswer, userTest } from "../interfaces/AnswerTest";
import AnswerTestModel from "../api/models/AnswerTestModel";
import answerQuestionTest from "../api/models/answerQuestionTest";
import UserDeveloperModel from "../api/models/Developer/UserDeveloperModel";
import message from "../config/ReturnMessages"
import validateRegex from "../api/utils/RegexValidate";

export default class AnswerTestService {
    static async create(testAnswer : userTest) {
        if (Object.keys(testAnswer).length > 0) {
            
            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, typeof testAnswer.finalizada === 'boolean') {

                if(typeof testAnswer.id_prova_andamento === 'number' && typeof testAnswer.id_usuario === 'number') {

                    const testExist = await AnswerTestModel.findBy('id', testAnswer.id_prova_andamento)

                    if (testExist) {

                        const userExist = await UserDeveloperModel.findBy('id', testAnswer.id_usuario)

                        if (userExist) {

                            const testData = {
                                id_usuario: testAnswer.id_usuario,
                                id_prova_andamento: testAnswer.id_prova_andamento,
                                finalizada: testAnswer.finalizada,
                                data_entrega: testAnswer.data_entrega,
                            }
                            
                            if (testAnswer.respostas) {    
                    
                                const userAnswers  = testAnswer.respostas
                
                                if (userAnswers.length > 0) {
    
                                    for (let i = 0; i < userAnswers.length; i++) {

                                        if (userAnswers[i].id_questao) {

                                            const question = await answerQuestionTest.findQuestion(userAnswers[i].id_questao)
    
                                            if(question) {
                                                    
                                                const testUser = await AnswerTestModel.createUserTest(testData);   
                                                
                                                const questionType = await answerQuestionTest.findQuestionType(question.idQuestaoProvaTipo)
        
                                                if(questionType?.tipo == "DISSERTATIVA") {

                                                    if(userAnswers[i].resposta) {

                                                        if (typeof userAnswers[i].resposta === 'string') {
            
                                                            const textAnswer = userAnswers[i]
                                
                                                            if (textAnswer.resposta) {
                                                                await answerQuestionTest.relateTextAnswer(
                                                                    testUser.id,
                                                                    textAnswer.id_questao,
                                                                    textAnswer.resposta
                                                                )
                                                                console.log(textAnswer.id_questao + " cadastrada.")
                                                            } else {
                                                                return {
                                                                    error: "Resposta não pode estar vazia.",
                                                                    statusCode: 400
                                                                }
                                                            }
            
                                                        } else {
                                                            return {
                                                                error: "Campo resposta deve ser do tipo String",
                                                                statusCode: 400
                                                            }
                                                        }

                                                    } else {
                                                        return {
                                                            error: "Resposta não informada.",
                                                            statusCode: 400
                                                        }
                                                    }
        
                                                } else if (questionType?.tipo == "MULTIPLA_ESCOLHA" || questionType?.tipo == "UNICA_ESCOLHA") {
        
                                                    const choiceAnswers = userAnswers[i]
        
                                                    if(choiceAnswers.id_alternativa) {
                                                        if(typeof choiceAnswers.id_alternativa === 'number') {
        
                                                            const optionExist = await answerQuestionTest.findChoice(choiceAnswers.id_alternativa, choiceAnswers.id_questao)
        
                                                            if (optionExist) {
        
                                                                await answerQuestionTest.relateChoiceAnswer(
                                                                    testUser.id,
                                                                    choiceAnswers.id_alternativa
                                                                )
        
                                                                console.log(choiceAnswers.id_questao + " cadastrada.")
        
                                                            } else {
                                                                return {
                                                                    error: "Não foram encontradas alternativas com esse ID: " + choiceAnswers.id_alternativa,
                                                                    statusCode: 404
                                                                }
                                                            }
        
                                                        } else if (Array.isArray(choiceAnswers.id_alternativa)) {
                                                            
                                                            const optionsUser = choiceAnswers.id_alternativa
                                                            
                                                            optionsUser.forEach(async (optionID)=>{
                                                                await answerQuestionTest.relateChoiceAnswer(testUser.id, optionID)
                                                                console.log("alternativas cadastradas : " + optionID)
                                                            })
                                                            
                                                        } else {
                                                            return {
                                                                error: "Alternativa deve ser um número ou array de números.",
                                                                statusCode: 400
                                                            }
                                                        }
                                                        } else {
                                                            return {
                                                                error: "ID Alternativa não informado.",
                                                                statusCode: 400
                                                            }
                                                        }
        
                                                    } else {
                                                        return {
                                                            error: "Ocorreu um erro ao procurar o tipo de questão do id questão: " + userAnswers[i].id_questao,
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
    
                                await AnswerTestModel.createUserTest(testData);
                                
                                return {
                                    message: "Prova salva com sucesso.",
                                    statusCode: 200,
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
                        error: "Os tipos de dados dos IDs devem ser número.",
                        statusCode: 400
                    }
                }

        } else {
            return {
                error: message.MissingFields,
                statusCode: 400
            }
        }
    
    } else {
        return {
            error: message.emptyBody,
            statusCode: 400,
        }
    }

    }

    static async findTest(id_prova: number) {
        const prova = await AnswerTestModel.findTest(id_prova)

        return prova
    }
}