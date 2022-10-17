import TestService from "./TestService";
import Question from "../../interfaces/Question/Question";
import QuestionTypeModel from "../../models/TypeQuestions/QuestionsTypeModel";
import QuestionModel from "../../models/Questions/QuestionsModel";
import ReturnMessages from "../../../config/ReturnMessages";

export default class QuestionService {
    static async createQuestion (question: Question){
        const questionExist = await QuestionModel.findQuestion(question.id)

        if(question.enunciado, question.id_tipo, question.img_url){
            
            if(questionExist === null){

                //verificando o tipo de questao
                // 1 = dissertativa
                if(question.id_tipo === 1) {

                    const createQuestion = {
                        id : question.id,
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        img_url : question.img_url,
                       
                    }
                    await QuestionModel.createTestQuestion(createQuestion)

                }else if(question.id_tipo === 2){
                    const createQuestion = {
                        id : question.id,
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        img_url : question.img_url,
                       
                    }
                    await QuestionModel.createTestQuestion(createQuestion)
                }else if(question.id_tipo === 3){
                    const createQuestion = {
                        id : question.id,
                        enunciado: question.enunciado,
                        id_tipo: question.id_tipo,
                        img_url : question.img_url,
                       
                    }
                    await QuestionModel.createTestQuestion(createQuestion)
                }
            }
            return ReturnMessages.Success
        }

    }


}