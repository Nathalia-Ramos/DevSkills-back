import UserCompanyModel from "../../models/Company/UserCompanyModel";
import {Grupos} from "../../interfaces/Groups/groups"
import TestModel from "../../models/Test/TestModel";

export default class createGroup{
    static async createGroup(group: Grupos){
        
        if(group.nome, group.descricao, group.candidatos,group.id_prova_andamento){
            
            
                const create = {
                   nome: group.nome,   
                   descricao: group.descricao,
                }
                const executeGroup = await UserCompanyModel.createGroup(create)
                const groupId = executeGroup.id
                //console.log(create)
                
                
                //relacionamento grupoProva
                try {
                    group.candidatos.forEach(async (idUsuario) => {
                    const aa = await UserCompanyModel.createGroupUser(groupId, idUsuario);
                    console.log(aa, "aaaaaa")
                })
                } catch (error: any) {
                    console.error("teste",error)
                }       
               
            try{
                group.id_prova_andamento.forEach(async(value: any)=>{
                   const teste =  await UserCompanyModel.createTestGroup( value, groupId)
                   console.log(teste)
                })
            }
            catch(error: any){console.error(error)}
           
        }
    }
}