import { userAnswer, userTest } from "../interfaces/AnswerTest";
import AnswerTestModel from "../api/models/AnswerTestModel";
import answerQuestionTest from "../api/models/answerQuestionTest";
import UserDeveloperModel from "../api/models/Developer/UserDeveloperModel";
import message from "../config/ReturnMessages"
import validateRegex from "../api/utils/RegexValidate";
// import isNotEmpty from "../api/utils/isNotEmpty";
import isNumber from "../api/utils/isNumber";
import isString from "../api/utils/isString";

export default class AnswerTestService {
    static async create(testAnswer : userTest) {
        if (Object.keys(testAnswer).length > 0) {
            
            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, testAnswer.finalizada != null) {

                if(typeof testAnswer.id_prova_andamento === 'number' && typeof testAnswer.id_usuario === 'number') {
                    
                    if(typeof testAnswer.finalizada === 'boolean') {

                        if(testAnswer.data_entrega) {
                            if(!testAnswer.finalizada) {
                                return {
                                    error: "Não é possível cadastrar uma data de entrega pois o campo finalizada consta como FALSO.",
                                    statusCode: 400
                                }
                            }
    
                            if(!validateRegex(testAnswer.data_entrega, '([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))')) {
                                return {
                                    error: "Data de entrega deve seguir o padrão ANO/MÊS/DIA. (AAAA/MM/DD)",
                                    statusCode: 400
                                }
                            }
                        }
    
                        const testExist = await AnswerTestModel.findBy('id', testAnswer.id_prova_andamento)
    
                        if (testExist) {
    
                            const userExist = await UserDeveloperModel.findBy('id', testAnswer.id_usuario)
    
                            if (userExist) {
    
                                const testUserExist = await AnswerTestModel.findUserTest(testAnswer.id_usuario, testAnswer.id_prova_andamento)
    
                                if(testUserExist) {
                                    
                                    if(testUserExist.finalizada) {
                                        return {
                                            error: "Essa prova já foi respondida.",
                                            statusCode: 400
                                        }
                                    } 

                                }

                                if(testAnswer.data_inicio) {
                                    if(testUserExist) {
                                        return {
                                            error: "Usuário já começou a realização dessa prova e não é possível atualizar a data de início.",
                                            statusCode: 400
                                        }
                                    }
            
                                    if(!validateRegex(testAnswer.data_inicio, '([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))')) {
                                        return {
                                            error: "Data de inicio deve seguir o padrão ANO/MÊS/DIA. (AAAA/MM/DD)",
                                            statusCode: 400
                                        }
                                    }
                                }   
                                
                                if (testAnswer.respostas) {
                                    
                                    if (typeof testAnswer.respostas == 'object') {
                                        
                                        const userAnswers  = testAnswer.respostas
                    
                                        if (userAnswers.length > 0) {
            
                                            if (testAnswer.finalizada) {
        
                                                const allQuestions = (await AnswerTestModel.findAllQuestions(testAnswer.id_prova_andamento)).length
        
                                                if(allQuestions != userAnswers.length) {
                                                    return {
                                                        error: "A prova consta como finalizada, porém, o usuário não respondeu todas as " + allQuestions + " questões.",
                                                        statusCode: 400
                                                    }
                                                }
                                            }
        
                                            for (let i = 0; i < userAnswers.length; i++) {
        
                                                if (userAnswers[i].id_questao) {
        
                                                    const question = await answerQuestionTest.findQuestion(userAnswers[i].id_questao)
            
                                                    if(question) {
                                                        
                                                        const questionType = await answerQuestionTest.findQuestionTypeByID(question.idQuestaoProvaTipo)
                
                                                        if(questionType?.tipo == "DISSERTATIVA") {
        
                                                            if(userAnswers[i].resposta) {
        
                                                                if (isString(userAnswers[i].resposta)) {
                    
                                                                    const textAnswer = userAnswers[i]
                                        
                                                                    if (!textAnswer.resposta) {
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
                
                                                        } else if (questionType?.tipo == "UNICA_ESCOLHA") {
                
                                                            const choiceAnswers = userAnswers[i]
                
                                                            if(choiceAnswers.id_alternativa) {
                                                                if(typeof choiceAnswers.id_alternativa === 'number') {
                
                                                                    const optionExist = await answerQuestionTest.findChoice(choiceAnswers.id_alternativa, choiceAnswers.id_questao)
                
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
                
                                                            } else if (questionType?.tipo == "MULTIPLA_ESCOLHA" ) {
        
                                                                const choiceAnswers = userAnswers[i]

                                                                if(choiceAnswers.id_alternativa) {

                                                                    if (Array.isArray(choiceAnswers.id_alternativa)) {
                                                                    
                                                                        const optionsUser = choiceAnswers.id_alternativa
            
                                                                        for (let i = 0; i < optionsUser.length; i++) {

                                                                            const optionExist = await answerQuestionTest.findChoice(optionsUser[i], choiceAnswers.id_questao)
            
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

                                            const testUser = await AnswerTestModel.createUserTest(
                                                testAnswer.id_usuario,
                                                testAnswer.id_prova_andamento,
                                                testAnswer.finalizada,
                                                testAnswer.data_entrega ? testAnswer.data_entrega : 'null',
                                                testAnswer.data_inicio ? testAnswer.data_inicio : 'null'
                                            );
                                            
                                            console.log(testUser)
        
                                            for (let i = 0; i < userAnswers.length; i++) {
        
                                                const answer = userAnswers[i]
         
                                                const questionType = await answerQuestionTest.findQuestionTypeByQuestion(answer.id_questao)
                                                
                                                console.log(questionType)
        
                                                if (questionType?.tipo == 'DISSERTATIVA') {
                                                    console.log('dissertativa')
                                                    if(answer?.resposta) {
                                                        console.log('entra pra model')
                                                        const textAnswer = await answerQuestionTest.relateTextAnswer(
                                                            testUser.id,
                                                            answer.id_questao,
                                                            answer.resposta
                                                        )
        
                                                        console.log(textAnswer)
                                                    }
                                                } else if(questionType?.tipo == 'MULTIPLA_ESCOLHA') {
                                                    console.log('else')
                                                    
                                                    if (Array.isArray(answer.id_alternativa)) {
                                                        console.log('array')
                                                        const optionsUser = answer.id_alternativa
                                                        
                                                        optionsUser.forEach(async (optionID)=>{
                                                            await answerQuestionTest.relateChoiceAnswer(testUser.id, optionID)
                                                            console.log("Alternativas cadastradas : " + optionID)
                                                        })
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
                                        return {
                                            error: "Campo resposta deve ser um Object.",
                                            statusCode: 400
                                        }
                                    }
                        
                                } else {

                                    // const testData = {
                                    //     id_usuario: testAnswer.id_usuario,
                                    //     id_prova_andamento: testAnswer.id_prova_andamento,
                                    //     finalizada: testAnswer.finalizada,
                                    //     data_entrega: testAnswer.data_entrega,
                                    // }

                                    // await AnswerTestModel.createUserTest(testData);
                                    
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

    static async findTest(
        id_prova: number) {

        const test = await AnswerTestModel.findTest(id_prova)

        if (test) {
            return {
                data: test,
                statusCode: 200
            }
        } else {
            return {
                error: "Prova com o ID especificado não encontrada.",
                statusCode: 404
            }
        }
    }

    static async upsertTest(testAnswer: userTest) {
        if (Object.keys(testAnswer).length > 0) {

            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, testAnswer.finalizada != null) {

                if(typeof testAnswer.id_prova_andamento === 'number' && typeof testAnswer.id_usuario === 'number') {
                    
                    if(typeof testAnswer.finalizada === 'boolean') {

                        if(testAnswer.data_entrega) {
                            if(!testAnswer.finalizada) {
                                return {
                                    error: "Não é possível cadastrar uma data de entrega pois o campo finalizada consta como FALSO.",
                                    statusCode: 400
                                }
                            }
                        }

                            const testExist = await AnswerTestModel.findBy('id', testAnswer.id_prova_andamento)
    
                            if (testExist) {
        
                                const userExist = await UserDeveloperModel.findBy('id', testAnswer.id_usuario)
        
                                if (userExist) {
        
                                    const testUserExist = await AnswerTestModel.findUserTest(testAnswer.id_usuario, testAnswer.id_prova_andamento)
        
                                    if(testUserExist) {

                                        if(testAnswer.data_inicio) {
                                            return {
                                                error: "Usuário já começou a realização dessa prova e não é possível atualizar a data de início.",
                                                statusCode: 400
                                            }
                                        }

                                        if (testAnswer.respostas) {
                                    
                                            if (typeof testAnswer.respostas == 'object') {
                                                
                                                const userAnswers  = testAnswer.respostas
                            
                                                if (userAnswers.length > 0) {
                    
                                                    if (testAnswer.finalizada) {
                
                                                        const allQuestions = (await AnswerTestModel.findAllQuestions(testAnswer.id_prova_andamento)).length
                
                                                        if(allQuestions != userAnswers.length) {
                                                            return {
                                                                error: "A prova consta como finalizada, porém, o usuário não respondeu todas as " + allQuestions + " questões.",
                                                                statusCode: 400
                                                            }
                                                        }
                                                    }
                
                                                    for (let i = 0; i < userAnswers.length; i++) {
                
                                                        if (userAnswers[i].id_questao) {
                
                                                            const question = await answerQuestionTest.findQuestion(userAnswers[i].id_questao)
                    
                                                            if(question) {
                                                                
                                                                const questionType = await answerQuestionTest.findQuestionTypeByID(question.idQuestaoProvaTipo)
                        
                                                                if(questionType?.tipo == "DISSERTATIVA") {
                
                                                                    if(userAnswers[i].resposta) {
                
                                                                        if (isString(userAnswers[i].resposta)) {
                            
                                                                            const textAnswer = userAnswers[i]
                                                
                                                                            if (!textAnswer.resposta) {
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
                        
                                                                } else if (questionType?.tipo == "UNICA_ESCOLHA") {
                        
                                                                    const choiceAnswers = userAnswers[i]
                        
                                                                    if(choiceAnswers.id_alternativa) {
                                                                        if(typeof choiceAnswers.id_alternativa === 'number') {
                        
                                                                            const optionExist = await answerQuestionTest.findChoice(choiceAnswers.id_alternativa, choiceAnswers.id_questao)
                        
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
                        
                                                                    } else if (questionType?.tipo == "MULTIPLA_ESCOLHA" ) {
                
                                                                        const choiceAnswers = userAnswers[i]
        
                                                                        if(choiceAnswers.id_alternativa) {
        
                                                                            if (Array.isArray(choiceAnswers.id_alternativa)) {
                                                                            
                                                                                const optionsUser = choiceAnswers.id_alternativa
                    
                                                                                for (let i = 0; i < optionsUser.length; i++) {
        
                                                                                    const optionExist = await answerQuestionTest.findChoice(optionsUser[i], choiceAnswers.id_questao)
                    
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
        
                                                    const testUser = testUserExist;
                                                    
                                                    console.log(testUser)
                
                                                    for (let i = 0; i < userAnswers.length; i++) {
                
                                                        const answer = userAnswers[i]
                 
                                                        const questionType = await answerQuestionTest.findQuestionTypeByQuestion(answer.id_questao)
                                                        
                                                        console.log(questionType)
                
                                                        if (questionType?.tipo == 'DISSERTATIVA') {
                                                            console.log('dissertativa')

                                                            const answerExist = await answerQuestionTest.findTextAnswer(testUser.id, answer.id_questao)

                                                            if(answerExist) {
                                                                if(answer?.resposta) {
                                                                    console.log('atualizando')
                                                                    const newTextAnswer = await answerQuestionTest.updateTextAnswer(
                                                                        answerExist.id, 
                                                                        testUser.id, 
                                                                        answer.id_questao, 
                                                                        answer.resposta)
                                                                    
                                                                    console.log(newTextAnswer)
                                                                }
                                                            } else {
                                                                if(answer?.resposta) {
                                                                    console.log('entra pra model')
                                                                    const textAnswer = await answerQuestionTest.relateTextAnswer(
                                                                        testUser.id,
                                                                        answer.id_questao,
                                                                        answer.resposta
                                                                    )
                    
                                                                    console.log(textAnswer)
                                                                }
                                                            }

                                                        } else if(questionType?.tipo == 'MULTIPLA_ESCOLHA') {
                                                            console.log('CADASTRANDO MULTIPLA ESCOLHA')

                                                            
                                                            if (Array.isArray(answer.id_alternativa)) {

                                                                console.log('é array')
                                                                const optionsUser = answer.id_alternativa
                                                                
                                                                for (let i = 0; i < optionsUser.length; i++) {
                                                                    
                                                                    const optionID = optionsUser[i]
                                                                    
                                                                    const answerExist = await answerQuestionTest.findChoiceAnswer(
                                                                        optionsUser[i],
                                                                        testUser.id
                                                                    )

                                                                    if(answerExist) {

                                                                        await answerQuestionTest.updateChoiceAnswer(
                                                                            answerExist.id,
                                                                            testUser.id,
                                                                            optionID
                                                                        )

                                                                    } else {
                                                                        await answerQuestionTest.relateChoiceAnswer(testUser.id, optionID)
                                                                        console.log("Alternativas cadastradas : " + optionID)
                                                                    }
                                                                }
                                                            }
                                                        } else if(questionType?.tipo == 'UNICA_ESCOLHA') {
                                                            console.log('UNICA ESCOLHA')

                                                            if (typeof answer.id_alternativa === 'number') {
                                                                const answerExist = await answerQuestionTest.findChoiceAnswer(
                                                                    answer.id_alternativa,
                                                                    testUser.id
                                                                )

                                                                if(answerExist) {

                                                                    const newChoiceAnswer = await answerQuestionTest.updateChoiceAnswer(
                                                                        answerExist.id,
                                                                        testUser.id,
                                                                        answer.id_alternativa
                                                                    ) 
                                                                    
                                                                    console.log(newChoiceAnswer)

                                                                } else {
                                                                    await answerQuestionTest.relateChoiceAnswer(testUser.id, answer.id_alternativa)
                                                                    console.log('alternativa cadastrada: ' + answer.id_alternativa)
                                                                }
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
                                            error: "Não foram encontradas provas em andamento com o ID especificado.",
                                            statusCode: 404
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
}