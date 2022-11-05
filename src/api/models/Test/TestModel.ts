//import TestData from "../../../interfaces/Test/Test";
import { prismaClient } from "../../../database/prismaClient"
import { Administrador, AdministradorProvas, Empresa, prisma, Prova, ProvaAndamento, ProvaHabilidade, ProvaStack, ProvasTodasQuestoes, ProvaTipo, QuestaoProvaTipo } from "@prisma/client";
import { QuestaoProva } from "@prisma/client";
import { Question, TestData } from "../../interfaces/Test/Tests";
import Test from "../../interfaces/Test/Test";
import TestProgress from "../../interfaces/Test/TestProgress";
import filter from "../../interfaces/Test/AdminFilter";

export default class TestModel {
    static async createTest({
        titulo,
        descricao,
        link_repositorio,
        id_tipo
   
    }: Test): Promise<Prova> {
        
        return await prismaClient.prova.create({
                data: {
                    titulo,
                    descricao,
                    idProvaTipo: id_tipo,
                    link_repositorio,
                    ativo: true
                }
            })
          
    } 
    static async findTest(id: number) : Promise<Prova | null>{
        return await prismaClient.prova.findFirst({
            where: {
                id
            }
        })
    }
    static async findQuestion (id: number) : Promise<QuestaoProva | null>{
        return await prismaClient.questaoProva.findFirst({
            where: {
                id
            }
        })
    }
    static async findCompany(id: number) : Promise<any>{
        return await prismaClient.empresa.findFirst({
            where: {
                id: Number(id)
            }
        })
    }
    static async findAdmin(id: number): Promise<any> {
        return await prismaClient.administrador.findFirst({
            where: {
                id: Number(id)
            }
        })
    }
    static async createTestQuestion({
        enunciado,
        img_url,
        id_tipo
    }: Question ) : Promise<QuestaoProva | boolean> {
        try {
            const newQuestion = await prismaClient.questaoProva.create({
                data: {
                    enunciado,
                    foto: img_url,
                    idQuestaoProvaTipo: id_tipo
                }
            })

            prismaClient.$disconnect

            return newQuestion
            
        } catch (error) {
            
            prismaClient.$disconnect

            return false
        }
    }
    static async relateSkills(
        id_prova: number,
        ids_habilidades: number,
      ) : Promise<ProvaHabilidade> {
    
          return await prismaClient.provaHabilidade.create({
            data:{
             idProva: id_prova,
             idHabilidade: ids_habilidades
            }});
    
    }
    static async relateStack(
        id_prova: number,
        ids_stacks: number,
      ): Promise <ProvaStack> {
          return await prismaClient.provaStack.create({
              data: {
                  idProva: id_prova,
                  idProvaStack: ids_stacks
              }
          })
    }
    static async relateTestQuestion (
        id_prova: number,
        id_questao_prova: number
    ): Promise <ProvasTodasQuestoes>{
        return await prismaClient.provasTodasQuestoes.create({
            data: {
                idProva: id_prova,
                idQuestaoProva: id_questao_prova
            }
        })
    }

    static async TestProgress({
        data_inicio,
        data_fim,
        duracao,
        id_empresa,
        id_prova
    } : TestProgress): Promise <ProvaAndamento> {
        return await prismaClient.provaAndamento.create({
            data:{
                data_fim: new Date(data_fim),
                data_inicio: new Date(data_inicio),
                duracao,
                idEmpresa: id_empresa,
                idProva: id_prova
            }
        })
    }
    static async testAdmin(
        id_admin: number,
        id_prova: number
    ): Promise <AdministradorProvas>{
        return await prismaClient.administradorProvas.create({
            data: {
                idAdministrador: id_admin,
                idProva: id_prova
            }
        })
    }
    static async findTypeQuestion (
        id_tipo: number
    ): Promise <QuestaoProvaTipo | null> {
        return await prismaClient.questaoProvaTipo.findFirst({
            where: {
                id: id_tipo
            }
        })
    }
    static async findTestType (
        tipo: string
    ): Promise <ProvaTipo | null> {
        return await prismaClient.provaTipo.findFirst({
            where: {
                tipo: tipo 
            }
        })
    }

    static async userSearch( empresa: any): Promise<ProvaAndamento | any> {
        return await prismaClient.empresa.findMany({
            where: {
                provaAndamento: {
                    every: {
                        empresa
                    }
                }
            }
        })
    }
    static async allTest(){
        try {
          const testAll = await prismaClient.prova.findMany()
    
          prismaClient.$disconnect;
      
          return {testAll};
        } catch (error) {
          
          prismaClient.$disconnect;
              
          return error
        }
        
    }

    static async findAdminTest(
        id_prova: number
    ) : Promise<AdministradorProvas | null> {
        return await prismaClient.administradorProvas.findFirst({
            where:{
                idProva: id_prova
            }
        })
    }
    
    static async findAdminTests() : Promise<AdministradorProvas[]> {
        return await prismaClient.administradorProvas.findMany()
    } 

    static async filterAdminTests({
        tipo,
        ids_stacks,
        ids_habilidades,
        pagina,
    } : filter) {
        return await prismaClient.administradorProvas.findMany({
            where:{
                provas:{
                            provaTipo:{
                                tipo:{
                                    equals: tipo
                                }
                            },
                            provaHabilidade:{
                                some: {
                                    idHabilidade:{
                                        in: ids_habilidades
                                    }
                                }
                            },
                            provaStack:{
                                some: {
                                    idProvaStack:{
                                        in: ids_stacks
                                    }
                                }
                            }
                }
            },
            select:{
                provas:{
                    select:{
                        id: true,
                        titulo: true,
                        descricao: true,
                        provaTipo:{
                            select:{
                                tipo: true
                            }
                        },
                        provaHabilidade:{
                            select:{
                                habilidade:{
                                    select:{
                                        id: true,
                                        nome: true,
                                        icone: true,
                                    }
                                }
                            }
                        },
                        provaStack:{
                            select:{
                                stack:{
                                    select:{
                                        id: true,
                                        nome: true,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            take: 2,
            skip: pagina * 2
        })
    }
}   
