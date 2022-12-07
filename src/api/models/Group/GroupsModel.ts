import { Convite, ConviteStatus, Empresa, EmpresaTelefone, GrupoUsuario, ProvaGrupo } from "@prisma/client";
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
  id: number
 ) : Promise <ConviteStatus | any>{
   return await prismaClient.conviteStatus.findFirst({
     where:{
       id: id
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

 static async updateGroupStatus(id: number, status: string, id_convite_status: any) : Promise <Convite>{
  return await prismaClient.convite.update({
     where:{
       id: id_convite_status       
     },
     data:{
       conviteStatus:{
         update:{
           status
         }
       }
     },
     include: { conviteStatus: true }
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
}
