import QuestionModel from "../../models/Questions/QuestionsModel";
import {TestData ,Option}  from "../../interfaces/Test/Tests";
import { Question } from "../../interfaces/Test/Tests";
import ReturnMessages from "../../../config/ReturnMessages";
import TestModel from "../../models/Test/TestModel";


export default class QuestionService {
    static async createQuestion (question: Question){
   
        if(question.enunciado, question.id_tipo, question.img_url){
            
                    const createQuestion = {
                  
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        img_url : question.img_url,
                    }

                    const questao = await QuestionModel.createTestQuestion(createQuestion)
                    const questaoID = questao.id

                    if(question.id_tipo != 3 ){
                      try {
                            question.alternativas?.forEach(async Option => {
                                await QuestionModel.createTestOption(Option.correta, Option.texto, questao.id)
                        })
        
                        } catch (error: any) {
                            console.error(error)
                        }    
                    }  else{
                        return ReturnMessages.Success

                    }
           
            return ReturnMessages.Success
        }
    }
}

