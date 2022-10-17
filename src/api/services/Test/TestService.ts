import TestModel from "../../models/Test/TestModel";
import Test from "../../interfaces/Test/Tests";
import Provas from "../../interfaces/Provas/Provas";
import QuestionModel from "../../models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";
import QuestionTypeModel from "../../models/TypeQuestions/QuestionsTypeModel";
import ReturnMessages from "../../../config/ReturnMessages";

export default class TestService {
    static async create (test:  Test){

        const testExist = await TestModel.findTest(test.id)
      // console.log(testExist)
        if(testExist != null) {
            
            if(test.titulo, test.descricao, test.id_tipo, test.link_repositorio){
                if(test.titulo.length <= 50 ){
                    if(test.id_tipo === 4){
                        const questionExist = await QuestionModel.findQuestion(test.id)
                        const questionId = questionExist?.id
                            if(questionId){
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
                            }
                    }
                    if(test.id_tipo === 3) {
                        //popular tblprovas
                        const createTest ={
                            titulo: test.titulo,
                            descricao: test.descricao,
                            link_repositorio: test.link_repositorio,
                            id_tipo: test.id_tipo,
                            tipo_criador: test.tipo_criador,
                            id: test.id
                        }
                        await TestModel.create(createTest)
                    }
                    console.log("AAAAAAA")
                    return ReturnMessages.Success
                }
            }
       }
    
    }   

}