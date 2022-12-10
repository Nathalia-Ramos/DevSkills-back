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
  static async updateGroupStatus(idUsuario: number, statusID: number, idConvite: number) : Promise <Number>{
    console.log("model", idUsuario,statusID)
   
    const result = await prismaClient.$executeRaw`UPDATE tblconvite SET id_convite_status = ${statusID} where id = ${idConvite}`
   
    return result
   
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
static async getGroupsCompnay(id: number): Promise<Empresa | any> {
    const groups: any = await prismaClient.$queryRaw`SELECT 
                                                    distinct  tblgrupo.id as idGrupo,
                                                      tblgrupo.nome,
                                                    tblgrupo.descricao,
                                                      tblgrupo.status as ativo
                                                      
                                                  FROM tblgrupo
                                                    inner join tblgrupo_usuario
                                                    where tblgrupo.id in 
                                                      (SELECT 
                                                        id_grupo FROM tblprova_grupo where
                                                          tblprova_grupo.id_prova_andamento 
                                                            in (select id from tblprova_andamento where tblprova_andamento.id_empresa = ${id})
                                                      ) group by idGrupo `;
    console.log(groups);

    let users;
    const idsGroup = groups.map((item: any) => item.idGrupo).toString();

    const usersQuatity: any = await prismaClient.$queryRaw`
      SELECT 
	distinct tblgrupo_usuario.id_grupo AS idGrupo,
    cast(COUNT(tblgrupo_usuario.id_usuario) as DECIMAL) as totalCandidatos
    from tblgrupo_usuario 
    
    where id_grupo IN (${idsGroup})
    
group by idGrupo;
    `;

    console.log(usersQuatity);

    return [
      groups.map((item: any) => ({
        id: item.idGrupo,
        nome: item.nome,
        descricao: item.descricao,
        ativo: item.ativo,
        quantidade: parseInt(usersQuatity[0].totalCandidatos),
      })),
    ];
  }
 static async getGroupsUser(idUsuario: number){
  return await prismaClient.grupoUsuario.findMany({
    where:{
       idUsuario:{
          equals: idUsuario 
       }
    },
    select:{
      grupo:{
        select:{
          id: true,
          nome: true,
          descricao: true,
          status: true,
          provaGrupo:{
            select:{
              provaAndamento:{
                select:{
                  empresa:{
                    select:{
                      id: true,
                      nome_fantasia: true,
                      logo: true,
                      ativo: true
                    }
                  },
                  prova:{
                    select:{
                      id: true,
                      titulo: true,
                      descricao: true,
                      ativo: true
                    }
                  }
                },

              }
            }
          }

        }
      }
    }
  })
 }
 
  static async findInvite(
    id_usuario: number,
    id_grupo: number
   ) : Promise<Convite | null> {
    return await prismaClient.convite.findFirst({
      where:{
        idGrupo: id_grupo,
        idUsuario: id_usuario
      }
    })
   }
   static async getConviteStatus(idUsuario: number) : Promise <Convite | any>{
    return await prismaClient.convite.findFirst({
      where:{
        id: { 
          equals: idUsuario
        }
      },
      select:{
        conviteStatus:{
          select:{
            status: true
          }
        },
        idConviteStatus: true,
        grupo:{
          select:{
            id: true,
            nome: true,
            descricao: true,
            status: true,
            provaGrupo:{
              select:{
                provaAndamento:{
                  select:{
                    empresa:{
                       select:{
                        id: true,
                        nome_fantasia: true,
                        logo: true
                       }
                    },
                    prova:{
                      select:{
                        id: true,
                        titulo: true,
                        descricao: true,
                        ativo: true
                      }
                    }
                  }
                }
              }
            }
          }
        },

      }
    })
   }
   static async convite(idUsuario: number) : Promise <Convite | any> {
    return await prismaClient.convite.findMany({
      where:{
        idUsuario:{
          equals: idUsuario
        }
      },
      select:{
        grupo:{
          select:{
            id: true,
            nome: true,
            descricao: true
          }
        },
         usuario:{
          select:{
            grupoUsuario:{
              select:{
                grupo:{
                  select: {
                    provaGrupo:{
                      select:{
                        provaAndamento:{
                          select:{
                            empresa:{
                              select:{
                                id: true,
                                nome_fantasia: true,
                                logo: true,
                              },
                            },
                            prova:{
                              select:{
                                id: true,
                                titulo: true,
                                ativo: true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
         },
        conviteStatus:{
          select:{
            id: true,
            status: true
          }
        }
      }
    })
   }
   static async convitePendente( idUsuario: number) : Promise <Convite| any> {
    return await prismaClient.convite.findMany({
      where:{
        idUsuario:{
          equals: idUsuario
        },
         conviteStatus:{
          status:{
            contains: "PENDENTE"
          }
         }
      },
      select:{
        grupo:{
          select:{
            id: true,
            nome: true,
            descricao: true,
            status: true,
            provaGrupo:{
              select:{
                provaAndamento:{
                  select:{
                    empresa:{
                      select:{
                        id: true,
                        nome_fantasia: true,
                        logo: true,
                        ativo: true
                      }
                    },
                    prova:{
                      select:{
                        id: true,
                        titulo: true,
                        descricao: true,
                        ativo: true
                      }
                    }
                  },
  
                }
              }
            }
  
          }
        }
      }

    })
   }
  }