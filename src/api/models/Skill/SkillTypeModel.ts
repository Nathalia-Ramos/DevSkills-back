import { PrismaClient, HabilidadeTipo } from "@prisma/client";

const prisma = new PrismaClient()

interface SkillTypeData {
    nome: string,
}

export default class StackModel{
      
    static async execute({
        nome,
    }: SkillTypeData) : Promise<HabilidadeTipo | boolean> {
        
        try {
          const newStack = await prisma.habilidadeTipo.create({
            data:{
                nome,
                ativo: true,
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
    }
