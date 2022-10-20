import QuestionModel from "../../models/Questions/QuestionsModel";
import {TestData ,Option}  from "../../interfaces/Test/Tests";
import { Question } from "../../interfaces/Test/Tests";
import ReturnMessages from "../../../config/ReturnMessages";


export default class QuestionService {
    static async createQuestion (question: Question){
   
        if(question.enunciado, question.id_tipo, question.img_url){
            
                if(question.id_tipo === 1) {

                    const createQuestion = {
                  
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        img_url : question.img_url,
                    }

                    const questao = await QuestionModel.createTestQuestion(createQuestion)


                    // coloca um if aqui pra so cadastrar alternativa qnd o tipo for multipla/unica escolha
                    // no else coloca um retorno de questao cadastrada com suecsso

                    try {
                        question.alternativas?.forEach(async Option => {
                            await QuestionModel.createTestOption(Option.correta, Option.texto, questao.id)
                       })
    
                   } catch (error: any) {
                       console.error(error)
                   }
                }
            
            return ReturnMessages.Success
        }
    }
}

