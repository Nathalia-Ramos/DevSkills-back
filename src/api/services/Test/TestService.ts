import TestModel from "../../models/Test/TestModel";
import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import ReturnMessages from "../../../config/ReturnMessages"
import QuestionModel from "../../models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";

export default class TestService {
    static async create (test:  TestData ){

        // const testExist = await TestModel.findTest(test.id)

        if(test.titulo, test.descricao, test.link_repositorio){
                    if(test.titulo.length <= 50 ){
                        if(test.id_tipo === 1){
                            
                    if(test.id_tipo) {        
                            //verificando se existe alguma questao
        
                            // console.log(test.id)
                            // const questionExist = await QuestionModel.findQuestion(test.id)
                            // const questionId = questionExist?.id

                            // console.log(questionId)

                                const createTest = {
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: test.id_tipo,
                                    id_criador: test.id_criador               
                                }
                    
                            const prova = await TestModel.create(createTest)
                            console.log(prova)
                
                    }else{
                        return ReturnMessages.Conflict
                    }

                    const questions = test.questoes
                    // console.log(questions)
                    
                    try {
                        if(questions) {
                            questions.forEach(a => {
                                console.log("ta entradno aqui")
                                return QuestionService.createQuestion(a)
                            })
                           }
                           console.log(questions)
                        //console.log(question)
                        } catch (error: any) {
                        console.error(error)
                    }

                    return test.questoes
                   
                // }
                 }
            }
        }
   }   

}   
