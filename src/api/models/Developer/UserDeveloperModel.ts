import { PrismaClient, Usuario, LoginUsuario, UsuarioHabilidade, UsuarioStack, UsuarioTelefone } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import DeveloperData from "../../../interfaces/Developer";
import PhoneData from "../../../interfaces/DeveloperPhone";
import DeveloperStacks from "../../../interfaces/DeveloperStacks";
import DeveloperSkills from "../../../interfaces/DeveloperSkills";

const prisma = new PrismaClient();

export default class UserDeveloperModel {
  static async create({
    nome,
    email,
    cpf,
    data_nascimento,
    id_genero,
  }: DeveloperData): Promise<Object> {
    try {
      const newDeveloper = await prisma.usuario.create({
        data: {
          nome,
          email,
          cpf,
          data_nascimento: new Date(data_nascimento),
          ativo: true,
          pontuacao_plataforma: 0,
          tag: "teste",
          genero: {
            connect: {
              id: id_genero,
            },
          },
        },
      });

      prisma.$disconnect;

      return newDeveloper;
      
    } catch (error) {

      prisma.$disconnect;

      return { error };
    }
  }

  static async findByCPF(cpf: string) : Promise<Object> {
    
    try {
      const user = await prisma.usuario.findUnique({
        where:{
          cpf,
        }})

      prisma.$disconnect;

      return { user }

    } catch (error) {

      prisma.$disconnect;

      return { error: error }
    
    }

  }

  static async findByEmail(email: string) : Promise<Object> {
    try {
      const user = await prisma.usuario.findFirst({
        where:{
          email,
        }})

      prisma.$disconnect;

      return { user }

    } catch (error) {

      prisma.$disconnect;

      return { error: error }
    
    }
  }

  static async relatePhone({
    ddd,
    numero,
    id_tipo,
    id_usuario
  } : PhoneData) {

      try {
        const newDeveloperPhone = await prisma.usuarioTelefone.create({
          data: {
            ddd,
            numero,
            tipoTelefone: {
              connect: {
                id: id_tipo
              }
            },
            usuario:{
              connect: {
                id: id_usuario
              }
            }
          },
        });
  
        prisma.$disconnect;
  
        return newDeveloperPhone;
  
      } catch (error) {
        console.error(error);
  
        prisma.$disconnect;
  
        return { error: error };
      }
    }

  static async relateStacks({
    id_usuario,
    id_stack
  } : DeveloperStacks) : Promise<Object> {

    try {
      
      const newDeveloperStack = await prisma.usuarioStack.create({
        data:{
          idUsuario: id_usuario,
          idStack: id_stack,
        }});

        prisma.$disconnect;

        return newDeveloperStack;

    } catch (error) {

      prisma.$disconnect;

      return { error: error };
    }

  }

  static async relateSkills({
    id_usuario,
    id_habilidade,
  }: DeveloperSkills) : Promise<Object> {

    try {
      
      const newDeveloperSkill = await prisma.usuarioHabilidade.create({
        data:{
          idUsuario: id_usuario,
          idHabilidade: id_habilidade,
        }});

        prisma.$disconnect;

        return newDeveloperSkill;

    } catch (error) {
      
      prisma.$disconnect;

      return { error: error };

    }

  }

  static async createLogin(senha: string, id_usuario: number) : Promise<Object> {
    try {
      const newLogin = await prisma.loginUsuario.create({
        data: {
          senha,
          idUsuario: id_usuario
        },
      });

      prisma.$disconnect;

      return newLogin;
      
    } catch (error) {

      prisma.$disconnect;

      return { error: error };
    }
  }
}
