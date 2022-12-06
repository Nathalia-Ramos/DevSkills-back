import { ConviteStatus, Empresa, EmpresaTelefone, GrupoUsuario, ProvaGrupo } from "@prisma/client";
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
 ): Promise <ConviteStatus>{
  return await prismaClient.conviteStatus.create({
    data:{
      status:  "PENDENTE"
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
 static async updateGroupStatus(idUsuario: number, status: string){
  return await prismaClient.conviteStatus.update({
    where:{
       id: idUsuario
    },
    data:{
      status
    }
  })
 }
}
