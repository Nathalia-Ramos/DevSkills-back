import TestService from "./TestService";
import Question from "../../interfaces/Test/Questio";
import QuestionTypeModel from "../../api/models/TypeQuestions/QuestionsTypeModel";
import QuestionModel from "../../api/models/Questions/QuestionsModel";

export default class QuestionService {
    static async createQuestion (question: Question){

        const QuestionExist = await QuestionTypeModel.create(question) 
        const QuestionID = QuestionExist.id
        
        if(question) {
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

    }
}