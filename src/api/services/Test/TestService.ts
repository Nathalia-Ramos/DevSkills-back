import TestModel from "../../models/Test/TestModel";
import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import ReturnMessages from "../../../config/ReturnMessages"
import QuestionModel from "../../models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";

export default class TestService {
    static async create (test:  TestData ){

        const testExist = await TestModel.findTest(test.id)
        if(testExist != null) {
            if(test.titulo, test.descricao, test.link_repositorio){
                if(test.titulo.length <= 50 ){
                    if(test.id_prova_tipo === 1){
                    
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
                        if(test.id_prova_tipo === 4) {        
                    
                            const createTest = {
                                id: test.id,
                                titulo: test.titulo,
                                descricao: test.descricao,
                                link_repositorio: test.link_repositorio,
                                idProvaTipo : test.id_prova_tipo,
                                tipo_criador: test.tipo_criador
                            }
   
                            await TestModel.create(createTest)
                  
                    }else{
                        return ReturnMessages.Conflict
                    }
                    try {
                         test.questoes.forEach( Question => {
                          QuestionModel.createTestQuestion(Question)
                        })
                        console.log(test.questoes)
                    } catch (error: any) {
                        console.error(error)
                    }
                    return test.questoes
                   
                }
            }
        }
    }
}   


