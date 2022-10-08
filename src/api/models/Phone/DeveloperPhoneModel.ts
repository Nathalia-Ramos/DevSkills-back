import { PrismaClient, UsuarioTelefone } from "@prisma/client";
import PhoneData from "../../../interfaces/DeveloperPhone";

const prisma = new PrismaClient()

export default class GenderModel {

  static async execute({
    ddd,
    numero,
    id_tipo,
    id_usuario,
  }: PhoneData): Promise<Object> {

    try {
      const newDeveloperPhone = await prisma.usuarioTelefone.create({
        data: {
          ddd,
          numero,
          idTipoTelefone: id_tipo,
          idUsuario: id_usuario
        },
      });

      prisma.$disconnect;

      return newDeveloperPhone;

    } catch (error) {
      console.error(error);

      prisma.$disconnect;

      return { error: error };
    }
  }
}
