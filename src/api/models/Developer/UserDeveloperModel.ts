import { PrismaClient, Usuario, LoginUsuario } from "@prisma/client";
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
  token: string,
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

      const token = Jwt.sign({id: newDeveloper.id}, "secret", {expiresIn: "1d"})

      const newLogin = await prisma.loginUsuario.create({
        data:{
          idUsuario: newDeveloper.id,
          login: email,
          senha,
          token
        }
      })

      prisma.$disconnect;

      return newLogin;

    } catch (error) {
      console.error(error);

      prisma.$disconnect;

      return false;
    }
  }

  static async auth({
    login,
    senha,
    token
  }: LoginDeveloper): Promise<LoginUsuario | boolean> {

    try {
      const userDeveloper = await prisma.usuario.findFirst({
        where: {
          email: login
        }
      })

      console.log(userDeveloper)

    } catch (error) {
      console.log(error)
    }

    return false;
  }


}
