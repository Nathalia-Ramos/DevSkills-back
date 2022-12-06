import UserCompanyModel from "../../models/Company/UserCompanyModel";
import {Grupos} from "../../interfaces/Groups/groups"
import GroupsModel from "../../models/Group/GroupsModel";

export default class createGroup{
    static async teste(group: Grupos) {
        if(group.nome, group.descricao, group.candidatos,group.id_prova_andamento, group.convite, group.candidatos){
            const create = {
               nome: group.nome,   
               descricao: group.descricao,
            }
            const executeGroup = await GroupsModel.createGroup(create)
            const groupId = executeGroup.id

            try {
                 group.candidatos.forEach(async (idUsuario) => {
                 await GroupsModel.createGroupConvite(groupId, idUsuario);

            })
            } catch (error: any) {console.error("teste", error)}       
           
            try{
                group.id_prova_andamento.forEach(async(value: any)=>{
                await  GroupsModel.createTestGroup(value, groupId)
                })
            }
            catch(error: any){console.error(error)}
       }
    }
    static async resposta ( idUsuario: number, status: string, idGrupo: number){
        await GroupsModel.getGroup(idGrupo)
            switch (status) {
                case "ACEITO":
                    await GroupsModel.createGroupUser(idGrupo, idUsuario) && await GroupsModel.updateGroupStatus(idUsuario, status);
                    break;
                case "NEGADO":
                    await GroupsModel.updateGroupStatus(idUsuario, status)
            }
    }
}