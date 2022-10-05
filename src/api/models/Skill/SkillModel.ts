import { PrismaClient, Habilidade } from "@prisma/client";

const prisma = new PrismaClient()

interface SkillData {
    nome: string,
    id_stack: number,
    id_habilidade_tipo: number,
}

export default class SkillModel{
      
    static async execute({
        nome,
        id_stack,
        id_habilidade_tipo
    }: SkillData) : Promise<Habilidade | boolean> {
        
        try {
          const newStack = await prisma.habilidade.create({
            data:{
                nome,
                ativo: true,
                icone: "teste",
                stack: {
                    connect:{
                        id: id_stack
                    }
                },
                habilidadeTipo: {
                    connect: {
                        id: id_habilidade_tipo
                    }
                }
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
          const getAll = await prisma.habilidade.findMany() 
          
          prisma.$disconnect;
  
          return getAll;
          
        } catch (error) {

          prisma.$disconnect;
          
          return error
        }
      }
    }
