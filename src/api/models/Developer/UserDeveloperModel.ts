import { PrismaClient, Usuario, LoginUsuario, UsuarioHabilidade, UsuarioStack, UsuarioTelefone, Empresa, Prova, ProvaAndamento } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import DeveloperData from "../../interfaces/Developer/Developer";
import PhoneData from "../../interfaces/Developer/DeveloperPhone";
import DeveloperStacks from "../../interfaces/Developer/DeveloperStacks";
import DeveloperSkills from "../../interfaces/Developer/DeveloperSkills";
import { prismaClient } from "../../../database/prismaClient";

const prisma = new PrismaClient();

export default class UserDeveloperModel {
  static async create({
    nome,
    email,
    cpf,
    data_nascimento,
    id_genero,
    permissao_email,
  }: DeveloperData): Promise<Usuario> {
      return await prisma.usuario.create({
        data: {
          nome,
          email,
          cpf,
          data_nascimento: new Date(data_nascimento),
          ativo: true,
          pontuacao_plataforma: 0,
          permissao_email,
          tag: "teste",
          genero: {
            connect: {
              id: id_genero,
            },
          },
        },
      });
  }

  static async findBy(name:string, value: string | number) : Promise<Usuario | null> {
  
      return await prisma.usuario.findFirst({
        where:{
         [name]: value,
        }})

  }

  static async getUserInfo(id: number) {
    return await prisma.usuario.findFirst({
      where: {
        id: id
      },
      select:{
        id: true,
        nome: true,
        foto_perfil: true,
        email: true,
        cpf: true,
        biografia: true,
        pontuacao_plataforma: true,
        tag: true,
        data_nascimento: true,
        link_github: true,
        link_portfolio: true,
        usuarioStack: {
          select:{
            stack:{
              select:{
                id: true,
                nome: true,
              }
            }
          }
        },
        usuarioHabilidade: {
          select:{
            idHabilidade: true,
            habilidade: true,
          }
        },
        EnderecoUsuario: {
          select:{
            logradouro: true,
            numero: true,
            bairro: true,
            cidade: {
              select:{
                id: true,
                nome: true,
              }
            },
            complemento: true,
          }
        },
        UsuarioTelefone: {
          select:{
            ddd: true,
            numero: true,
            tipoTelefone:{
              select:{
                nome: true
              }
            }
          }
        },
        genero: {
          select:{
            id: true,
            nome: true,
          }
        },
        usuarioProva: {
          select:{
            id: true,
            pontuacao: true,
            provaAndamento:{
              select:{
                id: true,
                prova:{
                  select:{
                    titulo: true,
                    descricao: true,
                    provaStack: {
                      select:{
                        idProvaStack: true,
                        stack: true,
                      }
                    },
                    provaHabilidade:{
                      select:{
                        idHabilidade: true,
                        habilidade: true,
                      }
                    },
                  }
                }
              }
            }
          }
        },
        usuarioTesteCompetencia: {
          select: {
            id: true,
            pontuacao: true,
            testeCompetencia: {
              select:{
                id: true,
                titulo: true,
                descricao: true,
                testeCompetenciaHabilidade: {
                  select:{
                    idHabilidade: true,
                    habilidade: true
                  }
                },
              }
            }
          }
        },
      }
    })
  }

  static async relatePhone({
    ddd,
    numero,
    id_tipo,
    id_usuario
  } : PhoneData) : Promise<UsuarioTelefone> {

      return await prisma.usuarioTelefone.create({
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
        
  }

  static async relateStacks({
    id_usuario,
    id_stack
  } : DeveloperStacks) : Promise<UsuarioStack> {
      
      return await prisma.usuarioStack.create({
        data:{
          idUsuario: id_usuario,
          idStack: id_stack,
        }});

  }

  static async relateSkills({
    id_usuario,
    id_habilidade,
  }: DeveloperSkills) : Promise<UsuarioHabilidade> {

      return await prisma.usuarioHabilidade.create({
        data:{
          idUsuario: id_usuario,
          idHabilidade: id_habilidade,
        }});

  }

  static async createLogin(password: string, id_usuario: number) : Promise<LoginUsuario> {
      return await prisma.loginUsuario.create({
        data: {
          senha: password,
          idUsuario: id_usuario
        },
      });   
  }

  static async findLogin(id_usuario: number) : Promise<LoginUsuario | null> {
      return await prisma.loginUsuario.findFirst({
        where:{
          idUsuario: id_usuario
        }
      })
  }

  static async updatePassword(id: number, password : string) : Promise<LoginUsuario> {
    return await prisma.loginUsuario.update({
      data:{
        senha: password,
      },
      where: {
        id: id
      }
    })
  } 

  static async testSearch(search: string) : Promise<ProvaAndamento | any>{
    return await prismaClient.provaAndamento.findMany({
      select:{
        prova: true
      },
      where:{
       OR:[
        {
          prova:{
            provaStack:{
              some:{
                stack:{
                  nome:{
                    contains: search
                  }
                }
              }
            }
          }
        },
        {
          prova:{
            provaHabilidade:{
              some:{
                habilidade:{
                  nome:{
                    contains: search
                  }
                }

              }

            }
          }
        },
        {
          prova:{
            provaAndamento:{
              some:{
                prova:{
                  titulo:{
                    contains: search
                  }
                }
              }
            }
          }
        }
       ]
      }
    })
  }
  static async searchTestUser(search: string){
    return await prismaClient.usuarioProva.findMany({
      select:{
        provaAndamento: true
      },
      where:{
        provaAndamento:{
          usuarioProva:{
            some:{
              usuario:{
                nome: {
                  contains: search
                }
              }
            }
          }
        }
      }
    })
  }

 
}
