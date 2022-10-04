import { PrismaClient, Usuario } from "@prisma/client";

const prisma = new PrismaClient()

interface UserData {
    nome: string,
    email: string,
    senha: string,
    cpf: any,
    data_nascimento: Date,

    tag: string,
    foto_perfil: string,
    biografia: string,
    pontuacao_plataforma: number,
    link_github: string,
    link_portifolio: string,
    ativo: boolean,
    idgenero: number,
}

export default class UserDeveloperModel{
      
    static async execute({
        nome,
        email,
        senha,
        cpf,
        data_nascimento,
        tag,
        pontuacao_plataforma,
        ativo, 
        idgenero,
    }: UserData) : Promise<Usuario | boolean> {
        
        try {
          const newDeveloper = await prisma.usuario.create({
            data:{
                nome,
                email,
                senha,
                cpf,
                data_nascimento: new Date(),
                tag,
                pontuacao_plataforma,
                ativo: true,
                genero:{
                  connect:{
                    id: idgenero
                  }
                }
            },
          });
    
          prisma.$disconnect;
          
          return newDeveloper;
          
        } catch (error) {
          console.error(error);
    
          prisma.$disconnect;
    
          return false;
        }
      }
    }
