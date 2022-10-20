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
        
                                const createTest = {
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: test.id_tipo,
                                    id_criador: test.id_criador               
                                }
                    
                            const prova = await TestModel.create(createTest)
                        
                            try {
                                test.ids_habilidades.forEach(async (value)=>{
                                    await TestModel.relateSkills(prova.id, value)
                                })
                            } catch (error) {
                                console.log(error)
                            }

                            //relacionamenyo com as stacks
                            try {
                                test.ids_stacks.forEach(async ( value)=> {
                                    await TestModel.relateStack(prova.id, value)
                                })
                            } catch (error) {
                                
                            }

                
                    }else{
                        return ReturnMessages.Conflict
                    }

                    const questions = test.questoes
          
                    try {
                        if(questions) {
                            questions.forEach(Questions => {
                                return QuestionService.createQuestion(Questions)
                            })
                           }
                           console.log(questions)
                        } catch (error: any) {
                        console.error(error)
                    }

                    return test.questoes
                   
                 }
            }
        }
   }   

}   
