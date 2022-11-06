import TestModel from "../../models/Test/TestModel";
import {TestData, Question ,Option}  from "../../interfaces/Test/Tests";
import TestProgress from "../../interfaces/Test/TestProgress";
import ReturnMessages from "../../../config/ReturnMessages"
import QuestionService from "./QuestionService";
import validateRegex from "../../utils/RegexValidate";
import filter from "../../interfaces/Test/AdminFilter";
import isEmpty from "../../utils/isEmpty";
import AnswerTestModel from "../../models/AnswerTestModel";
import jwt_decode from "jwt-decode";

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

   static async findTest(id_prova: number) {

    const test = await AnswerTestModel.findUserTestByID(id_prova)

    if (test) {
        return {
            data: test,
            statusCode: 200
        }
    } else {
        return {
            error: "Prova com o ID especificado não encontrada.",
            statusCode: 404
        }
    }
}
   
   static async relateTemplate(testInfo: TestProgress){
    
        if(testInfo) {
            if(testInfo.id_empresa, testInfo.id_prova, testInfo.data_fim, testInfo.data_inicio) {

                // if (validateRegex(testInfo.data_inicio, '([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))')) {

                    const companyExist = await TestModel.findCompany(testInfo.id_empresa)
                
                    if (companyExist) {
                        
                        const testExist = await TestModel.findTest(testInfo.id_prova)
                        
                        if(testExist) {
    
                            const isTemplate = await TestModel.findAdminTest(testInfo.id_prova)
    
                            if(isTemplate) {
        
                                try {
                                    await TestModel.TestProgress(testInfo)
        
                                    return {
                                        message: "Prova criada com sucesso",
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
                                    error: "Prova não foi criada por um ADMIN",
                                    statusCode: 400
                                }
                            }
    
                        } else{
                            return {
                                error: "Prova com o ID especificado não encontrada.",
                                statusCode: 404
                            }
                        }
    
                    } else {
                        return {
                            error: ReturnMessages.UserNotFound,
                            statusCode: 400
                        }
                    }

                // } else {
                //     return {
                //         error: "Data de inicio deve seguir o padrão ANO/MÊS/DIA. (AAAA/MM/DD)",
                //         statusCode: 400
                //     }
                // }

            } else {
                return {
                    error: ReturnMessages.MissingFields,
                    statusCode: 402
                }
            }
        } else {
            return {
                error: "Body vazio",
                statusCode: 400
            }
        }

   }   
   static async search(user: number) {
       const testExist = await TestModel.userSearch(user)
       
             // console.log(testExist)

    if(testExist){
        const user = await TestModel.userSearch(testExist.idProvaTipo)
    }else{
        return "errorrrrrrrrrrrrrr"
    }

    }

   static async findAdminTests(reqFilters: filter) {

    const userFilters = reqFilters

    if(userFilters.tipo) {
        if(typeof userFilters.tipo != 'string') {
            return {
                error: "Campo tipo deve ser string.",
                statusCode: 400
            }
        }
    }

    if(userFilters.ids_habilidades) {
        if(typeof userFilters.ids_habilidades != 'number' && !Array.isArray(userFilters.ids_habilidades)) {
            return {
                error: "Campo ids_habilidades deve ser um número ou um array de números.",
                statusCode: 400
            }
        }
    }

    if(userFilters.ids_stacks) {
        if(typeof userFilters.ids_stacks != 'number' && !Array.isArray(userFilters.ids_stacks)) {
            return {
                error: "Campo ids_stacks deve ser um número ou um array de números.",
                statusCode: 400
            }
        }
    }

    if(!userFilters.pagina) {
        if(typeof userFilters.pagina != 'number') {
            return {
                error: "Campo página deve ser um número.",
                statusCode: 400
            }
        } else if(userFilters.pagina == 0) {
            return {
                error: "Campo página deve ser um valor positivo, acima de 0.",
                statusCode: 400
            }
        }
    }  

    userFilters.pagina -= 1

    const adminTests = await TestModel.filterAdminTests(userFilters)

    if (isEmpty(adminTests)) {

        const allTests = (await TestModel.findAdminTests())?.length
        const allPages = Math.ceil(allTests / 20)

        return {
            data: {
                page: userFilters.pagina + 1,
                totalPages: allPages,
                totalResults: Math.ceil(allTests / allPages),
                results: adminTests
            },
            statusCode: 200
        }
    } else {
        return {
            error: "Não foram encontradas provas com as características especificadas.",
            statusCode: 404
        }
    }
   }
}   
