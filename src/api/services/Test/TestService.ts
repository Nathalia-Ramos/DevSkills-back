import TestModel from "../../models/Test/TestModel";
import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import TestProgress from "../../interfaces/Test/TestProgress";
import ReturnMessages from "../../../config/ReturnMessages"
import QuestionService from "./QuestionService";

export default class TestService {
    static async create (test:  TestData){
        if(test.titulo, test.descricao, test.link_repositorio){
            if(test.titulo.length <= 50 ){

                const testType = await TestModel.FindTestType(test.tipo_prova)

                if(test.tipo_prova == "TEORICA" || test.tipo_prova == "PRATICA"){      
                          if(testType) {        
                                const createTest = {
                                    titulo: test.titulo,
                                    descricao: test.descricao,
                                    link_repositorio: test.link_repositorio,
                                    id_tipo: testType.id,
                                    id_criador: test.id_criador               
                                }
                    
                            const prova = await TestModel.create(createTest)
                            const provaID = prova.id

                            const data_fim = new Date(test.data_fim)

                            data_fim.setDate(data_fim.getDate() + 1)   

                         //procurando admin
                         try {
                            const admin = await TestModel.FindAdmin(test.id_criador)
                            if(test.id_criador == admin){
                                await TestModel.TestAdmin(test.id_criador, provaID)
                            }
                         } catch (error) {
                            
                         }
                       //verificando se é empresa ou admin para poder popular tabelas relacioanadas  
                         switch (test.tipo_criador){
                            case "EMPRESA":

                                const testProgress ={
                                    data_fim: test.data_fim,
                                    data_inicio: test.data_inicio,
                                    duracao: test.duracao,
                                    id_empresa: test.id_criador,
                                    id_prova: provaID
                                }

                                TestModel.TestProgress(testProgress)
                                break;
                            case "ADMIN":
                                TestModel.TestAdmin(test.id_criador, provaID)
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
                        
                            try {
                                if(questions.length > 1 && test.tipo_prova === "TEORICA" )  {
                                    questions.forEach(Questions => {
                                        return QuestionService.createQuestion(Questions, provaID)
                                    })
                                }else if (questions.length <= 1 && test.tipo_prova === "PRATICA"){
                                    QuestionService.createQuestion(questions[0], provaID)
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
   
   static async relateTemplate(testInfo: TestProgress){
        if(testInfo) {
            if(testInfo.id_empresa, testInfo.id_prova, testInfo.data_fim, testInfo.data_inicio) {

                const companyExist = await TestModel.FindCompany(testInfo.id_empresa)
                const testExist = await TestModel.findTest(testInfo.id_prova)

                if (companyExist != null && testExist != null) {

                    const isTemplate = await TestModel.findAdminTest(testInfo.id_prova)

                    if(isTemplate) {

                        try {
                            await TestModel.TestProgress(testInfo)

                            return {
                                message: ReturnMessages.TestCreated,
                                statusCode: 200
                            }

                        } catch (error) {
                            return {
                                error: error,
                                statusCode: 400
                            }
                        }

                    } else {
                        return {
                            error: ReturnMessages.TestAdminConflict,
                            statusCode: 400
                        }
                    }

                } else {
                    return {
                        error: ReturnMessages.UserNotFound,
                        statusCode: 400
                    }
                }

            } else {
                return {
                    error: ReturnMessages.MissingFields,
                    statusCode: 402
                }
            }
        } else {
            return {
                error: ReturnMessages.EmptyBody,
                statusCode: 400
            }
        }
    }
}   