import TestService from "./TestService";
import Question from "../../interfaces/Test/Questio";
import QuestionTypeModel from "../../api/models/TypeQuestions/QuestionsTypeModel";
import QuestionModel from "../../api/models/Questions/QuestionsModel";

export default class QuestionService {
    static async createQuestion (question: Question){

     /*   if(question) {
            const QuestionData = {
                id_tipo: question.id_tipo,
                enunciado: question.enunciado,
                foto :  question.foto,
                tipo: question.tipo
                
            }
            
            if(question.id_tipo == 1){
                const newTest = await QuestionModel.createTestQuestion(QuestionData)
            }
        }

        const QuestionExist = await QuestionTypeModel.create(question) 
        const QuestionID = QuestionExist.id*/

                   
                        const newQuestion = {   
                            id_tipo: question.id_tipo,
                            enunciado: question.enunciado,
                            foto :  question.foto,
                            tipo: question.tipo
                            
                        }

                        const QuestionExist = await QuestionTypeModel.create(question) 
                        const QuestionID = newQuestion.id_tipo
                        
                        if(question.id_tipo == 1){
                            const newTest = await QuestionModel.createTestQuestion(newQuestion)
                        }
    }


}