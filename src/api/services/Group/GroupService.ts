import { Grupos } from "../../interfaces/Groups/groups";
import GroupsModel from "../../models/Group/GroupsModel";

export default class createGroup {
  static async create(group: Grupos) {
    if (
      (group.nome,
      group.descricao,
      group.candidatos,
      group.id_prova_andamento,
      group.convite,
      group.candidatos)
    ) {
      const create = {
        nome: group.nome,
        descricao: group.descricao,
      };
      const executeGroup = await GroupsModel.createGroup(create);
      const groupId = executeGroup.id;

      const getConvitStatus = await GroupsModel.GetStatusConvite(group.id);
      const getIdConvite = getConvitStatus.id;

      try {
        group.candidatos.forEach(async (idUsuario: any) => {
          console.error(
            await GroupsModel.createGroupStatus(
              getIdConvite,
              groupId,
              idUsuario
            )
          );
        });
      } catch (error: any) {
        console.error("teste", error);
      }

      try {
        group.id_prova_andamento.forEach(async (value: any) => {
          await GroupsModel.createTestGroup(value, groupId);
        });
      } catch (error: any) {
        console.error(error);
      }
    }
  }
  static async resposta(idUsuario: any, status: any, idGrupo: number) {
    await GroupsModel.getGroup(idGrupo);

    const getStatus = await GroupsModel.statusGet(status);
    const statusID = getStatus.id;

    const groupInvite = await GroupsModel.findInvite(idUsuario, idGrupo);

    if (groupInvite) {
      switch (status) {
        case "ACEITO":
          (await GroupsModel.createGroupUser(idGrupo, idUsuario)) &&
            console.error(
              await GroupsModel.updateGroupStatus(
                idUsuario,
                statusID,
                groupInvite?.id
              )
            );
          //   console.log(statusID, status)
          break;
        case "NEGADO":
          await GroupsModel.updateGroupStatus(
            idUsuario,
            statusID,
            groupInvite?.id
          );
          break;
      }
    }
  }

  static async convitePendente(idUsuario: number) {
    const result = await GroupsModel.convitePendente(idUsuario);

    return result;
  }

  static async groupById(id: number) {
    const result = await GroupsModel.groupById(id);

    return result;
  }

  static async getGroupCompany(id: number) {
    const result = await GroupsModel.getGroupsCompnay(id);

    console.log(result);

    return result;
  }

  static async getGroupCompanyInfo(id: number) {
    const result = await GroupsModel.getGroupCompanyInfo(id);

    console.log(result);

    return result;
  }

  static async getUsersGroups(id: number) {
    const result = await GroupsModel.getGroupsUser(id);

    console.log(result);
    return result;
  }
  static async getConviteGroups(id: number) {
    const result = await GroupsModel.getConviteStatus(id);

    return result;
  }
  static async notificationGroup(id: number) {
    const result = await GroupsModel.convite(id);

    return result;
  }
}
