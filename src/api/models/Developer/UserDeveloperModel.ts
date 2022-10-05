import { PrismaClient, Usuario } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";

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
  id_genero: number,
  token?: string,
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
    tag,
    pontuacao_plataforma,
    ativo,
    id_genero,
    token,
  }: UserData): Promise<any | boolean> {

    try {
      const newDeveloper = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha,
          cpf,
          data_nascimento: new Date(),
          tag,
          pontuacao_plataforma,
          ativo: true,
          idGenero: id_genero,
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
    login,
    senha,
    id_usuario
  }: LoginDeveloper): Promise<any | boolean> {

    try {
      const newLogin = await prisma.LoginUsuario.create({
        data: {
          login,
          senha,
          id_usuario,
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
      const userLogin = await prisma.LoginUsuario.findFirst({
        where: {
          email: login
        }
      })

      return userLogin

    } catch (error) {
      console.log(error)
    }

  }


}
