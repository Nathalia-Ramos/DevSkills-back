import { Convite, ConviteStatus, Empresa, EmpresaTelefone, GrupoUsuario, prisma, ProvaGrupo, Usuario } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import Group from "../../interfaces/Groups/group";


export default class UserCompanyModel {

  static async createGroup({
    nome,
    descricao
  
  }: Group) : Promise <Group> {
    return await prismaClient.grupo.create({
      data:{
        nome,
        descricao,
        status: true
      }
    })
  }
  static async createGroupUser(
    idGrupo: any,
    idUsuario: any,
   ) : Promise <GrupoUsuario> {
    return await prismaClient.grupoUsuario.create({
      data:{
        idGrupo,
        idUsuario                        
      }
    })
  }
  static async createTestGroup(
    idProvaAndamento: any,
    idGrupo: any
  ) : Promise <ProvaGrupo> {
    return await prismaClient.provaGrupo.create({
      data:{
        idProvaAndamento,
        idGrupo
      }
    })
  }
  static async createGroupConvite(
    status: any,
    id: number
  ): Promise <ConviteStatus>{
    return await prismaClient.conviteStatus.create({
      data:{
        status: "PENDENTE"
      }
    })
  }
  static async GetStatusConvite(
    status: any
  ) : Promise <ConviteStatus | any>{
    return await prismaClient.conviteStatus.findFirst({
      where:{
        status: status
      }
    })
  }
  static async statusGet(
    status: string
  ): Promise <ConviteStatus | any>{
    return await prismaClient.conviteStatus.findFirst({
      where:{
        status: status
      }
    })
  }
  static async getGroup(id: number){
    return await prismaClient.grupo.findFirst({
      where:{
        id: id
      }
    })
  }
 static async updateGroupStatus( id_convite_status: number, statusID: number, status: string ) : Promise <Convite>{
  console.log(id_convite_status)
  return await prismaClient.convite.update({
     where:{
         id: id_convite_status
     },
     data:{
       idConviteStatus: statusID
      },
    })
  }
  static async createGroupStatus(
    id_convite_status: any,
    idGrupo: any,
    idUsuario: number
    
  ):  Promise <Convite>{
    return await prismaClient.convite.create({
      data:{
          idConviteStatus: id_convite_status,
          idGrupo: idGrupo,
          idUsuario: idUsuario
      }
    })
  }
  static async getUsers(
    idUsuario: number
  ) : Promise <Usuario | any>{
    return await prismaClient.usuario.findFirst({
      where:{
        id: idUsuario
      }
    })
  }
  static async getGroupsCompany(
    tokenValidate: any
  ): Promise <Empresa| any>{
    return await prismaClient.empresa.findFirst({
      where:{
        id: tokenValidate
      },
      select:{
        provaAndamento:{
          select:{
            prova:{
              select: {
                id: true,
                titulo: true,
                ativo: true,
                provaHabilidade:{
                  select:{
                    habilidade: {
                      select:{
                        id: true,
                        nome: true,
                        icone: true
                      }
                    }
                  }
                },
                provaStack:{
                  select:{
                    stack: {
                      select:{
                        id: true,
                        nome: true
                      }
                    }
                  }
                }
              }
            },
    
            provaGrupo:{
              select:{
                grupo:{
                  select:{
                    id: true,
                    nome: true,
                    descricao: true,
                    status: true,
                    grupoUsuario:{
                      select:{
                        usuario:{
                          select:{
                            id: true,
                            nome: true,
                            email: true,
                            ativo: true,
                            EnderecoUsuario:{
                              select:{
                                cidade:{
                                  select:{
                                    id: true,
                                    nome: true,
                                    estado:{
                                      select:{
                                        id: true,
                                        nome: true
                                      }
                                    }
                                  },
                                },
                              }
                            }
                          }
                        },

                      }
                    },
                    _count:{
                      select:{
                        grupoUsuario: true
                      }
                    }

                  }
                }
              }
            },
            empresa: {
              select:{
                id: true,
                nome_fantasia:true
              }
            }
          }

        }

      }
    })
  }
}
