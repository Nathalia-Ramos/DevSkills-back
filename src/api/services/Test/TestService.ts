import TestModel from "../../models/Test/TestModel";
import Test from "../../interfaces/Test/Tests";
import QuestionModel from "../../models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";
import QuestionTypeModel from "../../models/TypeQuestions/QuestionsTypeModel";



export default class TestService {
    static async create (test:  Test){

        const testExist = await TestModel.findTest(test.id)
       
        if(testExist == null) {
            if(test.titulo, test.descricao, test.id_tipo, test.link_repositorio){
                if(test.titulo.length <= 50 ){
                    if(test.id_tipo == 2){
                        
                        const TestData = {
                            id: test.id,
                            titulo: test.titulo,
                            descricao: test.descricao,
                            id_tipo: test.id_tipo,
                            id_criador: test.id_criador,
                            link_reposotorio: test.link_repositorio,
                            tipo_criador: test.tipo_criador ,
                            ultima_atualizacao: test.ultima_atualizacao
                        }
                        
                       
                            const newTest = await TestModel.create(TestData)
                            console.log("fsdnksdfksd")
                            
                        
                      
                            
                        }
                    }
                }
            }
        }
    }
    
