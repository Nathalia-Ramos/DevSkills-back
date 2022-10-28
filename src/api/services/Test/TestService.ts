import TestModel from "../../models/Test/TestModel";
import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import ReturnMessages from "../../../config/ReturnMessages"
import QuestionService from "./QuestionService";

export default class TestService {
    static async create (test:  TestData ){
        if(test.titulo, test.descricao, test.tipo_prova){
            if(test.titulo.length <= 50 ){

                const testType = await TestModel.findTestType(test.tipo_prova)

                if(test.tipo_prova == "TEORICA" || test.tipo_prova == "PRATICA"){      
                          if(testType) {        
                                const createTest = {
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: testType.id,
                                    id_criador: test.id_criador               
                                }
                    
                            const prova = await TestModel.createTest(createTest)
                            const provaID = prova.id

                            const data_fim = new Date(test.data_fim)

                            data_fim.setDate(data_fim.getDate() + 1)   

                         //procurando admin
                         try {
                            const admin = await TestModel.findAdmin(test.id_criador)
                            if(test.id_criador == admin){
                                await TestModel.testAdmin(test.id_criador, provaID)
                            }
                         } catch (error) {
                            
                         }
                       //verificando se é empresa ou admin para poder popular tabelas relacioanadas  
                         switch (test.tipo_criador){
                            case "EMPRESA":
                                TestModel.testProgress(test.data_inicio, data_fim, test.duracao, test.id_criador, provaID)
                                break;
                            case "ADMIN":
                                TestModel.testAdmin(test.id_criador, provaID)
                            default:
                                break;
                         }
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

                            const questions = test.questoes

                            console.log(provaID)
                            console.log(prova)
                        
                            try {
                                if(questions.length >= 1 && test.tipo_prova === "TEORICA" )  {
                                    questions.forEach(Questions => {
                                        return QuestionService.createQuestion(Questions, provaID)
                                    })
                                }else if (questions.length <= 1 && test.tipo_prova === "PRATICA"){
                                    QuestionService.createQuestion(questions[0], provaID)
                                }else{
                                   return {
                                       error: "Prova prática só pode conter uma questão",
                                       statusCode: 400
                                   } 
                                }
                                   console.log(questions)
                            } catch (error: any) {
                                console.error(error)
                            }
                            return ReturnMessages.Success
                        }else{
                            return ReturnMessages.Conflict
                        }
                    }
            }
        }
   }   
}   
