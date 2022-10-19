import TestService from "./TestService";
import Question from "../../interfaces/Question/Question";
import QuestionModel from "../../models/Questions/QuestionsModel";
import {TestData ,Option}  from "../../interfaces/Test/Tests";

import ReturnMessages from "../../../config/ReturnMessages";
import OptionsModel from "../../models/OptionsTest/OptionsModel";

export default class QuestionService {
    static async createQuestion (question: Question){
        const questionExist = await QuestionModel.findQuestion(question.id)

        if(question.enunciado, question.id_tipo, question.img_url){
            
            if(questionExist === null){

                //verificando o tipo de questao
                // 1 = dissertativa
                if(question.id_tipo === 3) {

                    const createQuestion = {
                        id : question.id,
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        foto : question.img_url,
                    }
                    await QuestionModel.createTestQuestion(createQuestion)
            }

            try {
                question.alternativas?.forEach(Option => {
                    OptionsModel.createOptions(Option)
                    console.log(Option)
                })
            } catch (error) {
                
            }
             return ReturnMessages.Success
           }

        }


    }
}