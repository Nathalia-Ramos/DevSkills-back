import { PrismaClient, Stack } from "@prisma/client";

const prisma = new PrismaClient()

interface StackData {
  nome: string,
}

export default class StackModel {

  static async execute({
    nome,
  }: StackData): Promise<Stack | boolean> {

    try {
      const newStack = await prisma.stack.create({
        data: {
          nome,
        },
      });

      prisma.$disconnect;

      return newStack;

    } catch (error) {
      console.error(error);

      prisma.$disconnect;

      return false;

    }
  }

  static async showAll() {
    try {
      const getAll = await prisma.stack.findMany()

      prisma.$disconnect;

      return getAll;

    } catch (error) {

      prisma.$disconnect;

      return error
    }
  }
}
