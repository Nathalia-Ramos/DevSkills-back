import { Empresa, EmpresaTelefone, GrupoUsuario, LoginEmpresa, prisma, ProvaAndamento, ProvaGrupo } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import AddressData from "../../interfaces/Company/Address";
import CityData from "../../interfaces/Company/City";
import CompanyPhoneData from "../../interfaces/Company/CompanyPhone";
import CompanyUser from "../../interfaces/Company/CompanyUser";
import LoginData from "../../interfaces/Company/Login";
import StateData from "../../interfaces/Company/State";
import Group from "../../interfaces/Groups/group";
import filter from "./../../interfaces/Test/AdminFilter";
import {ProvasGrupos, UsuarioGrupo} from "../../interfaces/Groups/groups"
import testGroup from "../../interfaces/Groups/testGroup"


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
    idConvite: any
   ) : Promise <GrupoUsuario> {
    return await prismaClient.grupoUsuario.create({
      data:{
        idGrupo,
        idUsuario,
        idConvite
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
}
