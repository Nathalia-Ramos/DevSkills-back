import { PrismaClient, TipoTelefone } from "@prisma/client";

const prismaClient = new PrismaClient()

export default class PhoneModel {

  static async findType(
    id: number
    ) : Promise<TipoTelefone | null> {
      return await prismaClient.tipoTelefone.findFirst({
        where:{
          id
        }
      })
    }

    static async showTypes() : Promise<TipoTelefone[]> {
      return await prismaClient.tipoTelefone.findMany()
    }
}
