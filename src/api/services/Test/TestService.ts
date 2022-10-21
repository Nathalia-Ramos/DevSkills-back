import TestModel from "../../models/Test/TestModel";
import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import ReturnMessages from "../../../config/ReturnMessages"
import QuestionModel from "../../models/Questions/QuestionsModel";
import QuestionService from "./QuestionService";
import UserCompanyModel from "../../models/Company/UserCompanyModel";

export default class TestService {
    static async create (test:  TestData ){

        // const testExist = await TestModel.findTest(test.id)
        
        if(test.titulo, test.descricao, test.link_repositorio){
            if(test.titulo.length <= 50 ){
                        if(test.id_tipo === 3){
                            
                    if(test.id_tipo) {        
                                const createTest = {
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: test.id_tipo,
                                    id_criador: test.id_criador               
                                }
                    
                            const prova = await TestModel.create(createTest)
                            const provaID = prova.id

                            const createTestProgress = {
                                data_inicio: test.data_inicio,
                                data_fim: test.data_fim,
                                duracao: test.duracao,
                                id_prova: provaID,
                                id_criador: test.id_criador
                            }

                         try {
                            const company = await TestModel.FindCompany(test.id_criador) 

                            if(test.id_criador === company){
                                await TestModel.TestProgress(test.data_inicio,test.data_fim,test.duracao, test.id_criador, provaID)
                            }
                         } catch (error) {
                            console.log(error)
                         }
                         
                         switch (test.tipo_criador ){
                            case "EMPRESA":
                                TestModel.TestProgress(  test.data_inicio,test.data_fim,test.duracao, test.id_criador, provaID)
                                break;
                         
                            default:
                                break;
                         }
                          console.log(test.tipo_criador)
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

                    return ReturnMessages.Success
                   
                 }
            }
        }
   }   

}   