import UserCompanyModel from "../../models/Company/UserCompanyModel";
import {Grupos} from "../../interfaces/Groups/groups"
import GroupsModel from "../../models/Group/GroupsModel";
import TokenData from "../../interfaces/Token/Token";
import { ErrorReturn } from "../../interfaces/ReturnPattern/Returns";

export default class createGroup{
    static async create(group: Grupos) {
        if(group.nome, group.descricao, group.candidatos,group.id_prova_andamento, group.convite, group.candidatos){
        
            const create = {
               nome: group.nome,   
               descricao: group.descricao,
            }
            const executeGroup = await GroupsModel.createGroup(create)
            const groupId = executeGroup.id

            const getConvitStatus = await GroupsModel.GetStatusConvite(group.id)
            const getIdConvite = getConvitStatus.id
            console.log(getIdConvite, "scrr deus")

            try {
                group.candidatos.forEach(async (idUsuario: any ) => {
                    console.error(await GroupsModel.createGroupStatus(getIdConvite, groupId, idUsuario ))
            })
            } catch (error: any) {console.error("teste", error)}       
           
            try{
                group.id_prova_andamento.forEach(async(value: any)=>{
                await GroupsModel.createTestGroup(value, groupId)
                })
            }
            catch(error: any){console.error(error)}
       }
    }
    static async resposta (idUsuario: any, status: any, idGrupo: number){
        await GroupsModel.getGroup(idGrupo)
        
       const getStatus =  await GroupsModel.statusGet(status)
       const statusID = getStatus.id

       const getUsers = await GroupsModel.getUsers(idUsuario)
       const userId = getUsers.id
       console.log("id do usuario", userId)
        
        switch (status) {
            case "ACEITO":
                await GroupsModel.createGroupUser(idGrupo, idUsuario) && console.error(await GroupsModel.updateGroupStatus(userId, statusID,status));
             //   console.log(statusID, status)
                    break;
            case "NEGADO":
                await GroupsModel.updateGroupStatus(userId, statusID, status )
                break;
            }   
    }
    static async getGroupCompany(tokenValidate: TokenData | ErrorReturn,) {
        const result = await GroupsModel.getGroupsCompany(tokenValidate)
        console.log(result)

        return result
    }
}


