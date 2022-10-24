import { PrismaClient, Genero } from "@prisma/client";

const prismaClient = new PrismaClient()

export default class GenderModel{

    static async showAll() {
      return await prismaClient.genero.findMany() 
    }

}
