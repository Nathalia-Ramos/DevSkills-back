import { userAnswer, userTest, updateUserTest, choiceInfos } from "../../interfaces/Test/AnswerTest";
import AnswerTestModel from "../../models/Test/TestModel";
import TestModel from "../../models/Test/TestModel";
import ReturnMessage from "../../../config/ReturnMessages"
import validateRegex from "../../utils/RegexValidate";
import UserDeveloperModel from "../../models/Developer/UserDeveloperModel";
import QuestionModel from "../../models/Questions/QuestionsModel";
import isString from "../../utils/isString";
import correctAnswer from "../../interfaces/Test/Answer";

export default class AnswerTestService {

    static async createUserTest(testAnswer : userTest) {
        if(Object.keys(testAnswer).length > 0) {

            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, testAnswer.data_inicio) {
            
                if(typeof testAnswer.id_prova_andamento === 'number' && typeof testAnswer.id_usuario === 'number') {
            
                    const testExist = await TestModel.findTest(testAnswer.id_prova_andamento)

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

                                    const userTest = await TestModel.createUserTest(
                                        testAnswer.id_usuario,
                                        testAnswer.id_prova_andamento,
                                        false, // campo finalizada
                                        new Date(testAnswer.data_inicio)
                                    )

                                    console.log(userTest)

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
    
    static async updateUserTest(testInfo: updateUserTest) {

        if(Object.keys(testInfo).length > 0) {

            if(testInfo.id_prova_usuario, testInfo.data_entrega, testInfo.finalizada != null) {

                if(typeof testInfo.id_prova_usuario === 'number') {

                    if(typeof testInfo.finalizada === 'boolean') {

                        if(testInfo.finalizada) {

                            const userTestExist = await TestModel.findUserTestByID(testInfo.id_prova_usuario)

                            if(userTestExist) {

                                const userTest = {
                                    data_entrega: testInfo.data_entrega,
                                    finalizada: testInfo.finalizada,
                                    id_prova_usuario: testInfo.id_prova_usuario
                                }

                                try {
                                 
                                    const updatedUserTest = await TestModel.updateUserTest(userTest)
                                    
                                    return {
                                        message: "Prova usuário finalizada com sucesso.",
                                        data: updatedUserTest,
                                        statusCode: 201
                                    }

                                } catch (error) {
                                    return {
                                        error: error,
                                        statusCode: 500
                                    }
                                }

                                // const userAnswers = await QuestionModel.findAllAnswers(testInfo.id_prova_usuario)
    
                                // if (userAnswers) {
                                    
                                //     // const testID = userTestExist.provaAndamento.prova.id
        
                                //     // const totalQuestions = await QuestionModel.findAllQuestions(testID)
                                    
                                //     // const totalChoiceAnswers = userAnswers?._count.respostaAlternativaProva
                                //     // const totalTextAnswers = userAnswers?._count.respostaQuestaoProva
    
                                //     // const totalAnswers = totalTextAnswers + totalChoiceAnswers

                                // } else {
                                //     return {
                                //         error: "Prova não pode ser finalizada sem respostas cadastradas.",
                                //         statusCode: 400
                                //     }
                                // }
    
                            } else {
                                return {
                                    error: "Prova usuário com o ID especificado não foi encontrada.",
                                    statusCode: 404
                                }
                            }

                        } else {
                            return {
                                error: "Campo finalizada deve ser true para completar a finalização.",
                                statusCode: 400
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

    static async createAnswer(userAnswer : userAnswer) {
        if(Object.keys(userAnswer).length > 0) {

            if(userAnswer.id_questao && userAnswer.id_prova_usuario) {

                if(typeof userAnswer.id_questao === 'number' && typeof userAnswer.id_prova_usuario == 'number') {
                    
                    const userTestExist = await TestModel.findUserTestByID(userAnswer.id_prova_usuario)

                    if(userTestExist) {

                        const questionExist = await QuestionModel.findQuestion(userAnswer.id_questao)

                        if(questionExist) {
                            
                            const questionType = await QuestionModel.findQuestionTypeByID(questionExist.idQuestaoProvaTipo)
    
                            if (questionType?.tipo === 'DISSERTATIVA') {
                                
                                if(userAnswer.resposta) {
    
                                    if(isString(userAnswer.resposta)) {
    
                                        const newAnswer = await QuestionModel.relateTextAnswer(
                                            userAnswer.id_prova_usuario,
                                            userAnswer.id_questao,
                                            userAnswer.resposta
                                        )
                                        
                                        console.log(newAnswer)
                                        
                                        return {
                                            message: "Resposta cadastrada com sucesso!",
                                            statusCode: 200
                                        }
    
                                    } else {
                                        return {
                                            error: "Campo resposta deve ser STRING.",
                                            statusCode: 400
                                        }
                                    }
    
                                } else {
                                    return {
                                        error: "A questão " + questionExist.id + " é do tipo DISSERTATIVA. Informe uma resposta.",
                                        statusCode: 400
                                    }
                                }
                                
                            } else if(questionType?.tipo === 'MULTIPLA_ESCOLHA') {
                             
                                if(userAnswer.id_alternativa) {

                                    if (Array.isArray(userAnswer.id_alternativa)) {
                                    
                                        const userChoices = userAnswer.id_alternativa
                                    
                                        // for de validacao
                                        for (let i = 0; i < userChoices.length; i++) {
                                            
                                            const optionExist = await QuestionModel.findChoice(
                                                userChoices[i],
                                                userAnswer.id_questao
                                            )

                                            if(!optionExist) {
                                                return {
                                                    error: "Não foram encontradas alternativas na questão especificada com esse ID: " + userAnswer.id_alternativa,
                                                    statusCode: 404
                                                }
                                            }

                                        }

                                        //for de cadastro
                                        userChoices.forEach(async optionID => {
                                            const newAnswer = await QuestionModel.relateChoiceAnswer(
                                                userTestExist.id,
                                                optionID
                                            )

                                            console.log(newAnswer)
                                        })

                                        return {
                                            message: "Resposta cadastrada com sucesso!",
                                            statusCode: 200
                                        }
                                    
                                    } else {
                                        return {
                                            error: "Questões de MULTIPLA ESCOLHA devem conter o campo id_alternativa como NUMERO[].",
                                            statusCode: 400
                                        }
                                    }

                                } else {
                                    return {
                                        error: "É necessário informar ID alternativa para questões de Múltipla Escolha.",
                                        statusCode: 400
                                    }
                                }

                            } else if(questionType?.tipo === 'UNICA_ESCOLHA') {
    
                                if(userAnswer.id_alternativa) {

                                    if(typeof userAnswer.id_alternativa == 'number') {

                                        const optionExist = await QuestionModel.findChoice(
                                            userAnswer.id_alternativa,
                                            questionExist.id
                                        )

                                        if(optionExist) {

                                            const newAnswer = await QuestionModel.relateChoiceAnswer(
                                                userTestExist.id,
                                                userAnswer.id_alternativa
                                            )

                                            console.log(newAnswer)

                                            return {
                                                message: "Resposta cadastrada com sucesso!",
                                                statusCode: 200
                                            }

                                        } else {
                                            return {
                                                error: "Não foi encontrado alternativa com o ID informado. ID: " + userAnswer.id_alternativa,
                                                statusCode: 404
                                            }
                                        }

                                    } else {
                                        return {
                                            error: "Questões de UNICA ESCOLHA devem conter o campo id_alternativa como NUMERO.",
                                            statusCode: 400
                                        }
                                    }

                                } else {
                                    return {
                                        error: "É necessário informar ID alternativa para questões de Única Escolha.",
                                        statusCode: 400
                                    }
                                }

                            } else {
                                return {
                                    error: "Ocorreu um erro no servidor ao procurar o tipo da questão " + questionExist.id,
                                    statusCode: 500
                                }
                            }
    
                        } else {
                            return {
                                error: "Não foi encontrado uma questão com o ID especificado. ID: " + userAnswer.id_questao,
                                statusCode: 404
                            }
                        }

                    } else {
                        return {
                            error: "Não foi encontrada uma prova usuário com o ID especificado. ID: " + userAnswer.id_prova_usuario,
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

    static async updateAnswer(userAnswer: userAnswer) {
        if(Object.keys(userAnswer).length > 0) {
        
            if(userAnswer.id_questao && userAnswer.id_prova_usuario) {

                if(typeof userAnswer.id_questao === 'number' && typeof userAnswer.id_prova_usuario == 'number') {
                    
                    const userTestExist = await TestModel.findUserTestByID(userAnswer.id_prova_usuario)

                    if(userTestExist) {

                        const questionExist = await QuestionModel.findQuestion(userAnswer.id_questao)

                        if(questionExist) {
                            
                            const questionType = await QuestionModel.findQuestionTypeByID(questionExist.idQuestaoProvaTipo)
    
                            if (questionType?.tipo === 'DISSERTATIVA') {

                                const answerExist = await QuestionModel.findTextAnswer(
                                    userTestExist.id,
                                    userAnswer.id_questao
                                )

                                if(answerExist) {

                                    if(userAnswer.resposta) {
    
                                        if(isString(userAnswer.resposta)) {
        
                                            const updatedAnswer = await QuestionModel.updateTextAnswer(
                                                answerExist.id,
                                                userAnswer.resposta
                                            )
                                            
                                            console.log(updatedAnswer)
                                            
                                            return {
                                                message: "Resposta atualizada com sucesso!",
                                                statusCode: 200
                                            }
        
                                        } else {
                                            return {
                                                error: "Campo resposta deve ser STRING.",
                                                statusCode: 400
                                            }
                                        }
        
                                    } else {
                                        return {
                                            error: "A questão " + questionExist.id + " é do tipo DISSERTATIVA. Informe uma resposta.",
                                            statusCode: 400
                                        }
                                    }

                                } else {
                                    return {
                                        error: "Não é possível atualizar uma resposta que não existe. ID Questão não respondida: " + questionExist.id,
                                        statusCode: 404
                                    }
                                }
                                
                            } else if(questionType?.tipo === 'MULTIPLA_ESCOLHA') {

                                const answerExist = await QuestionModel.findUserChoices(
                                    userTestExist.id,
                                    userAnswer.id_questao
                                )

                                if(answerExist) {

                                    if(userAnswer.id_alternativa) {

                                        if (Array.isArray(userAnswer.id_alternativa)) {

                                            const userChoices = userAnswer.id_alternativa
                                            
                                            // for de validacao
                                            for (let i = 0; i < userChoices.length; i++) {
                                                
                                                const optionExist = await QuestionModel.findChoice(
                                                    userChoices[i],
                                                    userAnswer.id_questao
                                                )
                                                    
                                                if(!optionExist) {
                                                    return {
                                                        error: "Não foram encontradas alternativas na questão especificada com esse ID: " + userAnswer.id_alternativa,
                                                        statusCode: 404
                                                    }
                                                }
                                                    
                                            }
                                                
                                            await QuestionModel.deleteUserChoices(userAnswer.id_questao)

                                            //for pra atualizar todas
                                            userChoices.forEach(async (answer) => {
                                                const newAnswer = await QuestionModel.relateChoiceAnswer(
                                                    userTestExist.id,
                                                    answer
                                                )   
                                                console.log(newAnswer)
                                            })                                                
    
                                            return {
                                                message: "Resposta cadastrada com sucesso!",
                                                statusCode: 200
                                            }
                                        
                                        } else {
                                            return {
                                                error: "Questões de MULTIPLA ESCOLHA devem conter o campo id_alternativa como NUMERO[].",
                                                statusCode: 400
                                            }
                                        }
    
                                    } else {
                                        return {
                                            error: "É necessário informar ID alternativa para questões de Múltipla Escolha.",
                                            statusCode: 400
                                        }
                                    }

                                } else {
                                    return {
                                        error: "Não é possível atualizar uma resposta que não existe. ID Questão não respondida: " + questionExist.id,
                                        statusCode: 404
                                    }
                                } 

                            } else if(questionType?.tipo === 'UNICA_ESCOLHA') {

                                const answerExist = await QuestionModel.findChoiceAnswer(
                                    userTestExist.id,
                                    questionExist.id
                                )

                                if(answerExist) {

                                    if(userAnswer.id_alternativa) {

                                        if(typeof userAnswer.id_alternativa == 'number') {
    
                                            const optionExist = await QuestionModel.findChoice(
                                                userAnswer.id_alternativa,
                                                questionExist.id
                                            )
    
                                            if(optionExist) {
    
                                                const newAnswer = await QuestionModel.updateChoiceAnswer(
                                                    answerExist.id,
                                                    userAnswer.id_alternativa
                                                )
    
                                                console.log(newAnswer)
    
                                                return {
                                                    message: "Resposta atualizada com sucesso!",
                                                    statusCode: 200
                                                }
    
                                            } else {
                                                return {
                                                    error: "Não foi encontrado alternativa com o ID informado. ID: " + userAnswer.id_alternativa,
                                                    statusCode: 404
                                                }
                                            }
    
                                        } else {
                                            return {
                                                error: "Questões de UNICA ESCOLHA devem conter o campo id_alternativa como NUMERO.",
                                                statusCode: 400
                                            }
                                        }
    
                                    } else {
                                        return {
                                            error: "É necessário informar ID alternativa para questões de Única Escolha.",
                                            statusCode: 400
                                        }
                                    }

                                } else {
                                    return {
                                        error: "Não é possível atualizar uma resposta que não existe. ID Questão não respondida: " + questionExist.id,
                                        statusCode: 404
                                    }
                                }

                            } else {
                                return {
                                    error: "Ocorreu um erro no servidor ao procurar o tipo da questão " + questionExist.id,
                                    statusCode: 500
                                }
                            }
    
                        } else {
                            return {
                                error: "Não foi encontrado uma questão com o ID especificado. ID: " + userAnswer.id_questao,
                                statusCode: 404
                            }
                        }

                    } else {
                        return {
                            error: "Não foi encontrada uma prova usuário com o ID especificado. ID: " + userAnswer.id_prova_usuario,
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

}
    
