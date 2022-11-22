import { PrismaClient, Administrador, LoginAdmin } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import AdminData from "../../interfaces/Admin/Admin";

const prisma = new PrismaClient();

interface loginAdmin {
    login: string,
    senha: string,
    id_admin: number
}

export default class UserAdminModel {
    static async create(
        nome: string,
        email: string,
        root: boolean,
      ): Promise<Administrador> {
          return await prisma.administrador.create({
            data: {
              nome,
              email,
              root,
              ativo: true  
              },
            })
          }
      
    static async createLogin(
        senha: string,
        id_admin: number) : Promise<LoginAdmin> {
            return await prisma.loginAdmin.create({
            data: {
                senha,
                idAdministrador: id_admin  
                },
            })
        }
    static async findLogin(id_admin: number) : Promise<LoginAdmin | null> {
        return await prisma.loginAdmin.findFirst({
            where:{
                idAdministrador: id_admin,
            }
        })
    }

    static async findByEmail(email: string) : Promise<Administrador | null> {
        return await prisma.administrador.findFirst({
            where:{
                email: email
            }
        })
    }

}