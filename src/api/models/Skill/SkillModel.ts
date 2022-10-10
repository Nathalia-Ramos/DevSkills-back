import { PrismaClient, Habilidade } from "@prisma/client";
import SkillData from "../../../interfaces/Skill";

const prisma = new PrismaClient()

export default class SkillModel{
      
    static async create({
        nome,
        id_stack,
        id_habilidade_tipo
    }: SkillData) : Promise<Object> {
        
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
    
          prisma.$disconnect;
    
          return { error: error };
        
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
