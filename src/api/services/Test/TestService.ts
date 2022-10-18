import TestModel from "../../models/Test/TestModel";
import Test from "../../interfaces/Test/Tests";
import Provas from "../../interfaces/Provas/Provas";
import QuestionModel from "../../models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";
import QuestionTypeModel from "../../models/TypeQuestions/QuestionsTypeModel";
import ReturnMessages from "../../../config/ReturnMessages"
import Question from "../../interfaces/Question/Question";

export default class TestService {
    static async create (test:  Test){

        const testExist = await TestModel.findTest(test.id)
        if(testExist != null) {
            if(test.titulo, test.descricao, test.id_tipo, test.link_repositorio){
                if(test.titulo.length <= 50 ){
                    if(test.id_tipo === 1){
                    
                            //PRATICA

                            /*if(questionId){
                                const createTest ={
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: test.id_tipo,
                                    tipo_criador: test.tipo_criador,
                                    id: test.id
                                }
                                await TestModel.create(createTest)
                            }else{
                                return "Errorrrrr"
                            }*/

                        }
                        if(test.id_tipo === 4) {        
                            //verificando se existe alguma questao
                            const questionExist = await QuestionModel.findQuestion(test.id)
                            const questionId = questionExist?.id
                            
                            if(questionExist === null) {    
                                console.log(questionExist)
                                const createTest = {
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: test.id_tipo,
                                    tipo_criador: test.tipo_criador,
                                    id: test.id
                                }
                            await TestModel.create(createTest)
                        }else{
                            console.log("errrrroooor")
                            return ReturnMessages.Conflict
                        }
                    }
                    return ReturnMessages.Success
                }
            }
       }
    
    }   

}