import { PrismaClient, TipoTelefone } from "@prisma/client";

const prisma = new PrismaClient()

interface PhoneTypeData {
    nome: string,
}

export default class GenderModel{
      
    static async execute({
        nome,
    }: PhoneTypeData) : Promise<TipoTelefone | boolean> {
        
        try {
          const newPhoneType = await prisma.tipoTelefone.create({
            data:{
                nome,
            }
          });
    
          prisma.$disconnect;
    
          return newPhoneType;
          
        } catch (error) {
          console.error(error);
    
          prisma.$disconnect;
    
          return false;
        }
      }
    }