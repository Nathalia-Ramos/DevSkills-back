import { PrismaClient, Stack } from "@prisma/client";

const prisma = new PrismaClient()

export default class StackModel {

  static async createStack(
    nome: string,
  ): Promise<Stack> {

      return await prisma.stack.create({
        data: {
          nome,
        },
      });

  }

  static async showAll() {

    return await prisma.stack.findMany()
    
  }
}
