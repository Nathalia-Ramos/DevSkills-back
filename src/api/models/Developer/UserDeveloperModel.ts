import { PrismaClient, Usuario, LoginUsuario } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient()

interface UserData {
  nome: string,
  email: string,
  senha: string,
  cpf: string,
  data_nascimento: string,

  id_genero: number,
}

interface LoginDeveloper {
  login: string,
  senha: string,
  id_usuario: number,
}

export default class UserDeveloperModel {

  static async execute({
    nome,
    email,
    senha,
    cpf,
    data_nascimento,
    id_genero,
  }: UserData): Promise<Usuario | boolean> {

    try {
      const newDeveloper = await prisma.usuario.create({
        data: {
          nome,
          email,
          cpf,
          data_nascimento: new Date(),
          ativo: true,
          pontuacao_plataforma: 0,
          tag: "teste",
          genero: {
            connect:{
              id: id_genero,
            }
          },
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


  static async createLogin({

    senha,
    id_usuario
  }: LoginDeveloper): Promise<any | boolean> {

    try {
      const newLogin = await prisma.loginUsuario.create({
        data: {
     
          senha,
          idUsuario: id_usuario,
        },
      });

      prisma.$disconnect;

      return newLogin;

    } catch (error) {
      console.error(error);

      prisma.$disconnect;

      return false;
    }
  }

  static async findLogin(login : string) {

    try {
      const userLogin = await prisma.loginUsuario.findFirst({
        where: {
        //  login: login
        }
      })

      return userLogin

    } catch (error) {
      console.log(error)
    }

  }


}
