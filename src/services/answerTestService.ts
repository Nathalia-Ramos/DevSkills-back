import { userAnswer, userTest } from "../interfaces/AnswerTest";
import AnswerTestModel from "../api/models/AnswerTestModel";
import answerQuestionTest from "../api/models/answerQuestionTest";
import UserDeveloperModel from "../api/models/Developer/UserDeveloperModel";
import message from "../config/ReturnMessages"
import validateRegex from "../utils/RegexValidate";

export default class AnswerTestService {
    static async create(testAnswer : userTest) {
        if (Object.keys(testAnswer).length > 0) {
            
            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, typeof testAnswer.finalizada === 'boolean') {

                if(typeof testAnswer.id_prova_andamento === 'number' && typeof testAnswer.id_usuario === 'number') {

                    // verificar se user existe tb
                    if(await AnswerTestModel.findBy('id', testAnswer.id_prova_andamento)) {

                        const testData = {
                            id_usuario: testAnswer.id_usuario,
                            id_prova_andamento: testAnswer.id_prova_andamento,
                            finalizada: testAnswer.finalizada,
                            data_entrega: testAnswer.data_entrega,
                        }
                        
                        if (testAnswer.respostas) {    
                
                            const userAnswers  = testAnswer.respostas
            
                            if (userAnswers.length > 0) {

                                const textAnswers = userAnswers.filter(
                                    async (answer) => {
                                        if ( typeof answer.resposta === 'string' ) {

                                            const question = await answerQuestionTest.findType(answer.id_questao)
                                            
                                            if (question?.tipo == "Dissertativa") {
                                                return answer
                                            } else {
                                                return {
                                                    error: "ID da questão e seu conteúdo estão divergentes.",
                                                    statusCode: 401
                                                }
                                            }
                                            
                                    } else {
                                        return {
                                            error: "Resposta deve ser um campo de texto.",
                                            statusCode: 400
                                        }
                                    }})
                                
                                const choiceAnswers = userAnswers.filter(
                                    async (answer) => { if (typeof answer.id_alternativa === 'number') {
                                        
                                        const question = await answerQuestionTest.findType(answer.id_questao)
                                        
                                        if (question?.tipo == "Múltipla Escolha" || question?.tipo == "Única Escolha") {
                                            if(await answerQuestionTest.findChoice(answer.id_alternativa, answer.id_questao)) {
                                                return answer
                                            } else {
                                                return {
                                                    error: "Não foi possível encontrar o ID da Alternativa especificada.",
                                                    statusCode: 401
                                                }
                                            }
                                        } else {
                                            return {
                                                error: "ID da questão e seu conteúdo estão divergentes.",
                                                statusCode: 401
                                            }
                                        }                                     
                                    } else {
                                        return {
                                            error: "ID deve ser um número.",
                                            statusCode: 400
                                        }
                                    }})

                                try {
        
                                    const provaUser = await AnswerTestModel.createUserTest(testData);
                                    // console.log(provaUser)
            
                                    if (textAnswers.length > 0) {

                                        textAnswers.forEach(answer => {
                                            if (answer.resposta) {
                                                answerQuestionTest.relateTextAnswer(
                                                    provaUser.id,
                                                    answer.id_questao,
                                                    answer.resposta
                                                )
                                            }});

                                    } else {
                                        return {
                                            message: "Não foram encontradas respostas dissertativas",
                                            statusCode: 404
                                        }
                                    }
            
                                    if (choiceAnswers.length > 0) {
                                        choiceAnswers.forEach(answer => {
                                            if (answer.id_alternativa) {
                                                answerQuestionTest.relateChoiceAnswer(
                                                    provaUser.id,
                                                    answer.id_alternativa
                                                )
                                            }});
                                    } else {
                                        return {
                                            message: "Não foram encontradas respostas de escolha",
                                            statusCode: 404
                                        }
                                    }
                                    
                                } catch (error) {
                                    return {
                                        error: error,
                                        statusCode: 401,
                                    }
                                }
        
                                return {
                                    message: "Respostas cadastradas com sucesso!",
                                    statusCode: 200
                                }
            
                            } else {
                                return {
                                    error: "Objeto de respostas está vazio.",
                                    statusCode: 401
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
                            error: "Não foram encontradas provas em andamento com o ID especificado.",
                            statusCode: 404
                        }
                    }

                } else {
                    return {
                        error: "Os tipos de dados não correspondem aos esperados.",
                        statusCode: 401
                    }
                }

        } else {
            return {
                error: message.MissingFields,
                statusCode: 401
            }
        }
    
    } else {
        return {
            error: message.emptyBody,
            statusCode: 400,
        }
    }

    }
}