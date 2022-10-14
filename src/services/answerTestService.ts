import { userTest } from "../interfaces/AnswerTest";
import AnswerTestModel from "../api/models/AnswerTestModel";
import message from "../config/ReturnMessages"
import validateRegex from "../utils/RegexValidate";

export default class AnswerTestService {
    static async create(testAnswer : userTest) {
        if (Object.keys(testAnswer).length > 0) {
            
            if (testAnswer.id_prova_andamento, testAnswer.id_usuario, testAnswer.finalizada) {
                
                const testData = {
                    id_usuario: testAnswer.id_usuario,
                    id_prova_andamento: testAnswer.id_prova_andamento,
                    finalizada: testAnswer.finalizada,
                    data_entrega: testAnswer.data_entrega,
                }

                if (testAnswer.respostas) {

                    console.log("entrou no if")
        
                    const userAnswers  = testAnswer.respostas
    
                    if (userAnswers.length > 0) {
    
                        // cadastrar questoes
                        // aqui verificar o tipo de questao com case e fazer um map para enviar ao banco
    
                        // const textAnswers = userAnswers.map((a) => { if(a.resposta != undefined) {return a }})
                        // // userAnswers.forEach((a) => { if(a.resposta != undefined) {console.log(a)} })
                        // const choiceAnswers = 
                        // // userAnswers.forEach((a) => { if(a.id_alternativa != undefined) {return a} })
                        // console.log(textAnswers)
    
                    }
                }
                
                try {
                    const provaUser = await AnswerTestModel.createUserTest(testData);
                    console.log(provaUser)
                    return {
                        message: "Prova salva com sucesso.",
                        statusCode: 200,
                    }
                } catch (error) {
                    return {
                        error: error,
                        statusCode: 401,
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