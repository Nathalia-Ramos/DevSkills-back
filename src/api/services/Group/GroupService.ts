import UserCompanyModel from "../../models/Company/UserCompanyModel";
import {Grupos} from "../../interfaces/Groups/groups"
import GroupsModel from "../../models/Group/GroupsModel";

export default class createGroup{
    static async createGroup(group: Grupos){
        
        if(group.nome, group.descricao, group.candidatos,group.id_prova_andamento){
            
            
                const create = {
                   nome: group.nome,   
                   descricao: group.descricao,
                }
                const executeGroup = await GroupsModel.createGroup(create)
                const groupId = executeGroup.id
                //console.log(create)
                
                
                //relacionamento grupoProva
                try {
                    group.candidatos.forEach(async (idUsuario) => {
                     await GroupsModel.createGroupUser(groupId, idUsuario, idConvite);
                    
                })
                } catch (error: any) {
                    console.error("teste",error)
                }       
               
            try{
                group.id_prova_andamento.forEach(async(value: any)=>{
                   const teste =  await  GroupsModel.createTestGroup( value, groupId)
                   console.log(teste)
                })
            }
            catch(error: any){console.error(error)}
           
        }
    }
}