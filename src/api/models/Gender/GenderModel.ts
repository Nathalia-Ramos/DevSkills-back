import { PrismaClient, Genero } from "@prisma/client";

const prisma = new PrismaClient()

interface GenderData {
    nome: string,
}

export default class GenderModel{
      
    static async execute({
        nome,
    }: GenderData) : Promise<Genero | boolean> {
        
        try {
          const newGender = await prisma.genero.create({
            data:{
                nome,
            },
          });
    
          prisma.$disconnect;
    
          return newGender;
          
        } catch (error) {
          console.error(error);
    
          prisma.$disconnect;
    
          return false;
        }
      }

      static async showAll() {
          return await prisma.genero.findMany() 

      }
    }
