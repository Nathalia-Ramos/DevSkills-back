import { userAnswer, userTest, textAnswer } from "../interfaces/AnswerTest";
import AnswerTestModel from "../api/models/AnswerTestModel";
import answerQuestionTest from "../api/models/answerQuestionTest";
import message from "../config/ReturnMessages"
import validateRegex from "../utils/RegexValidate";

export default class AnswerTestService {
    static async create(testAnswer : userTest) {
        if (Object.keys(testAnswer).length > 0) {
            
            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, testAnswer.finalizada) {

                if (testAnswer.respostas) {

                    console.log("entrou no if de respostas")
        
                    const userAnswers  = testAnswer.respostas
    
                    if (userAnswers.length > 0) {

                        const testData = {
                            id_usuario: testAnswer.id_usuario,
                            id_prova_andamento: testAnswer.id_prova_andamento,
                            finalizada: testAnswer.finalizada,
                            data_entrega: testAnswer.data_entrega,
                        }

                        const textAnswers : userAnswer[] = userAnswers.filter(
                            (answer) => { if (answer.resposta != undefined) { return answer }})
                        
                        const choiceAnswers = userAnswers.filter(
                            (answer) => { if (answer.id_alternativa != undefined) { return answer }})
        
                        try {

                            const provaUser = await AnswerTestModel.createUserTest(testData);
                            console.log(provaUser)
    
                            if (textAnswers.length > 0) {
    
                                textAnswers.forEach(element => {
                                    if (element.resposta) {
                                        answerQuestionTest.relateTextAnswer(
                                            provaUser.id,
                                            element.id_questao,
                                            element.resposta
                                        )
                                    } else {
                                        console.log("nao tem respota")
                                    }});
                            } else {
                                return {
                                    message: "Não foram encontradas respostas dissertativas",
                                    statusCode: 404
                                }
                            }
    
                            if (choiceAnswers.length > 0) {
                                choiceAnswers.forEach(element => {
                                    if (element.id_alternativa) {
                                        answerQuestionTest.relateChoiceAnswer(
                                            provaUser.id,
                                            element.id_alternativa
                                        )
                                    } else {
                                        console.log("nao tem alternativa")
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
                } else{
                    
                    return {
                        message: "Prova salva com sucesso.",
                        statusCode: 200,
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