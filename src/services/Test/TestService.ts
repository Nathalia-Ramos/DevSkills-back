import TestModel from "../../api/models/Test/TestModel";
import Test from "../../interfaces/Test/Test";
import QuestionModel from "../../api/models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";
import QuestionTypeModel from "../../api/models/TypeQuestions/QuestionsTypeModel";


export default class TestService {
    static async create (test:  Test){

        const testExist = await TestModel.findTest(test.id)
        const QuestionExist = await QuestionModel.createTestQuestion(e)

        if(testExist == null) {

            if(test.titulo, test.descricao, test.id_tipo){
                if(test.titulo.length <= 50 ){
                    if(test.id_tipo){

                        const TestData = {
                            titulo: test.titulo,
                            descricao: test.descricao,
                            id_tipo: test.id_tipo
                        }

                        //caso a questao seja pratica
                        if(test.id_tipo == 2){
                            const newTest = await TestModel.create(TestData)
                        }else{
                            if(QuestionExist)
                              const newTest = await TestModel.create(TestData)
                            }
                        }
                    }
                }
            }
        }
    }
}