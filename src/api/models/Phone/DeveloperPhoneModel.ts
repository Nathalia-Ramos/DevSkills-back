import { PrismaClient, UsuarioTelefone } from "@prisma/client";

const prisma = new PrismaClient()

interface PhoneData {
  ddd: string,
  numero: string,
  id_tipo: number,
  id_usuario: number,
}

export default class GenderModel {

  static async execute({
    ddd,
    numero,
    id_tipo,
    id_usuario,
  }: PhoneData): Promise<UsuarioTelefone | boolean> {

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

      return false;
    }
  }
}
