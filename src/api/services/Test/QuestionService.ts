import Question from "../../interfaces/Question/Question";
import QuestionModel from "../../models/Questions/QuestionsModel";
import {TestData ,Option}  from "../../interfaces/Test/Tests";

import ReturnMessages from "../../../config/ReturnMessages";


export default class QuestionService {
    static async createQuestion (question: Question){
   
        const questionExist = await QuestionModel.findQuestion(question.id)

        console.log("AAAAAAAAAAAAAAAAAAAA")
        if(question.enunciado, question.id_tipo, question.img_url){
            
            if(questionExist != null){
                if(question.id_tipo === 3) {

                    const createQuestion = {
                        id : question.id,
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        img_url : question.img_url,
                    }
                    await QuestionModel.createTestQuestion(createQuestion)
                    try {
                        question.alternativas?.forEach( Option => {
                         QuestionModel.createTestQuestion(Option)
                       })
    
                   } catch (error: any) {
                       console.error(error)
                   }
                }
            }
            return ReturnMessages.Success
        }
    }
}

